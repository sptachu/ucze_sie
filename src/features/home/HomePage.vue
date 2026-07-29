<template>
  <main>
    <MyCalendar v-model="draftDateRange" />

    <MainButton btn-type="mainBtn" @click="handleSaveDateRange">
      Zatwierdź
    </MainButton>

    <div class="result-container">
      <p class="result-text">Wybrałeś:</p>
      <strong class="result-text">{{ draftDateRange }}</strong>
    </div>
    
  </main>
</template>

<script setup lang="ts">
  import MyCalendar from '@/features/home/components/MyCalendar.vue';
  import MainButton from '@/features/shared/components/MainButton.vue';
  import useCalendar from './composables/useCalendar';
  const {draftDateRange, handleSaveDateRange} = useCalendar();
  

</script>

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
