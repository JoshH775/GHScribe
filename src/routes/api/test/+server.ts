import fs from 'fs';
export async function POST() {

    await testFunction()

    let responseText = JSON.stringify({message: 'Test complete!'})
    return new Response(responseText)
}


const testFunction = async () => {
}