import { defineStore } from 'pinia';
import { ref } from 'vue';

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
    pb5k: string;
    createdAt: string; 
    updatedAt: string;
}

export type User = Omit<Person, 'createdAt' | 'updatedAt'>;

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);
    const isLoading = ref(false);

    const setPeople = (data: Person[]) => {
        peopleList.value = data;
    };

    return {
        peopleList,
        isLoading,
        setPeople
    };
});
