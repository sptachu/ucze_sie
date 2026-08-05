<template>
  <div class="app-layout">
    
    <AppNavbar />

    <main class="page-content">
      <Toast position="top-center"/>
      <router-view />
    </main>
    
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import AppNavbar from '@/features/navbar/AppNavbar.vue'; 
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.page-content {
  padding: 2rem;
}
</style>