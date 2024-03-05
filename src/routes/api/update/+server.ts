import type { DiaryEntry } from "$lib/databaseController";
import type { RequestEvent } from "./$types";
import { updateRow } from "$lib/databaseController";

export async function POST ({request}: RequestEvent) {
    if (!request) return {status: 400, body: "Invalid request"}

    const body: DiaryEntry = await request.json()
    await updateRow(body)

    return new Response(null, {status: 200})

}