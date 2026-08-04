// zrobic prosty obiekt imie nazwisko i czy zalogowany. dodac strone z logowaniem
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem('isAuth') === 'true');
    const currentUser = ref(localStorage.getItem('username') || '');

    const login = (username: string) => {
        isAuthenticated.value = true;
        currentUser.value = username;
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('username', username);
    };

    const logout = () => {
        isAuthenticated.value = false;
        currentUser.value = '';
        localStorage.removeItem('isAuth');
        localStorage.removeItem('username');
    };

    return { isAuthenticated, currentUser, login, logout };
});