<script setup lang="ts">
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/userStore'; 

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
    router.push({ name: 'login' });
};
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      
      <div class="navbar-left">
        <h2 class="logo">Wybieracz Dat</h2>
      </div>
      
      <div class="navbar-center">
        <div v-if="authStore.isAuthenticated" class="links">
          <router-link to="/">Kalendarz</router-link>
          <router-link to="/historia">Historia</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </div>
      </div>

      <div class="navbar-right">
        <div v-if="authStore.isAuthenticated" class="auth-section">
          <span class="user-greeting">
            Witaj, <strong>{{ authStore.currentUser }}</strong>!
          </span>
          <Button 
            icon="pi pi-sign-out" 
            label="Wyloguj" 
            severity="danger" 
            outlined 
            size="small" 
            @click="handleLogout" 
          />
        </div>
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