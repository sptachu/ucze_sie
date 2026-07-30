import { ref, reactive, computed } from 'vue';
import { usePeopleStore, Gender } from '@/stores/peopleStore';
import type { Person, User } from '@/stores/peopleStore';

export type GenderOptions = {
    label:string,
    value: Gender
}

export function useAddingDialog() {
    const peopleStore = usePeopleStore();
    
    const visible = ref(false);
    const isEditMode = ref(false);
    
    const formData = reactive<User>({
        id: '',
        firstName: '',
        lastName: '',
        gender: Gender.MALE,
        pb5k: ''
    });

    const genderOptions = ref<GenderOptions[]>([
        { label: 'Mężczyzna', value: Gender.MALE },
        { label: 'Kobieta', value: Gender.FEMALE },
        { label: 'Inna', value: Gender.OTHER }
    ]);

    const dialogHeader = computed(() => isEditMode.value ? 'Edytuj zawodnika' : 'Dodaj nowego zawodnika');
    const submitLabel = computed(() => isEditMode.value ? 'Zapisz zmiany' : 'Utwórz zawodnika');

    const openDialog = (user: User | null = null) => {
        if (user) {
            Object.assign(formData, {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                pb5k: user.pb5k
            }); 
            isEditMode.value = true;
        } else {
            Object.assign(formData, { id: '', firstName: '', lastName: '', gender: Gender.MALE, pb5k: '' }); 
            isEditMode.value = false;
        }
        visible.value = true;
    };

    const closeDialog = () => {
        visible.value = false;
    };

    const savePerson = (updatedData: User) => {
        if (isEditMode.value) {
            peopleStore.updatePerson(updatedData);
        } else {
            const { id, ...newPersonData } = updatedData;
            peopleStore.addPerson(newPersonData);
        }
        closeDialog(); 
    };

    return {
        visible,
        formData, 
        genderOptions,
        dialogHeader,
        submitLabel,
        openDialog,
        closeDialog,
        savePerson
    };
}