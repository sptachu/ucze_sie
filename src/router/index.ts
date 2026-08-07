import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '../views/LoginView.vue' 
import ResultsView from '../views/ResultsView.vue'
import { useUserStore } from '@/stores/userStore'
import { STORAGE_KEYS } from '@/features/shared/dict/storageKeys.js'

export const ROUTES = {
  HOME: '/',
  HISTORY: '/historia',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  RESULTS: '/results/:id'
} as const

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.LOGIN, 
      name: 'login',
      component: LoginView
    },
    {
      path: ROUTES.HOME,
      name: 'home',
      component: HomeView
    },
    {
      path: ROUTES.HISTORY,
      name: 'history',
      component: HistoryView
    },
    {
      path: ROUTES.DASHBOARD,
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: ROUTES.RESULTS,
      name: 'results',
      component: ResultsView
    },
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore();
  
  const hasAuthToken = localStorage.getItem(STORAGE_KEYS.IS_AUTH) === 'true';
  const hasUsername = !!localStorage.getItem(STORAGE_KEYS.USERNAME); 

  if (!hasAuthToken || !hasUsername) {
    userStore.logout(); 
  }

  if (to.name !== 'login' && (!userStore.currentUser.isAuthenticated || !hasAuthToken || !hasUsername)) {
    return { name: 'login' }; 
  } 
  
  if (to.name === 'login' && userStore.currentUser.isAuthenticated && hasAuthToken && hasUsername) {
    return { name: 'home' }; 
  } 
});


export default router