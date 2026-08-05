import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '../views/LoginView.vue' 
import { useUserStore } from '@/stores/userStore.ts'

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

router.beforeEach((to) => {
  const userStore = useUserStore();
  
  if (to.name !== 'login' && !userStore.isAuthenticated) {
    return { name: 'login' }; 
  } 
  
  if (to.name === 'login' && userStore.isAuthenticated) {
    return { name: 'home' }; 
  } 
  
});

export default router