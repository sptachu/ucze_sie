import { ref } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
type DateRangeState = {
    start: Date,
    end: Date
}

export default function useCalendar() {
    const calendarStore = useCalendarStore();
    const currentNote = ref<string>('');
    // todo zmien na osobne zmienne albo reactive i potestuj
    const draftDateRange = ref<DateRangeState>({
        start: new Date(),
        end: new Date()
    });

    const handleSaveDateRange = () => {
        calendarStore.addDateRange(draftDateRange.value, currentNote.value);
        currentNote.value='';
        alert('Daty zostały pomyślnie zapisane w magazynie!');
    };

    

    return {
        draftDateRange,
        handleSaveDateRange,
        currentNote
    }
}