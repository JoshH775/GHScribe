<script lang="ts">
    export let show: boolean
    export let onClose: () => void
    export let onConfirm: () => void
    import moment from "moment";
    import Modal from "./Modal.svelte";
    import { toasty } from "$lib/Components/Toast.svelte";
    import { lock } from "src/stores";

    let input: HTMLInputElement;
    import { PUBLIC_DB_PASSWORD } from "$env/static/public";

    let error = false
    let rememberMe = false

    const confirm = () => {
        if (input.value === PUBLIC_DB_PASSWORD) {
            error = false
            onConfirm()
            lock.set(false)
            localStorage.setItem('authorised', 'true')
            toasty("Diary Unlocked")
        }
        else {
            error = true
        }
    }

</script>

<Modal onClose={onClose} onConfirm={confirm} header="Unlock Diary" show={show}>
    <form on:submit|preventDefault={confirm}>
        <div>
            <input bind:this={input} type="password" placeholder="Enter password" on:keydown={()=>{error = false}}/>
            {#if error}
                <p>Incorrect password</p>
            {/if}
            <label>
                <input type="checkbox" bind:checked={rememberMe} />
                Remember me?
            </label>
            <button type="submit" style="display: none;"></button>
        </div>
    </form>
</Modal>


<style>
    p {
        margin-top: 0.3rem;
        color: red;
        font-size: 1.2rem;
        font-weight: bold;
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