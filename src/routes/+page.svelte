<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PageData } from "./$types.js";
  import Table from "$lib/Components/Table/Table.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import Toast from "$lib/Components/Toast.svelte";
  import { utils, writeFileXLSX } from "xlsx";
  import { tableRef } from "$lib/Components/Table/Table.svelte";
  import AddModal from "$lib/Components/Modals/AddModal.svelte";
  import { onMount } from "svelte";
  import { lock } from "src/stores";



  const download = () => {
    const wb = utils.table_to_book(tableRef);
    writeFileXLSX(wb, "diary.xlsx");
  };
  

  const downloadJson = () => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diary.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const toggleStandup = () => {
    standupModal = true;
  };

  const confirmRow = (data: { date: string; replace: boolean }) => {
    addRow(data);
    addRowModal = false;
  };

  const addRow = async (data: { date: string; replace: boolean }) => {
    const response = await fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: data.date,
        replace: data.replace,
      }),
    });

    const { message } = await response.json();
    toasty(message);
  };

  let addRowModal = false;


  let standupModal = false;

  export let data: PageData;
  $: rows = data.rows

  export function toasty(text: string, error = false) {
    if (error) {
      toast.error(text);
    } else {
      toast.success(text);
    }
  }

  onMount(() => {
    const authorised = !localStorage.getItem("authorised");
    lock.set(authorised);
  });
</script>

<Toast />
<div class="content">
  <AddModal
    show={addRowModal}
    onClose={() => {
      addRowModal = false;
    }}
    onConfirm={confirmRow}
  />

  <header>
    <h1>Placement Diary - Joshua Hickey</h1>
    <div>
      <button
        class="button"
        on:click={() => {
          addRowModal = true;
        }}
        disabled={$lock}
      >
        <Icon icon="mingcute:add-line" style={"width: 3rem; height: 3rem"} />
      </button>

      <button on:click={download} class="button">
        <Icon
          icon="material-symbols:download"
          style={"width: 3rem; height: 3rem"}
        />
      </button>
      <button on:click={downloadJson} class="button">
        <Icon
          icon="codicon:json"
          style={"width: 3rem; height: 3rem"}
        />
      </button>
    </div>
  </header>
  <p>DISCLAIMER: This project is no longer an active CRUD service as my placement has ended, allowing for cloud resource savings. However, the data remains available for download in .xlsx or .json format.</p>
  <Table {rows} />
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
