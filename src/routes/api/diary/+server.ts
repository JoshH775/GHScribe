import { diary } from "$lib/API/diary";
import { getData } from "$lib/API/sheets";

import moment from "moment";
import type { RequestEvent } from "./$types";

export async function GET() {
  const ops: ResponseInit = {
    status: 200,
  };

  return new Response(JSON.stringify(getData()), ops);
}


export async function POST({ request }: RequestEvent) {
  const { date } = await request.json()


  let parsedDate;
  try {
    parsedDate = moment(date, "YYYY-MM-DD");
    if (!parsedDate.isValid()) {
      console.error("Invalid date format");
    }
  } catch (e) {
    parsedDate = moment();
  }

  const status = await diary(parsedDate);

  const statusHttp = {
    0: 200,
    1: 201,
    2: 409,
  };
  
  const statusMessages = {
    0: "Operation successful",
    1: "Diary updated successfully",
    2: "Content already exists",
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
