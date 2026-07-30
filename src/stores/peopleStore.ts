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

export type User = Omit<Person, 'createdAt' | 'updatedAt'>;

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);

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

    const updatePerson = (updatedUser: User) => {
        const person = peopleList.value.find(p => p.id === updatedUser.id);
        
        if (person) {
            person.firstName = updatedUser.firstName;
            person.lastName = updatedUser.lastName;
            person.gender = updatedUser.gender;
            person.pb5k = updatedUser.pb5k;
            
            person.updatedAt = new Date().toISOString();
            
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