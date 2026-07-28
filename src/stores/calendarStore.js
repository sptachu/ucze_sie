import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  const savedHistory = ref([]);

  const addDateRange = (newRange) => {
    savedHistory.value.push({
      start: newRange.start,
      end: newRange.end
    })
  }

    return { savedHistory, addDateRange }}, 
{
  persist: true 
})