// zrobic prosty obiekt imie nazwisko i czy zalogowany. dodac strone z logowaniem
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { STORAGE_KEYS } from '@/features/shared/dict/storageKeys';

export const useUserStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem(STORAGE_KEYS.IS_AUTH) === 'true');  // todo jakis enum w shared/dict i eksporowac is auth username itd
    const currentUser = ref(localStorage.getItem(STORAGE_KEYS.USERNAME) || '');

    const login = (username: string) => {
        isAuthenticated.value = true;
        currentUser.value = username;
        localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    };

    const logout = () => {
        isAuthenticated.value = false;
        currentUser.value = '';
        localStorage.removeItem(STORAGE_KEYS.IS_AUTH);
        localStorage.removeItem(STORAGE_KEYS.USERNAME);
    };

    return { isAuthenticated, currentUser, login, logout };
});