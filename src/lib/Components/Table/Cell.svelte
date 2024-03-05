<script lang="ts">
    export let content: string
    export let type: 'date' | 'workcarriedout' | 'knowledgegained' | 'competencies'
    export let onSave: (content: string, type: string) => void
    import Icon from '@iconify/svelte';
    import { onMount, tick } from 'svelte';

    let edit = false
    let textarea: HTMLTextAreaElement;

    let originalContent = content

    async function toggleEdit() {
        edit = !edit;
        if (edit) {
            await tick(); // Wait for the state changes to be applied
            adjustTextareaHeight();
        }
    }

    function save() {
        onSave(content, type)
        toggleEdit()
        originalContent = content
    }

    function adjustTextareaHeight() {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }

    function cancel() {
        content = originalContent
        toggleEdit()
    }

    onMount(() => {
        adjustTextareaHeight();
    })

</script>

<td class="cell" on:dblclick={type !== 'date' ? toggleEdit : null}>
    {#if edit}
        <!-- <input bind:value={content} /> -->
        <textarea bind:value={content}  bind:this={textarea} on:keydown={adjustTextareaHeight}/>
    {:else}
        <span class={type === 'date' ? 'date-content' : ''}>{content}</span>
    {/if}

    <div class={!edit ? "buttons" : "edit-buttons"}>
        {#if type !== 'date'}
            <button class="edit" on:click={!edit ? toggleEdit : cancel}>
                <Icon icon={!edit ? "material-symbols:edit-outline" : "mdi-light:cancel"} />
            </button>
            {#if edit}
                <button class="edit" on:click={save}>
                    <Icon icon="material-symbols:done" />
                </button>
            {/if}
        {/if}
    </div>

</td>

<style>

    .cell {
        position: relative;
    }

    .edit {
   display: flex;
   align-items: center;
   justify-content: center;
    border: 1px solid black;
    border-radius: 50%; 
    width: 2rem; 
    height: 2rem; 
    text-align: center; 
    margin: 0.15rem;
}

.buttons {
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;


}

.edit-buttons {
    display: flex;
    position: static;
    width: 100%;
    justify-content: flex-end;
}

.cell:hover .buttons {
    display: flex;
}

    td {
        padding: 0.4rem;
        border: 1px solid black;
        min-height: calc(min-content + 1rem);
    }

    textarea {
        width: 100%;
        font-size: 1rem;
        resize: none;
    }

    span {
        white-space: pre-wrap;
    }

    .date-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>