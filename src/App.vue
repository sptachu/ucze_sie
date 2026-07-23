<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

  import {ref} from 'vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css'

  const wybrana_data = ref(new Date());

</script>

<template>
  <main>    
    <div class="calendar-card">
    <h2 class="top-text">Wybierz datę</h2>
    <DatePicker v-model="wybrana_data"/>
    <p class="result-text">Wybrałeś:</p>
    <strong class="result-text"> {{ wybrana_data }}</strong>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
  }

  .calendar-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    border-radius: 13px;
    box-shadow: 0 4px 12px;
    min-width: 670px;
    max-width: 90vw;
  }

  .result-text, .top-text {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
