import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '../views/LoginView.vue' 
import { useUserStore } from '@/stores/userStore'

export enum ROUTES {
  HOME = '/',
  HISTORY = '/historia',
  DASHBOARD = '/dashboard',
  LOGIN = '/login'
} 

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
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore();
  
  const hasAuthToken = localStorage.getItem('isAuth') === 'true';
  const hasUsername = !!localStorage.getItem('username'); 

  if (!hasAuthToken || !hasUsername) {
    userStore.logout(); 
  }

  if (to.name !== 'login' && (!userStore.isAuthenticated || !hasAuthToken || !hasUsername)) {
    return { name: 'login' }; 
  } 
  
  if (to.name === 'login' && userStore.isAuthenticated && hasAuthToken && hasUsername) {
    return { name: 'home' }; 
  } 
});


export default router