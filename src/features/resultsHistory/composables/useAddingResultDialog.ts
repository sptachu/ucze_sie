import { ref, reactive, computed } from 'vue';
import { useAppToast } from '@/features/shared/composables/useAppToast'; 
import { useResultsPage } from '@/features/resultsHistory/composables/useResultsPage';
import { ActivityType, ResultRecord } from '@/stores/resultsStore'; 

export type DistanceOptions = {
    label: string,
    value: string
}

export type ActivityOptions = {
    label: string,
    value: ActivityType | string
}

export function useAddingResultDialog(personId: string) {
    const { createRecord, editRecord } = useResultsPage(); 
    const { showSuccess } = useAppToast();
    
    const isSubmitting = ref(false);
    const visible = ref(false);
    const isEditMode = ref(false);
    
    const formData = reactive<ResultRecord>({
        id: '',
        personId: personId, 
        date: '',
        activityType: ActivityType.RUN, 
        distance: '',
        time: '',
        startLocation: '',
        endLocation: '',
        equipment: ''
    });

    const distanceOptions = ref<DistanceOptions[]>([
        { label: '1 km', value: '1 km' },
        { label: '2 km', value: '2 km' },
        { label: '3 km', value: '3 km' },
        { label: '4 km', value: '4 km' },
        { label: '5 km', value: '5 km' },
        { label: '10 km', value: '10 km' },
        { label: 'Półmaraton', value: 'Półmaraton' },
        { label: 'Maraton', value: 'Maraton' },
        { label: '50 km', value: '50 km' },
        { label: '100 km', value: '100 km' }
    ]);

    const activityOptions = ref<ActivityOptions[]>([
        { label: 'Bieg', value: ActivityType.RUN }, 
        { label: 'Rower', value: ActivityType.BIKE } 
    ]);

    const dialogHeader = computed(() => isEditMode.value ? 'Edytuj wynik' : 'Dodaj nowy wynik');
    const submitLabel = computed(() => isEditMode.value ? 'Zapisz zmiany' : 'Dodaj wynik');

    const openResultDialog = (record: ResultRecord | null = null) => {
        isSubmitting.value = false;
        if (record) {
            Object.assign(formData, { ...record }); 
            isEditMode.value = true;
        } else {
            Object.assign(formData, { 
                id: '', 
                personId: personId, 
                date: '', 
                activityType: 'Bieg', 
                distance: '', 
                time: '', 
                startLocation: '', 
                endLocation: '', 
                equipment: '' 
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
        } else {
            const { id, ...newRecordData } = updatedData;
            await createRecord(newRecordData);
            showSuccess('Sukces', 'Zapisano nowy wynik!');
            closeDialog();
        }
    };

    return {
        visible,
        formData, 
        activityOptions,
        distanceOptions,
        dialogHeader,
        submitLabel,
        isSubmitting,
        openResultDialog,
        closeDialog,
        saveResult
    };
}