import { useToast } from 'primevue/usetoast';

export function useAppToast() {
    const toast = useToast();

    const showSuccess = (summary: string, detail: string, life = 3000) => {
        toast.add({ severity: 'success', summary, detail, life });
    };

    const showError = (summary: string, detail: string, life = 4000) => {
        toast.add({ severity: 'error', summary, detail, life });
    };

    const showInfo = (summary: string, detail: string, life = 3000) => {
        toast.add({ severity: 'info', summary, detail, life });
    };

    return {
        showSuccess,
        showError,
        showInfo
    };
}