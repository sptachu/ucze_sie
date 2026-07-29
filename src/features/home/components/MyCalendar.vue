<script setup>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css'

const choseDate = defineModel();
</script>

<template>
  <div class="calendar-card">
    <h2 class="top-text">Wybierz datę</h2>
    <DatePicker v-model="choseDate" is-range/>
  </div>
</template>

<style scoped>
.calendar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 13px;
  box-shadow: 0 4px 12px;
  min-width: 450px;
  max-width: 90vw;
}

.top-text {
  font-family: Arial, Helvetica, sans-serif;
}
</style>