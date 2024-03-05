<script lang="ts">
    import type { DiaryEntry } from "$lib/databaseController";
    import moment from "moment";
    import Cell from "./Cell.svelte";

    export let row: DiaryEntry

    export let toast: (response: Response) => void

    async function save(content: string, type: string){
        row[type as keyof DiaryEntry] = content;

        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        })

        toast(response)
    }
   
</script>


<tr>
    <Cell content={moment(row.date).format('LL')} type='date' onSave={save}/>
    <Cell content={row.workcarriedout} type='workcarriedout' onSave={save}/>
    <Cell content={row.knowledgegained} type='knowledgegained' onSave={save}/>
    <Cell content={row.competencies} type='competencies' onSave={save}/>
</tr>

