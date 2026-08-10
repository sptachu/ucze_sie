import { defineStore } from 'pinia';
import { ref } from 'vue';
import { peopleService } from '@/features/shared/services/peopleService'; 

export enum Gender {
    MALE = 'Mężczyzna',
    FEMALE = 'Kobieta',
    OTHER = 'Inna'
}

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    createdAt: string; 
    updatedAt: string;
    dateOfBirth: string;
}

export type User = Omit<Person, 'createdAt' | 'updatedAt'>;

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);
    const isLoading = ref(false);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadPeople = async () => {
        isLoading.value = true;
        try {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            /*
            await new Promise<void>((resolve) => {
                timeoutId = setTimeout(() => {
                    timeoutId = null; 
                    resolve();        
                }, 2000);
            }); */
            const data = await peopleService.getAll();
            setPeople(data);
            return true;
        } catch (error) {
            console.error('Błąd w loadPeople:', error);
            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const setPeople = (data: Person[]) => {
        peopleList.value = data;
    };

    return {
        peopleList,
        isLoading,
        loadPeople,
        setPeople
    };
});
