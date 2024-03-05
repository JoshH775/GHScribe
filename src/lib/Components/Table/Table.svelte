<script lang="ts">
    import type { DiaryEntry } from "$lib/databaseController";
    import moment from "moment";
  import Row from "./Row.svelte";

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
            <Row row={row} />
        {/each}
</table>

<style>
    .date {
        width: 12.5%;
        text-align: center;
    }

    .wco {
        width: 35%
    }
    
    .kg {
        width: 35%
    }

    .competencies {
        width: 12.5%
    }

    th {
        border: 1px solid black;
    }


    table {
        border-collapse: collapse;
    }
</style>