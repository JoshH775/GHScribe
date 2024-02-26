export async function POST() {

    let responseText = JSON.stringify({message: 'Test complete!'})

    return new Response(responseText)
}