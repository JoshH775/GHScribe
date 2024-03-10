<script lang="ts">
    export let show: boolean
    export let onClose: () => void
    export let onConfirm: (data: { date: string, replace: boolean }) => void
    import Modal from "./Modal.svelte";
    import moment from "moment";

    let date: string = moment().format('YYYY-MM-DD');
    let replace: boolean = false;

    const confirm = () => {
        onConfirm({date, replace});
    }
</script>

<Modal onClose={onClose} onConfirm={confirm} header="Add row" show={show}>
    <div class="add-modal">
        <h2>More Information</h2>
        <input type="date" bind:value={date} />
        <div style="display: flex; align-items: center;">
            <label for="replace">Replace?</label>
            <input type="checkbox" id="replace" class="checkbox" bind:checked={replace} />
        </div>
    </div>
</Modal>

<style>
    .checkbox {
        margin-top: 0;
    }
    .add-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        margin-top: 1.7rem;
        height: 20%;
        font-size: 1rem;
        width: 80%;
    }
    div {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        margin-top: 1.7rem;
        height: 20%;
        font-size: 1rem;
        width: 80%;
    }
    div {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>