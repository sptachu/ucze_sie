import { useConfirm } from 'primevue/useconfirm';
import { usePeopleStore } from '@/stores/peopleStore';

export function useDeleteUser() {
    const confirm = useConfirm();
    const peopleStore = usePeopleStore();

    const confirmDeletion = (id: string) => {
        confirm.require({
            message: 'Czy na pewno chcesz usunąć ten rekord?',
            header: 'Niebezpieczna strefa',
            icon: 'pi pi-info-circle',
            rejectProps: {
                label: 'Anuluj',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Usuń',
                severity: 'danger'
            },
            accept: () => {
                peopleStore.deletePerson(id);
            }
        });
    };

    return {
        confirmDeletion
    };
}