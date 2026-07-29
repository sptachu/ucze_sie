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
    pb5k: string; // np. "19:45"
    createdAt: string; 
    updatedAt: string;
}

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);

    // Dodajemy osobę. Wykluczamy id, createdAt i updatedAt, bo sklep wygeneruje je sam.
    const addPerson = (personData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString(); 
        
        const newPerson: Person = {
            ...personData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now
        };
        peopleList.value.push(newPerson);
    };

    const updatePerson = (updatedPerson: Person) => {
        const index = peopleList.value.findIndex(p => p.id === updatedPerson.id);
        if (index !== -1) {
            updatedPerson.updatedAt = new Date().toISOString();
            peopleList.value[index] = updatedPerson;
        }
    };

    const deletePerson = (id: string) => {
        peopleList.value = peopleList.value.filter(p => p.id !== id);
    };

    return {
        peopleList,
        addPerson,
        updatePerson,
        deletePerson
    };
}, {
    persist: true
});