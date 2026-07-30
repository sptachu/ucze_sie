import { defineStore } from 'pinia'
import { ref } from 'vue'

export type RangeAndNote = {
  start: string,
  end: string,
  note: string
}

export const useCalendarStore = defineStore('calendar', () => {
  const savedHistory = ref<RangeAndNote[]>([]);

  const addDateRange = (newRangeAndNote: RangeAndNote) => {
    savedHistory.value.push(newRangeAndNote);
  }

  const clearHistory = () => {
  savedHistory.value = [] 
  }

    return { savedHistory, addDateRange, clearHistory }}, 
{
  persist: true 
})

//zmien js na typescript i dodaj tenjson server zamiast tego localstorage i dodaj 3 użykowników narazie bez zadnycgh zapytan do api