<script lang="ts">
    import type { DiaryEntry } from "$lib/types";
    import { onMount } from "svelte";
    import DataTable, { Head, Body, Row, Cell} from '@smui/data-table'

    let rows: DiaryEntry[] = [];

    onMount(() => {

        const fetchData = async () => {
            const response = await fetch("api/diary", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }});

            
            const data = await response.json();
            console.log(data);
            rows = data;
        };

        fetchData();
    });
</script>

<DataTable table$aria-label="User list" style="width: 100%;">
    <Head>
        <Row>
            <Cell>Date</Cell>
            <Cell>Work Carried Out</Cell>
            <Cell>Knowledge Gained</Cell>
            <Cell>Competencies</Cell>
        </Row>
    </Head>
    <Body>
        {#each rows as row}
            <Row>
                <Cell>{row.Date}</Cell>
                <Cell>{row["Work Carried Out"]}</Cell>
                <Cell>{row["Knowledge Gained"]}</Cell>
                <Cell>{row.Competencies}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>