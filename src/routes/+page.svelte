<script lang="ts">
	import Icon from '@iconify/svelte';
    import type { PageData } from './$types.js';
    import Alert from "$lib/Components/Modal.svelte";
    import Table from "$lib/Components/Table/Table.svelte";

    let fileInput: HTMLInputElement

    const download = () => {
        console.log("Download");
        window.location.href = "api/diary/download";
    }

    const upload = () => {
        console.log("Upload");
        warningModal = false
        fileInput.click()
        
    }

    let warningModal = false

    export let data: PageData
    const rows = data.rows

</script>


<div class="content">
    <Alert onClose={()=>{warningModal = false}} header="Warning!" text="boob" show={warningModal} onConfirm={upload}/>

    <header>
        <h1>Placement Diary</h1>
        <div>
            <button on:click={download} class="button">
                <Icon icon="material-symbols:download" style={'width: 3rem; height: 3rem'}/>
            </button>
            <input type="file" id="file" style="display: none" bind:this={fileInput} accept=".xlsx, .json"/>
            <button class="button" on:click={()=>{warningModal = true}}>
                <Icon icon="material-symbols:upload" style={'width: 3rem; height: 3rem'}/>
            </button>
        </div>
    </header>
    <Table {rows}/>
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