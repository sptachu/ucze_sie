import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

export function useNavbar() {
    const router = useRouter();
    const userStore = useUserStore();

    const handleLogout = () => {
        userStore.logout();
        router.push({ name: 'login' });
    };

    return {
        userStore,
        handleLogout
    };
}