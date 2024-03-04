import { diary } from "$lib/API/diary";
import { getData } from "$lib/databaseController";
import moment from "moment";
import type { RequestEvent } from "./$types";

export async function GET() {
  const ops: ResponseInit = {
    status: 200,
  };

  return new Response(JSON.stringify(getData()), ops);
}

export async function POST({ request }: RequestEvent) {
  let date = moment().startOf("day");
  let replace = false;

  if (request) {
    try {
      const body = await request.json();
      date = body.date ? body.date : date;
      replace = body.replace !== undefined ? body.replace : replace;
    } catch (e) {
      console.log('Request body empty or is not json'); 
    }
  }

  const status = await diary(date, replace);

  const statusHttp: { [key: number]: number } = {
    0: 201, // New entry added
    1: 200, // Existing entry replaced
    2: 409, // Conflict, entry already exists
    3: 500, // Server error
  };
  
  const statusMessages: { [key: number]: string } = {
    0: "New entry added to diary",
    1: `Replaced entry for ${date.format("YYYY-MM-DD")}`,
    2: "Entry already exists",
    3: "Error updating diary",
  };

  const ops: ResponseInit = {
    status: statusHttp[status],
  };
  return new Response(
    JSON.stringify({
      message: statusMessages[status],
    }),
    ops
  );
  
}
