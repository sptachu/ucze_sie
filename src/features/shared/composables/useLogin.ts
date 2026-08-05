import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

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
                const response = await fetch('http://localhost:3001/users');
                const users = await response.json();

                const foundUser = users.find(
                    (u: any) => u.username === username.value && String(u.password) === String(password.value)
                );

                if (foundUser) {
                    userStore.login(foundUser.username);
                    router.push('/'); 
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