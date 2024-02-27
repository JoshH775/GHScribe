<script lang="ts">
	import Icon from '@iconify/svelte';
    import MUITable from "../lib/Components/MUITable.svelte";
    import type { PageData } from './$types.js';

    const download = () => {
        console.log("Download");
        window.location.href = "api/diary/download";
    }

    export let data: PageData
    const rows = data.rows

</script>



<div class="content">
    <header>
        <h1>Placement Diary</h1>
        <div>
            <button on:click={download} class="button">
                <Icon icon="material-symbols:download" style={'width: 3rem; height: 3rem'}/>
            </button>
            <button class="button">
                <Icon icon="material-symbols:upload" style={'width: 3rem; height: 3rem'}/>
            </button>
        </div>

    </header>
    <MUITable rows={rows} />
</div>

<style>
    header {
        margin: 0.3rem;
        display: flex;
        justify-content: space-between;
    }

    .button {
        background-color: lightgrey;
        transition: background-color 0.05s;
    }

    .button:active {
        background-color: grey;
    }

</style>