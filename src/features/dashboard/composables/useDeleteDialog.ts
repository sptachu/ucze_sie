import { useConfirm } from 'primevue/useconfirm';
import { usePeopleStore } from '@/stores/peopleStore';
import { useToast } from 'primevue/usetoast';

export function useDeleteUser() {
    const confirm = useConfirm();
    const peopleStore = usePeopleStore();
    const toast = useToast();

    const confirmDeletion = (id: string, firstName:string) => {
        confirm.require({
            message: `Czy na pewno chcesz usunąć zawodnika ${firstName}?`,
            header: `Dezintegracja zawodnika ${firstName}`,
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
            accept: async () => {
                const isSuccess = await peopleStore.deletePerson(id);

                if (isSuccess) {
                    toast.add({ 
                        severity: 'error', 
                        summary: 'Usunięto', 
                        detail: `Zawodnik ${firstName} został trwale usunięty z bazy.`, 
                        life: 5000 
                    });
                } else {
                    toast.add({ 
                        severity: 'warn', 
                        summary: 'Błąd', 
                        detail: `Nie udało się usunąć zawodnika ${firstName}. Spróbuj ponownie.`, 
                        life: 6000 
                    });
                }
            }
        });
    };

    return {
        confirmDeletion
    };
}