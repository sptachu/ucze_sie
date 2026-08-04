import { computed } from 'vue';
import { usePeopleStore } from '@/stores/peopleStore';
import { peopleService } from '@/features/shared/services/peopleService';
import type { Person, User } from '@/stores/peopleStore';

export default function useDashboardPage() {
    const store = usePeopleStore();

    const loadPeople = async () => {
        store.isLoading = true;
        try {
            //await new Promise(resolve => setTimeout(resolve, 2000)); 
            const data = await peopleService.getAll();
            store.setPeople(data);
            return true;
        } catch (error) {
            console.error('Błąd w loadPeople:', error);
            return false;
        } finally {
            store.isLoading = false;
        }
    };

    const addPerson = async (personData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await peopleService.create(personData);
            await loadPeople(); 
            return true;
        } catch (error) {
            console.error('Błąd w addPerson:', error);
            return false;
        }
    };

    const updatePerson = async (updatedUser: User) => {
        try {
            const current = store.peopleList.find(p => p.id === updatedUser.id);
            if (!current) return false;

            const payload = {
                ...current,
                ...updatedUser,
                updatedAt: new Date().toISOString()
            };

            await peopleService.update(updatedUser.id, payload);
            await loadPeople(); 
            return true;
        } catch (error) {
            console.error('Błąd w updatePerson:', error);
            return false;
        }
    };

    const deletePerson = async (id: string) => {
        try {
            await peopleService.delete(id);
            await loadPeople(); 
            return true;
        } catch (error) {
            console.error('Błąd w deletePerson:', error);
            return false;
        }
    };

    const peopleList = computed(() => {
        return store.peopleList.map(person => ({
            ...person,
            fullName: `${person.firstName} ${person.lastName}` 
        }));
    });

    return {
        peopleList,
        isLoading: computed(() => store.isLoading),
        loadPeople,
        addPerson,
        updatePerson,
        deletePerson
    };
}