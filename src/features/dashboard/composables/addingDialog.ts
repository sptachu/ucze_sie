import { ref, reactive, computed } from 'vue';
import { usePeopleStore, Gender } from '@/stores/peopleStore';
import type { Person } from '@/stores/peopleStore';

export function useAddingDialog() {
    const peopleStore = usePeopleStore();
    
    const visible = ref(false);
    const isEditMode = ref(false);
    
    const formData = reactive({
        id: '',
        firstName: '',
        lastName: '',
        gender: Gender.MALE,
        pb5k: ''
    });

    const genderOptions = ref([
        { label: 'Mężczyzna', value: Gender.MALE },
        { label: 'Kobieta', value: Gender.FEMALE },
        { label: 'Inna', value: Gender.OTHER }
    ]);

    const dialogHeader = computed(() => isEditMode.value ? 'Edytuj zawodnika' : 'Dodaj nowego zawodnika');
    const submitLabel = computed(() => isEditMode.value ? 'Zapisz zmiany' : 'Utwórz zawodnika');

    const openDialog = (person: Person | null = null) => {
        if (person) {
            Object.assign(formData, person); 
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

    const savePerson = () => {
        if (isEditMode.value) {
            peopleStore.updatePerson({ ...formData } as Person);
        } else {
            const { id, ...newPersonData } = formData;
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