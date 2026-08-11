import { ref, reactive, computed } from 'vue';
import { useAppToast } from '@/features/shared/composables/useAppToast'; 
import { useResultsPage } from '@/features/resultsHistory/composables/useResultsPage';
import {  ResultRecord } from '@/stores/resultsStore'; 
import { DISTANCE_OPTIONS, ACTIVITY_OPTIONS, DEFAULT_RESULT_STATE } from '../shared/const/results.const';


export function useAddingResultDialog(personId: string) {
    const { createRecord, editRecord } = useResultsPage(); 
    const { showSuccess } = useAppToast();
    
    const isSubmitting = ref(false);
    const visible = ref(false);
    const isEditMode = ref(false);
    
    const formData = reactive<ResultRecord>({
        ...DEFAULT_RESULT_STATE,
        personId: personId
    });


    const dialogHeader = computed(() => isEditMode.value ? 'Edytuj wynik' : 'Dodaj nowy wynik');
    const submitLabel = computed(() => isEditMode.value ? 'Zapisz zmiany' : 'Dodaj wynik');

    const openResultDialog = (record: ResultRecord | null = null) => {
        isSubmitting.value = false;
        if (record) {
            Object.assign(formData, { ...record }); 
            isEditMode.value = true;
        } else {
            Object.assign(formData, { 
                ...DEFAULT_RESULT_STATE, 
                personId: personId 
            });
            isEditMode.value = false;
        }
        visible.value = true;
    };

    const closeDialog = () => {
        visible.value = false;
    };

    const saveResult = async (updatedData: ResultRecord) => {
        if (isSubmitting.value) return;
        isSubmitting.value = true;

        if (isEditMode.value) {
            await editRecord(updatedData.id, updatedData);
            showSuccess('Sukces', 'Zapisano wynik!');
            closeDialog();
            
            return;
        } 
        
        const { id, ...newRecordData } = updatedData;
        await createRecord(newRecordData);
        showSuccess('Sukces', 'Zapisano nowy wynik!');
        closeDialog();
        
    };

    return {
        activityOptions: ACTIVITY_OPTIONS,
        visible,
        formData, 
        distanceOptions: DISTANCE_OPTIONS,
        dialogHeader,
        submitLabel,
        isSubmitting,
        openResultDialog,
        closeDialog,
        saveResult
    };
}