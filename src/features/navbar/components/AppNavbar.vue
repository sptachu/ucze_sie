<template>
  <nav class="navbar">
    
    <div class="navbar-left">
      <h2 class="logo">Wybieracz Dat</h2>
    </div>
    
    <div class="navbar-center">
      <div v-if="userStore.isAuthenticated" class="links">
        <router-link to="/">Kalendarz</router-link>
        <router-link to="/historia">Historia</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
      </div>
    </div>

    <div class="navbar-right">
      <div v-if="userStore.isAuthenticated" class="auth-section">
        <span class="user-greeting">
          Witaj, <strong>{{ userStore.currentUser }}</strong>!
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
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useNavbar } from '@/features/navbar/composables/useNavbar';

const { userStore, handleLogout } = useNavbar();
</script>

<style scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr; 
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}

.navbar-left { display: flex; justify-content: flex-start; }
.navbar-center { display: flex; justify-content: center; }
.navbar-right { display: flex; justify-content: flex-end; }

.auth-section { display: flex; align-items: center; gap: 1rem; }
.user-greeting { color: #4b5563; font-family: Arial, sans-serif; }
.user-greeting strong { color: #9333ea; }
.logo { margin: 0; font-family: Arial, sans-serif; }

.links { display: flex; gap: 1.5rem; }
.links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
.links a.router-link-active { color: #3b82f6; }
</style>