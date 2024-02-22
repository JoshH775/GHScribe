import { diary } from "$lib/API/diary";
import { getData } from "$lib/API/sheets";

export async function GET() {
  const ops: ResponseInit = {
    status: 200,
  };

  return new Response(JSON.stringify(getData()), ops);
}

export async function POST() {
  const status = await diary();

  const ops: ResponseInit = {
    status: status ? 201 : 409,
  };
  return new Response(
    JSON.stringify({
      message: status
        ? "Diary updated successfully"
        : "Content already exists",
    }),
    ops
  );
}
