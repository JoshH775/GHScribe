import { toJson } from "$lib/API/sheets"

export async function POST() {

    let responseText = 'Test complete!'

    responseText = toJson()
    return new Response(responseText)
}