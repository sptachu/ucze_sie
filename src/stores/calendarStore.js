import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const savedHistory = ref([]);

  const addDateRange = (newRange, note = '') => {
    savedHistory.value.push({
      start: newRange.start,
      end: newRange.end,
      note: note
    })
  }

  const clearHistory = () => {
  savedHistory.value = [] 
  }

    return { savedHistory, addDateRange, clearHistory }}, 
{
  persist: true 
})