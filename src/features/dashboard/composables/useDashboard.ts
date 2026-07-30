import { usePeopleStore } from '@/stores/peopleStore';
import { useAddingDialog } from '@/features/dashboard/composables/useAddingDialog';
import type { User } from '@/stores/peopleStore'

export default function useDashboard() {
    const peopleStore = usePeopleStore();
    const { openDialog } = useAddingDialog();

    const handleAdd = () => {
        openDialog(); 
    };
    
    const handleEdit = (user: User) => {
        openDialog(user); 
    };

    const handleDelete = (id: string) => {
        peopleStore.deletePerson(id);
    };

    return {
        peopleStore,
        handleAdd,
        handleEdit,
        handleDelete
    };
}