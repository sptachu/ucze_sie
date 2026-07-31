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

const API_URL = 'http://localhost:3001/people';

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);

    const loadPeople = async () => {
        try {
            const response = await fetch(API_URL);
            
            if (response.ok) {
                const data = await response.json();
                
                peopleList.value = data;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            return false;
        }
    };

    const addPerson = async (personData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString(); 
        
        const newPerson: Person = {
            ...personData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now
        };

        try {            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPerson)
            });

            if (response.ok) {
                const savedPerson = await response.json();
                peopleList.value.push(savedPerson); 
                return true;
            } else {
                console.error('Błąd HTTP! Status:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Błąd połączenia fetch:', error);
            return false;
        }
    };

    const updatePerson = async (updatedUser: User) => {
        const person = peopleList.value.find(p => p.id === updatedUser.id);
        
        if (person) {
            const payloadToSave: Person = {
                ...person,
                ...updatedUser,
                updatedAt: new Date().toISOString()
            };

            try {
                const response = await fetch(`${API_URL}/${updatedUser.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payloadToSave)
                });

                if (response.ok) {
                    person.firstName = updatedUser.firstName;
                    person.lastName = updatedUser.lastName;
                    person.gender = updatedUser.gender;
                    person.pb5k = updatedUser.pb5k;
                    person.updatedAt = payloadToSave.updatedAt;
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Błąd podczas aktualizacji:', error);
                return false;
            }
        }
        return false;
    };

    const deletePerson = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                peopleList.value = peopleList.value.filter(p => p.id !== id);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Błąd podczas usuwania:', error);
            return false;
        }
    };

    return {
        peopleList,
        loadPeople,
        addPerson,
        updatePerson,
        deletePerson
    };
});
