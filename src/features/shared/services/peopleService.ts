import { Gender } from '@/stores/peopleStore';
import type { Person, User } from '@/stores/peopleStore';

const API_URL = 'http://localhost:3001/people';

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
            // headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(newPerson)
        });
        if (!response.ok) throw new Error('Błąd dodawania zawodnika');
        return response.json();
    },

    async update(id: string, payload: Partial<Person>): Promise<Person> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Błąd aktualizacji zawodnika');
        return response.json();
    },

    async delete(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });
        if (!response.ok) throw new Error('Błąd usuwania zawodnika');
    }
};