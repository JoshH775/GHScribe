import type { PageLoadEvent } from "./$types";

export const prerender = false;

export const load = async (loadEvent: PageLoadEvent) => {
    const { fetch } = loadEvent;
    const response = await fetch("api/diary", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});

    
    const data = await response.json();
    return {
        rows: data,
    }
}