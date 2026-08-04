import { useConfirm } from 'primevue/useconfirm';
import { useAppToast } from '@/features/shared/composables/useAppToast';
import  useDashboardPage  from '@/features/dashboard/composables/useDashboardPage';

export function useDeleteUser() {
    const confirm = useConfirm();
    const {showSuccess, showError} = useAppToast();
    const { deletePerson } = useDashboardPage();

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
                const isSuccess = await deletePerson(id);

                if (isSuccess) {
                    showSuccess('Usunięto',  `Zawodnik ${firstName} został trwale usunięty z bazy.`)
                    return
                }
                showError('Błąd', `Nie udało się usunąć zawodnika ${firstName}. Spróbuj ponownie.`)
                
            }
        });
    };

    return {
        confirmDeletion
    };
}