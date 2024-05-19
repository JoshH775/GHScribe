<script lang="ts">
    import type { DiaryEntry } from 'src/lib/databaseController';
	import Modal from './Modal.svelte';
    import moment from 'moment';
    export let show: boolean
    export let onClose: () => void
    export let onConfirm: () => void
    export let data

    const oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

    const filterForStandup = () => {
        return data.filter((entry: DiaryEntry) => {
            return moment(entry.date).isAfter(oneWeekAgo)
        })
    }

    let filtered: DiaryEntry[] = filterForStandup();

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    
    ]




</script>

<Modal show={show} onClose={onClose} onConfirm={onConfirm} header="Standup Prep">
    {#each filtered as row }
        <div style="display: flex;">
            <p>{weekdays[moment(row.date).day()]}: {row.workcarriedout}</p>
        </div>
    {/each}
</Modal>