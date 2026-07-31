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

// Baza adresu do Twojego json-servera
const API_URL = 'http://localhost:3001/people';

export const usePeopleStore = defineStore('people', () => {
    const peopleList = ref<Person[]>([]);

    // 1. NOWA FUNKCJA: Pobieranie danych z bazy przy starcie aplikacji
    const loadPeople = async () => {
        console.log('1. Odpalam loadPeople - wysyłam zapytanie do serwera...');
        try {
            const response = await fetch(API_URL);
            console.log('2. Serwer odpowiedział statusem:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('3. Pobrane dane z bazy:', data);
                
                // Reaktywne przypisanie danych
                peopleList.value = data;
            }
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    };

    // 2. DODAWANIE: Najpierw POST do bazy, potem push do tablicy
    const addPerson = async (personData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString(); 
        
        const newPerson: Person = {
            ...personData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now
        };

        try {
            console.log('1. Próbuję wysłać do json-server:', newPerson);
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPerson)
            });

            console.log('2. Status odpowiedzi serwera:', response.status);

            if (response.ok) {
                const savedPerson = await response.json();
                console.log('3. Serwer zapisał i zwrócił:', savedPerson);
                peopleList.value.push(savedPerson); 
            } else {
                console.error('Błąd HTTP! Status:', response.status);
            }
        } catch (error) {
            console.error('Błąd połączenia fetch:', error);
        }
    };

    // 3. AKTUALIZACJA: Najpierw PUT do bazy, potem chirurgiczna zmiana w tablicy
    const updatePerson = async (updatedUser: User) => {
        const person = peopleList.value.find(p => p.id === updatedUser.id);
        
        if (person) {
            // Przygotowujemy nowy obiekt dla serwera łącząc stare dane z nowymi
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
                    // Jeśli serwer zapisał, aktualizujemy widok na ekranie (Twój bezpieczny kod)
                    person.firstName = updatedUser.firstName;
                    person.lastName = updatedUser.lastName;
                    person.gender = updatedUser.gender;
                    person.pb5k = updatedUser.pb5k;
                    person.updatedAt = payloadToSave.updatedAt;
                }
            } catch (error) {
                console.error('Błąd podczas aktualizacji:', error);
            }
        }
    };

    // 4. USUWANIE: Najpierw DELETE w bazie, potem filter w tablicy
    const deletePerson = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                peopleList.value = peopleList.value.filter(p => p.id !== id);
            }
        } catch (error) {
            console.error('Błąd podczas usuwania:', error);
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
// UWAGA: Usunięto całkowicie persist: true!



/*import { defineStore } from 'pinia';
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
*/