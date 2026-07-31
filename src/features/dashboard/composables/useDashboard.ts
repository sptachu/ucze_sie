import { onMounted } from 'vue';
import { usePeopleStore } from '@/stores/peopleStore';
import { useAddingDialog } from '@/features/dashboard/composables/useAddingDialog';
import type { User } from '@/stores/peopleStore'

export default function useDashboard() {
    const peopleStore = usePeopleStore();
    const { openDialog } = useAddingDialog();

    onMounted(() => {
        peopleStore.loadPeople();
    });


    return {
        peopleStore,
    };
}