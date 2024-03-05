<script lang="ts">
	import Icon from '@iconify/svelte';
    import type { PageData } from './$types.js';
    import Table from "$lib/Components/Table/Table.svelte";
    import LockModal from "$lib/Components/Modals/LockModal.svelte";
    import toast, { Toaster } from 'svelte-french-toast'
    import Toast from '$lib/Components/Toast.svelte';

    import { lock } from 'src/stores';

    let fileInput: HTMLInputElement

    const download = () => {
        console.log("Download");
        window.location.href = "api/diary/download";
    }

    const upload = () => {
        console.log("Upload");
        uploadModal = false
        fileInput.click()
    }

    const toggleLock = () => {
        if ($lock) lockModal = true
    }

    let uploadModal = false
    let lockModal = false

    export let data: PageData
    const rows = data.rows

    export function toasty(text: string, error = false) {
        if (error) {
            toast.error(text)
        } else {
            toast.success(text)
        }
    }

</script>

<Toast />
<div class="content">
    <LockModal show={lockModal} onClose={()=>{lockModal = false}} onConfirm={()=>{lockModal = false}}/>
    <header>
        <h1>Placement Diary</h1>
        <div>
            <button class="button" on:click={toggleLock}>
                <Icon icon={$lock ? "material-symbols:lock-outline" : "material-symbols:lock-open-outline"} style={'width: 3rem; height: 3rem'} />
            </button>
            <button on:click={download} class="button">
                <Icon icon="material-symbols:download" style={'width: 3rem; height: 3rem'}/>
            </button>
            <input type="file" id="file" style="display: none" bind:this={fileInput} accept=".xlsx, .json"/>
            <button class="button" on:click={()=>{uploadModal = true}}>
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