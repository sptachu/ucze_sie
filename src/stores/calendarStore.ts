import { defineStore } from 'pinia';
import { ref } from 'vue';

export type RangeAndNote = {
  id: string;
  start: string;
  end: string;
  note: string;
}

const API_URL = 'http://localhost:3001/calendar';

export const useCalendarStore = defineStore('calendar', () => {
  const savedHistory = ref<RangeAndNote[]>([]);

  const loadCalendar = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        savedHistory.value = await response.json();
      }
    } catch (error) {
      console.error('Błąd podczas pobierania historii kalendarza:', error);
    }
  };

  const addDateRange = async (newRangeAndNote: Omit<RangeAndNote, 'id'>) => {
    const payload: RangeAndNote = {
      ...newRangeAndNote,
      id: crypto.randomUUID() 
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const savedEvent = await response.json();
        savedHistory.value.push(savedEvent);
      }
    } catch (error) {
      console.error('Błąd podczas zapisu do kalendarza:', error);
    }
  }

  const clearHistory = async () => {
    try {
        const deletePromises = savedHistory.value.map(event => 
            fetch(`${API_URL}/${event.id}`, { method: 'DELETE' })
        );

        const responses = await Promise.all(deletePromises);
        
        const allOk = responses.every(response => response.ok === true);

        if (allOk) {
            savedHistory.value = [];
            console.log('Z sukcesem usunięto całą historię.');
        } else {
            console.error('Błąd: Niektóre wpisy mogły nie zostać usunięte z bazy!');
            
        }
    } catch (error) {
        console.error('Błąd połączenia podczas czyszczenia historii:', error);
    }
}

  return { savedHistory, loadCalendar, addDateRange, clearHistory }
});
