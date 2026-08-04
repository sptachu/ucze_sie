import type { RangeAndNote } from '@/stores/calendarStore';

const API_URL = 'http://localhost:3001/calendar';

export const calendarService = {
    async getAll(): Promise<unknown> {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Błąd pobierania kalendarza');
        return response.json();
    },

    async create(payload: RangeAndNote): Promise<unknown> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Błąd zapisu do kalendarza');
        return response.json();
    },

    async delete(id: string): Promise<unknown> {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Błąd usuwania wpisu ${id}`);
        return;
    }
};