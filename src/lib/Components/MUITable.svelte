<script lang="ts">
    import type { DiaryEntry } from "$lib/types";
    import { onMount } from "svelte";
    import moment from "moment";

    export let rows: DiaryEntry[] = [];

   
</script>

<table>
    <thead>
        <tr>
            <th class="date">Date</th>
            <th class="wco">Work Carried Out</th>
            <th class="kg">Knowledge Gained</th>
            <th class="competencies">Competencies</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr>
                <td class="date">{moment(row.Date).format('LL')}</td>
                <td class="wco">{row["Work Carried Out"]}</td>
                <td class="kg">{row["Knowledge Gained"]}</td>
                <td class="competencies">{row.Competencies}</td>
            </tr>
        {/each}
</table>

<style>
    .date {
        width: 10%;
        text-align: center;
    }

    .wco {
        width: 35%
    }
    
    .kg {
        width: 35%
    }

    .competencies {
        width: 15%
    }

    td {
        padding: 0.4rem;
    }

    th, td {
        border: 1px solid black;
    }

    table {
        border-collapse: collapse;
    }
</style>