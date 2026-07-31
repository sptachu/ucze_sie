import { onMounted } from 'vue';
import { usePeopleStore } from '@/stores/peopleStore';

export default function useDashboard() {
    const peopleStore = usePeopleStore();

    onMounted(() => {
        peopleStore.loadPeople();
    });


    return {
        peopleStore,
    };
}