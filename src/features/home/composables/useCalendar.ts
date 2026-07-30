import { ref, reactive } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import type { RangeAndNote } from '@/stores/calendarStore';

type CalendarFormState = {
    dateRange: {
        start: Date;
        end: Date;
    };
    note: string;
}

export default function useCalendar() {
    const calendarStore = useCalendarStore();
    // todo zmien na osobne zmienne albo reactive i potestuj
    const formState = reactive<CalendarFormState>({
        dateRange: {
            start: new Date(),
            end: new Date()
        },
        note: ''
    });

    const handleSaveDateRange = () => {
        const payload: RangeAndNote = {
            start: formState.dateRange.start.toISOString(),
            end: formState.dateRange.end.toISOString(),
            note: formState.note
        };
        calendarStore.addDateRange(payload);
        formState.note = '';
        alert('Daty zostały pomyślnie zapisane w magazynie!');
    };

    

    return {
        formState,
        handleSaveDateRange,
    }
}