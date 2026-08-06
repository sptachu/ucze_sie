<template>
  <div class="history-page">
    <h1 class="title">Historia zaznaczonych dat</h1>
    
    <div v-if="savedHistory.length === 0" class="empty-state">
      <p>Nie zapisałeś jeszcze żadnych zakresów dat.</p>
      <router-link to="/" class="back-link">Wróć do kalendarza</router-link>
    </div>

    <div v-else class="history-content">
      <ul class="history-list">
        <li 
          v-for="(range, index) in savedHistory" 
          :key="range.id"
          class="history-item"
        >
          <div class="item-header">Wybór #{{ index + 1 }}: {{ range.note || 'brak notatki' }}</div>
          <div class="item-dates">
            <strong class="date-text">{{ toDateString(range.start) }}</strong>
            <span class="separator"> — </span>
            <strong class="date-text">{{ toDateString(range.end) }}</strong>
          </div>
        </li>
      </ul>

      <div class="actions">
        <MainButton btn-type="mainBtn" @click="clearHistory">
          Wyczyść całą historię
        </MainButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCalendarService } from '@/features/shared/data-access/useCalendarService';
import MainButton from '@/features/shared/components/MainButton.vue';
import dateFormat from '../shared/utils/dateFormats';


const { savedHistory, loadCalendar, clearHistory } = useCalendarService();
const {toDateString} = dateFormat();

onMounted(() => {
    loadCalendar();
});

</script>

<style scoped>
.history-page {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: bold;
}

.back-link:hover {
  text-decoration: underline;
}

.history-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.item-header {
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.item-dates {
  font-size: 1.1rem;
  color: #333;
}

.separator {
  color: #adb5bd;
  margin: 0 0.5rem;
}

.date-text {
  color: #3b82f6;
}

.actions {
  display: flex;             
  justify-content: center;   
  margin-top: 2rem;          
}
</style> 