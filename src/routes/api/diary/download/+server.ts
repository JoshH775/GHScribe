// import { readFileSync } from 'fs';

export async function GET() {
    // const buffer = await readFileSync('static/diary.xlsx');

    // return new Response(
    //     buffer,
    //     {
    //         status: 200,
    //         headers: {
    //             'Content-Type': 'application/octet-stream',
    //             'Content-Disposition':
    //                 `attachment; filename*=UTF-8''${encodeURIComponent('diary.xlsx')}`,
    //         },
    //     }
    // );

    return new Response('Not implemented', { status: 501 });
}