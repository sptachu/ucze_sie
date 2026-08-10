import { onMounted } from 'vue';
import  useDashboardPage  from '@/features/dashboard/composables/useDashboardPage'
import {usePeopleStore} from '@/stores/peopleStore'

export default function useDashboard() {
    const {peopleList, isLoading} = useDashboardPage();
    const peopleStore = usePeopleStore();

    onMounted(() => {
        peopleStore.loadPeople();
    });


    return {
        peopleList,
        isLoading
    };
}