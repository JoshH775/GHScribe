import { getData } from "$lib/databaseController";
export const prerender = false;

export const load = async () => {

    const data = await getData();
    return {
        rows: data,
    }
}

