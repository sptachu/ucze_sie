import { useConfirm } from 'primevue/useconfirm';
import { useAppToast } from '@/features/shared/composables/useAppToast';
import { useResultsPage } from '@/features/resultsHistory/composables/useResultsPage'; 

export function useDeleteResult() {
    const confirm = useConfirm();
    const { showSuccess, showError } = useAppToast();
    const { removeRecord } = useResultsPage(); 

    const confirmResultDeletion = (id: string) => {
        confirm.require({
            message: 'Czy na pewno chcesz trwale usunąć ten wynik?',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle', 
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
                try {
                    await removeRecord(id);
                    
                    showSuccess('Usunięto', 'Wynik został pomyślnie usunięty.');
                } catch (error) {
                    showError('Błąd', 'Nie udało się usunąć wyniku. Spróbuj ponownie.');
                }
            }
        });
    };

    return {
        confirmResultDeletion
    };
}