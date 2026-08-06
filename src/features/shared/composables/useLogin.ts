import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/router/index';
import { API } from '../dict/storageKeys';

// todo zrob obiekt user zeby nie uzywac tutaj any
interface DbUser {
    id: string;
    username: string;
    password: string | number; 
}


export function useLogin() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const credentials = reactive({
        username: '',
        password: '',
    });

    const errorMessage = ref('');
    const isLoading = ref(false);

    const finalizeLogin = (user: DbUser, inputPass: string) => {
        if (String(user.password) === String(inputPass)) {
            userStore.login(user.username);
            router.push(ROUTES.HOME);
        } else {
            errorMessage.value = 'Nieprawidłowy login lub hasło.';
        }
    };

    const handleLogin = async () => {
        if (!credentials.username || !credentials.password) {
            errorMessage.value = 'Wpisz login i hasło.';
            return;
        }

        isLoading.value = true;
        errorMessage.value = '';

        try {
                const queryParams = new URLSearchParams({
                    username: credentials.username
                });

                const response = await fetch(`${API.BASE_URL}${API.USERS}?${queryParams.toString()}`);
                const users = await response.json() as DbUser[];

                if (users.length) {
                    const foundUser = users[0];
                    finalizeLogin(foundUser, credentials.password);
                } else {
                    errorMessage.value = 'Nieprawidłowy login lub hasło.';
                }
            } catch (error) {
                errorMessage.value = 'Błąd połączenia z serwerem.';
            } finally {
                isLoading.value = false;
            }
    };

    return {
        credentials,
        errorMessage,
        isLoading,
        handleLogin
    };
}