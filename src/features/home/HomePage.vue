<template>
  <main>
    <div class="action-container">
        <MyCalendar v-model="formState.dateRange" is-range />

        <div class="note-section">
            <label for="date-note">Dodaj notatkę (opcjonalnie):</label>
            <textarea 
                id="date-note" 
                v-model="formState.note" 
                placeholder="co bedziesz wtedy robić" 
            ></textarea>
        </div>
    </div>
    <MainButton btn-type="mainBtn" @click="handleSaveDateRange">
      Zatwierdź
    </MainButton>

    <div class="result-container">
      <p class="result-text">Wybrałeś:</p>
      <strong class="result-text">{{ formState.dateRange }}</strong>
    </div>
    
  </main>
</template>

<script setup lang="ts">
  import MyCalendar from '@/features/shared/components/MyCalendar.vue';
  import MainButton from '@/features/shared/components/MainButton.vue';
  import useCalendar from './composables/useCalendar';
  const {formState, handleSaveDateRange} = useCalendar();
  

</script>

<style scoped>
  main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
  gap: 2rem; 
}

.result-text {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.note-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.note-section label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
  text-align: center; 
}

.note-section textarea {
  box-sizing: border-box; 
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical; 
  transition: border-color 0.2s;
}

.note-section textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.action-container {
  display: flex;
  flex-direction: column;
  width: max-content; 
  margin: 0 auto; 
}
</style>
