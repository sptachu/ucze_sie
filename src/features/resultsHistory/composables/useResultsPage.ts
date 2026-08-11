import { ref, computed } from 'vue';
import { useResultsStore } from '@/stores/resultsStore'; 
import { ResultsService } from '@/features/shared/services/resultsService'; 
import type { ResultRecord } from '@/stores/resultsStore';

export function useResultsPage() {
    const resultsStore = useResultsStore();

    const isLoading = ref(false);       
    const isSubmitting = ref(false);    
    const error = ref<string | null>(null);

    
    const createRecord = async (recordData: Omit<ResultRecord, 'id'>) => {
        isSubmitting.value = true;
        error.value = null;
        try {
            const newRecord = await ResultsService.addRecord(recordData);
            
            const updatedRecords = [...resultsStore.records, newRecord];
            resultsStore.setRecords(updatedRecords);
            
            return newRecord; 
        } catch (err) {
            console.error(err);
            error.value = 'Nie udało się zapisać nowego wyniku.';
            throw err;
        } finally {
            isSubmitting.value = false;
        }
    };

    
    const editRecord = async (id: string, updatedData: Partial<ResultRecord>) => {
        isSubmitting.value = true;
        error.value = null;
        try {
            const updatedRecord = await ResultsService.updateRecord(id, updatedData);
            
            const updatedRecords = resultsStore.records.map(record => 
                record.id === id ? updatedRecord : record
            );
            resultsStore.setRecords(updatedRecords);
        } catch (err) {
            console.error(err);
            error.value = 'Nie udało się zaktualizować wyniku.';
            throw err;
        } finally {
            isSubmitting.value = false;
        }
    };

    
    const removeRecord = async (id: string) => {
        isSubmitting.value = true;
        error.value = null;
        try {
            await ResultsService.deleteRecord(id);
            
            const updatedRecords = resultsStore.records.filter(record => record.id !== id);
            resultsStore.setRecords(updatedRecords);
        } catch (err) {
            console.error(err);
            error.value = 'Nie udało się usunąć wyniku.';
            throw err;
        } finally {
            isSubmitting.value = false;
        }
    };

    const getPersonRecords = (personId: string) => {
        return computed(() => {
            return resultsStore.records.filter(record => record.personId === personId);
        });
    };

    return {
        
        records: computed(() => resultsStore.records), 
        
        isSubmitting,
        error,
        
        createRecord,
        editRecord,
        removeRecord,
        
        getPersonRecords
    };
}