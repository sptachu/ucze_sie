import type { Person} from '@/stores/peopleStore';
import { API } from '../dict/storageKeys';

const API_URL = `${API.BASE_URL}${API.PEOPLE}`;

export const peopleService = {
    async getAll(): Promise<Person[]> {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Nie udało się pobrać listy zawodników');
        return response.json();
    },

    async create(personData: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person> {
        const now = new Date().toISOString(); 
        const newPerson: Person = {
            ...personData,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newPerson)
        });
        return response.json();
    },

    async update(id: string, payload: Partial<Person>): Promise<Person> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
        return response.json();
    },

    async delete(id: string): Promise<Person> {  
        const res = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });
        return res.json();
    }
};