<script setup>

  import {ref} from 'vue';
  import MyCalendar from './components/MyCalendar.vue';

  const wybrana_data = ref(new Date());

</script>

<template>
  <main>
    <MyCalendar v-model="wybrana_data" />

    <div class="result-container">
      <p class="result-text">Wybrałeś:</p>
      <strong class="result-text">{{ wybrana_data }}</strong>
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
