import { ref, reactive, computed } from 'vue';
import { Gender } from '@/stores/peopleStore';
import type { User } from '@/stores/peopleStore';
import { useAppToast } from '@/features/shared/composables/useAppToast'; 
import  useDashboardPage  from '@/features/dashboard/composables/useDashboardPage'

export type GenderOptions = {
    label:string,
    value: Gender
}

export function useAddingDialog() {
    const { addPerson, updatePerson } = useDashboardPage();
    const {showSuccess, showError} = useAppToast();
    const isSubmitting = ref(false);
    
    const visible = ref(false);
    const isEditMode = ref(false);
    
    const formData = reactive<User>({
        id: '',
        firstName: '',
        lastName: '',
        gender: Gender.MALE,
        dateOfBirth: ''
    });

    const genderOptions = ref<GenderOptions[]>([
        { label: 'Mężczyzna', value: Gender.MALE },
        { label: 'Kobieta', value: Gender.FEMALE },
        { label: 'Inna', value: Gender.OTHER }
    ]);

    const dialogHeader = computed(() => isEditMode.value ? 'Edytuj zawodnika' : 'Dodaj nowego zawodnika');
    const submitLabel = computed(() => isEditMode.value ? 'Zapisz zmiany' : 'Utwórz zawodnika');

    const openDialog = (user: User | null = null) => {
        isSubmitting.value = false;
        if (user) {
            Object.assign(formData, {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
            }); 
            isEditMode.value = true;
        } else {
            Object.assign(formData, { id: '', firstName: '', lastName: '', gender: Gender.MALE, dateOfBirth: '' }); 
            isEditMode.value = false;
        }
        visible.value = true;
    };

    const closeDialog = () => {
        visible.value = false;
    };

    const savePerson = async (updatedData: User) => {
        if (isSubmitting.value) return;
        let isSuccess = false; 
        isSubmitting.value = true;

        if (isEditMode.value) {
            isSuccess = await updatePerson(updatedData);
        } else {
            const { id, ...newPersonData } = updatedData;
            isSuccess = await addPerson(newPersonData);
        }

        if (isSuccess) {
            showSuccess('sukces', 'zapisano zawodnika')
            closeDialog(); 
        } else {
            showError('Błąd','Nie udało się zapisać. Sprawdź połączenie.');
            isSubmitting.value = false;
        }
    };

    return {
        visible,
        formData, 
        genderOptions,
        dialogHeader,
        submitLabel,
        isSubmitting,
        openDialog,
        closeDialog,
        savePerson
    };
}