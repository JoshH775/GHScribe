<script lang="ts">
  let div: HTMLDivElement;
  import { fade, scale } from "svelte/transition";
  import * as easing from "svelte/easing";

  const cancel = () => {
    onClose();
  };

  const confirm = () => {
    onConfirm();
  };

  export let onClose: () => void;
  export let onConfirm: () => void;

  export let show: boolean;

  export let header: string;
  export let text: string;

  export let cancelText: string = "Cancel";
  export let confirmText: string = "Confirm";
</script>

{#if show}
  <div class="wrapper" transition:fade={{ duration: 300 }}>
    <div
      class="modal"
      bind:this={div}
      transition:scale={{ duration: 300, easing: easing.elasticOut }}
    >
      <h1>{header}</h1>
      <p>{text}</p>

      <div class="buttons">
        <button on:click={cancel}>{cancelText}</button>
        <button on:click={confirm}>{confirmText}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .wrapper {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background-color: rgba(190, 190, 190, 0.664);
    z-index: 1;
    flex-wrap: wrap;
  }
  .modal {
    width: 25%;
    height: 25%;
    background-color: white;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
    border: 5px solid black;
  }

  .modal h1 {
    margin: 0;
  }

  .modal p {
    margin: 0;
  }

  .buttons {

    margin: 1rem;
    display: flex;
    width: 70%;
    justify-content: space-around;
  }

  .buttons button {
    padding: 8px 16px;
    border-radius: 24px;
    background-color: lightgrey;
    transition: background-color 0.05s;
    font-size: large;
    font-weight: bold;
  }

  .buttons button:active {
    background-color: grey;
  }
</style>
