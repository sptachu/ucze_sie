import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { ROUTES } from '@/router/index';

// todo zrob obiekt user zeby nie uzywac tutaj any

export function useLogin() {
    const router = useRouter();
    const userStore = useUserStore();
    
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);

    const handleLogin = async () => {
        if (!username.value || !password.value) {
            errorMessage.value = 'Wpisz login i hasło.';
            return;
        }

        isLoading.value = true;
        errorMessage.value = '';

        try {
                const queryParams = new URLSearchParams({
                    username: username.value
                });

                const response = await fetch(`http://localhost:3001/users?${queryParams.toString()}`);
                const users = await response.json();

                if (users.length > 0) {
                    const foundUser = users[0];
                    
                    if (String(foundUser.password) === String(password.value)) {
                        userStore.login(foundUser.username);
                        router.push(ROUTES.HOME); 
                    } else {
                        errorMessage.value = 'Nieprawidłowy login lub hasło.';
                    }
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
        username,
        password,
        errorMessage,
        isLoading,
        handleLogin
    };
}