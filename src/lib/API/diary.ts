import { Octokit } from "octokit";

import moment from "moment";
import { config } from "dotenv";
import type { AuthenticatedUserAlias } from "./types";
import { addRow } from "./sheets";

const today = moment().startOf("day");

config();

const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

export let user: AuthenticatedUserAlias;

octokit.rest.users.getAuthenticated().then(result => {
  user = result;
});


 export async function diary(date: moment.Moment = today) {
  
  const day = date && date.isValid() ? date.startOf('day') : today;
  
  const prs = await octokit.rest.pulls.list({
    owner: "Radweb", 
    repo: "InventoryBase",
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: 75,
    page: 1,
  });

  const myPrs = []

  const workedOn = [];
  const created = [];
  const closed = [];
  const merged = [];

  for (const pr of prs.data) {
    const updatedAt = moment(pr.updated_at);
  
    if (
      updatedAt.format("YYYY-MM-DD") === day.format("YYYY-MM-DD") &&
      pr.user?.login === user.data.login
    ) {
      myPrs.push(pr);
      const verbs = deriveVerb(pr, day);

      for (const verb of verbs) {
        switch (verb) {
          case "Created":
            created.push(pr.title);
            break;
          case "Worked on":
            workedOn.push(pr.title);
            break;
          case "Closed":
            closed.push(pr.title);
            break;
          case "Merged":
            merged.push(pr.title);
            break;
        }
      }
    }
  }

  if (workedOn.length === 0 && created.length === 0 && closed.length === 0 && merged.length === 0) return 0;

  const workedOnString =
    workedOn.length > 0 ? `Worked on: ${workedOn.join(", ")}` : "";
  const createdString =
    created.length > 0 ? `Created: ${created.join(", ")}` : "";
  const closedString = closed.length > 0 ? `Closed: ${closed.join(", ")}` : "";
  const mergedString = merged.length > 0 ? `Merged: ${merged.join(", ")}` : "";

  const all = [workedOnString, createdString, closedString, mergedString]
    .filter(Boolean)
    .join("\n");

    const status = addRow({
      Date: day.format("YYYY-MM-DD"),
      "Work Carried Out": all,
      "Knowledge Gained": deriveSkills(myPrs),
      Competencies: "",
    });

    return (status ? 1 : 2)
}

 function deriveVerb(
  pr: any,
  day = today
): Array<"Created" | "Worked on" | "Closed" | "Merged"> {
  const createdAt = moment(pr.created_at);
  const updatedAt = moment(pr.updated_at);
  const closedAt = moment(pr.closed_at);
  const mergedAt = moment(pr.merged_at);

  const actions: Array<"Created" | "Worked on" | "Closed" | "Merged"> = [];

  if (createdAt.isSame(day, "day")) {
    actions.push("Created");
  }
  if (updatedAt.isSame(day, "day") && !createdAt.isSame(day, "day")) {
    actions.push("Worked on");
  }
  if (closedAt.isSame(day, "day") && !closedAt.isSame(mergedAt, "day")) {
    actions.push("Closed");
  }
  if (mergedAt.isSame(day, "day")) {
    actions.push("Merged");
  }

  return actions;
}

function deriveSkills(prs: any[]) {
  const skills = new Set<string>();

  prs.forEach(pr => {
    const lastLine = pr.body.split("\r").pop();

    const matches = lastLine.match(/\[(.*?)\]/);

    if (matches) {
      const array = matches[1].split(',').map((item: string) => item.trim());
      array.forEach((skill: string) => skills.add(skill));
    }
  });

  const skillsArray = Array.from(skills);
  if (skillsArray.length > 1) {
    const lastSkill = skillsArray.pop();
    return `Worked on my ${skillsArray.join(', ')}, and ${lastSkill} skills`;
  } else {
    return `Worked on my ${skillsArray.join(', ')} skills`;
  }
}


