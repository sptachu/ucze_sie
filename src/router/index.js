import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '../views/LoginView.vue' 
import { useAuthStore } from '@/stores/userStore.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login', 
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/historia',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    next({ name: 'login' }); 
    return
  } 
  if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' }); 
    return
  } 
  next(); 
  
});

export default router