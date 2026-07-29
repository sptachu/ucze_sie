import { ref } from 'vue';
import { usePeopleStore } from '@/stores/peopleStore';
import type { Person } from '@/stores/peopleStore';

export default function useDashboard() {
    const peopleStore = usePeopleStore();
    
    const isDialogVisible = ref(false);
    const selectedPerson = ref<Person | null>(null);

    const handleAdd = () => {
        selectedPerson.value = null;
        isDialogVisible.value = true;
    };

    const handleEdit = (person: Person) => {
        selectedPerson.value = person;
        isDialogVisible.value = true;
    };

    const handleDelete = (id: string) => {
        peopleStore.deletePerson(id);
    };

    return {
        peopleStore,
        isDialogVisible,
        selectedPerson,
        handleAdd,
        handleEdit,
        handleDelete
    };
}