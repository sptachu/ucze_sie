import { onMounted } from 'vue';
import  useDashboardPage  from '@/features/dashboard/composables/useDashboardPage'

export default function useDashboard() {
    const {peopleList, isLoading, loadPeople } = useDashboardPage();

    onMounted(() => {
        loadPeople();
    });


    return {
        peopleList,
        isLoading
    };
}