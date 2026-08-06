// zrobic prosty obiekt imie nazwisko i czy zalogowany. dodac strone z logowaniem
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { STORAGE_KEYS } from '@/features/shared/dict/storageKeys';

type AuthUser = {
    isAuthenticated: boolean,
    nickname: string
}

export const useUserStore = defineStore('auth', () => {
    const currentUser = reactive<AuthUser>({
        isAuthenticated: localStorage.getItem(STORAGE_KEYS.IS_AUTH) === 'true',
        nickname: localStorage.getItem(STORAGE_KEYS.USERNAME) || ''
    })
    

    const login = (username: string) => {
        currentUser.isAuthenticated = true;
        currentUser.nickname = username;
        localStorage.setItem(STORAGE_KEYS.IS_AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.USERNAME, username);
    };

    const logout = () => {
        currentUser.isAuthenticated = false;
        currentUser.nickname = '';
        localStorage.removeItem(STORAGE_KEYS.IS_AUTH);
        localStorage.removeItem(STORAGE_KEYS.USERNAME);
    };

    return { currentUser, login, logout };
});