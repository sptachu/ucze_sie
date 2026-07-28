<script setup>
 import { ref } from 'vue';
  import MyCalendar from './components/MyCalendar.vue';
  import MainButton from './components/MainButton.vue';
  import { useCalendarStore } from './stores/calendarStore';
  const calendarStore = useCalendarStore();

  const draftDateRange = ref({
    start: new Date(),
    end: new Date()
  });

  const handleSave = () => {
    calendarStore.addDateRange(draftDateRange.value);
    alert('Daty zostały pomyślnie zapisane w magazynie!');
  };

</script>

<template>
  <main>
    <MyCalendar v-model="draftDateRange" />

    <MainButton btn-type="mainBtn" @click="handleSave">
      Zatwierdź
    </MainButton>

    <div class="result-container">
      <p class="result-text">Wybrałeś:</p>
      <strong class="result-text">{{ draftDateRange }}</strong>
    </div>
    
  </main>
</template>

<style scoped>
  main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  gap: 2rem; /* Dodajemy odstęp między kalendarzem a napisami pod spodem */
}

.result-text {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
</style>
