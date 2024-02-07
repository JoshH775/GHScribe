import { Octokit } from "octokit";

import moment from "moment";
import { config } from "dotenv";
import { AuthenticatedUserAlias } from "./types";
import { addRow } from "./sheets";

const today = moment().startOf("day");

config();

const octokit = new Octokit({ auth: process.env.AUTH_TOKEN });

export let user: AuthenticatedUserAlias;

octokit.rest.users.getAuthenticated().then(result => {
  user = result;
});


 async function diary() {
  const tomorrow = moment(today).add(1, "days");

  const prs = await octokit.rest.pulls.list({
    owner: "Radweb", 
    repo: "InventoryBase",
    state: "all",
    sort: "updated",
    direction: "desc",
    page: 1,
  });

  const workedOn = [];
  const created = [];
  const closed = [];
  const merged = [];

  for (const pr of prs.data) {
    const updatedAt = moment(pr.updated_at);

    if (
      updatedAt.isSameOrAfter(today, "day") &&
      updatedAt.isBefore(tomorrow, "day") &&
      pr.user?.login === user.data.login
    ) {
      const verbs = deriveVerb(pr);

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

  if (workedOn.length === 0 && created.length === 0 && closed.length === 0 && merged.length === 0) return;

  const workedOnString =
    workedOn.length > 0 ? `Worked on: ${workedOn.join(", ")}` : "";
  const createdString =
    created.length > 0 ? `Created: ${created.join(", ")}` : "";
  const closedString = closed.length > 0 ? `Closed: ${closed.join(", ")}` : "";
  const mergedString = merged.length > 0 ? `Merged: ${merged.join(", ")}` : "";

  const all = [workedOnString, createdString, closedString, mergedString]
    .filter(Boolean)
    .join("\n");

    addRow({
      Date: today.format("YYYY-MM-DD"),
      "Work Carried Out": all,
      "Knowledge Gained": "",
      Competencies: "",
    });
}

 function deriveVerb(
  pr: any
): Array<"Created" | "Worked on" | "Closed" | "Merged"> {
  const createdAt = moment(pr.created_at);
  const updatedAt = moment(pr.updated_at);
  const closedAt = moment(pr.closed_at);
  const mergedAt = moment(pr.merged_at);

  const actions: Array<"Created" | "Worked on" | "Closed" | "Merged"> = [];

  if (createdAt.isSame(today, "day")) {
    actions.push("Created");
  }
  if (updatedAt.isSame(today, "day") && !createdAt.isSame(today, "day")) {
    actions.push("Worked on");
  }
  if (closedAt.isSame(today, "day") && !closedAt.isSame(mergedAt, "day")) {
    actions.push("Closed");
  }
  if (mergedAt.isSame(today, "day")) {
    actions.push("Merged");
  }

  return actions;
}


diary();