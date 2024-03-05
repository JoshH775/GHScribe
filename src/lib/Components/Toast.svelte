<script lang="ts" context="module">
    import toast, { Toaster } from 'svelte-french-toast'

    export function toasty(text: string, error = false) {
        if (error) {
            toast.error(text)
        } else {
            toast.success(text)
        }
    }
</script>

<Toaster />
