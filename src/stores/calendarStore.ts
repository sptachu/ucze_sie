import { defineStore } from 'pinia';
import { ref } from 'vue';

export type RangeAndNote = {
  id: string;
  start: string;
  end: string;
  note: string;
}

export const useCalendarStore = defineStore('calendar', () => {
  const savedHistory = ref<RangeAndNote[]>([]);
  const isLoading = ref(false); 

  const setHistory = (data: RangeAndNote[]) => {
    savedHistory.value = data;
  };

  return { savedHistory, isLoading, setHistory }
});
