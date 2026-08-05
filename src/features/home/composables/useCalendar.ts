import { ref, reactive } from 'vue';
import { useCalendarService } from '@/features/shared/data-access/useCalendarService';
import type { RangeAndNote } from '@/stores/calendarStore';

type CalendarFormState = {
    dateRange: {
        start: Date;
        end: Date;
    };
    note: string;
}

export default function useCalendar() {
    const {addDateRange} = useCalendarService();
    const formState = reactive<CalendarFormState>({
        dateRange: {
            start: new Date(),
            end: new Date()
        },
        note: ''
    });

    const handleSaveDateRange = () => {
        const payload: Omit<RangeAndNote, 'id'> = {
            start: formState.dateRange.start.toISOString(),
            end: formState.dateRange.end.toISOString(),
            note: formState.note
        };
        addDateRange(payload);
        formState.note = '';
        alert('Daty zostały pomyślnie zapisane w magazynie!');
    };

    

    return {
        formState,
        handleSaveDateRange,
    } 
}