<script lang="ts">
	import Icon from '@iconify/svelte';
    import MUITable from "../lib/Components/MUITable.svelte";

    const download = () => {
        console.log("Download");
        window.location.href = "api/diary/download";
    }

</script>



<div class="content">
    <header>
        <h1>Placement Diary</h1>
        <div>
            <button on:click={download}>
                <Icon icon="material-symbols:download" style={'width: 3rem; height: 3rem'}/>
            </button>
            <button>
                <Icon icon="material-symbols:upload" style={'width: 3rem; height: 3rem'}/>
            </button>
        </div>

    </header>
    <MUITable />
</div>

<style>
    header {
        margin: 0.3rem;
        display: flex;
        justify-content: space-between;
    }

</style>