<!-- plik: src/views/HistoryView.vue -->
<script setup>
import { useCalendarStore } from '../stores/calendarStore';

const calendarStore = useCalendarStore();
</script>

<template>
  <div class="history-page">
    <h1>Historia rezerwacji</h1>
    <p>Zapisane daty: {{ calendarStore.savedHistory.length }}</p>
  </div>
</template>

<style scoped>
.history-page {
  text-align: center;
  padding: 2rem;
}
</style>