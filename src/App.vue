<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <h2 class="logo">Wybieracz Dat</h2>
      <div class="links">
        <router-link to="/">Kalendarz</router-link>
        <router-link to="/historia">Historia</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
      </div>
    </nav>

    <main class="page-content">
      <Toast position="top-center"/>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}

.logo {
  margin: 0;
  font-family: Arial, sans-serif;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.links a.router-link-active {
  color: #3b82f6; 
}

.page-content {
  padding: 2rem;
}
</style>