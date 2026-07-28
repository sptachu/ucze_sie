<script setup>
  import {ref} from 'vue';
  import MyCalendar from './components/MyCalendar.vue';
  import MainButton from './components/MainButton.vue';

  const selectedDateRange = ref({
    start: new Date(),
    end: new Date()
  });

  const saveDates = () => {
    const datesJSON = JSON.stringify(selectedDateRange.value);
    localStorage.setItem('savedDates', datesJSON);
    alert('Daty zostały pomyślnie zapisane!');
  };

</script>

<template>
  <main>
    <MyCalendar v-model="selectedDateRange" />

    <MainButton btn-type="mainBtn" @click="saveDates">
      Zatwierdź
    </MainButton>

    <div class="result-container">
      <p class="result-text">Wybrałeś:</p>
      <strong class="result-text">{{ selectedDateRange }}</strong>
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
