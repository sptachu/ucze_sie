import { computed } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import { calendarService } from '@/features/shared/services/calendar/calendarService'; 
import type { RangeAndNote } from '@/stores/calendarStore';

export function useCalendarService() {
    const store = useCalendarStore();

    const loadCalendar = async () => {
        store.isLoading = true;
        try {
            const data = await calendarService.getAll();
            store.setHistory(data);  
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            store.isLoading = false;
        }
    };

    const addDateRange = async (newRangeAndNote: Omit<RangeAndNote, 'id'>) => {
        store.isLoading = true;
        try {
            const payload: RangeAndNote = {
                ...newRangeAndNote,
                id: crypto.randomUUID() 
            };
            
            await calendarService.create(payload);
            await loadCalendar(); 
            return true;  
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            store.isLoading = false;
        }
    };

    const clearHistory = async () => {
        store.isLoading = true;
        try {
            const deletePromises = store.savedHistory.map(event => calendarService.delete(event.id));
            
            await Promise.all(deletePromises);
            
            await loadCalendar(); 
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            store.isLoading = false;
        }
    };

    return {
        savedHistory: computed(() => store.savedHistory),
        loadCalendar,
        addDateRange,
        clearHistory
    };
}