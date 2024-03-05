<script lang="ts">
    export let show: boolean
    export let onClose: () => void
    export let onConfirm: () => void
    import Modal from "./Modal.svelte";

    let input: HTMLInputElement;
    import { PUBLIC_DB_PASSWORD } from "$env/static/public";

    console.log(PUBLIC_DB_PASSWORD)

    const confirm = () => {
        if (input.value === PUBLIC_DB_PASSWORD) {
            onConfirm()
        }
    }

</script>

<Modal onClose={onClose} onConfirm={confirm} header="GG" show={show}>
    <input bind:this={input} type="password" placeholder="Enter password" />
</Modal>