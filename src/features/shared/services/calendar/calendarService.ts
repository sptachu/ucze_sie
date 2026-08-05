import type { RangeAndNote } from '@/stores/calendarStore';

const API_URL = 'http://localhost:3001/calendar';

export const calendarService = {
    async getAll(): Promise<RangeAndNote[]> {
        const response = await fetch(API_URL);
        return response.json();
    },

    async create(payload: RangeAndNote): Promise<RangeAndNote> {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        return response.json();
    },

    async delete(id: string): Promise<RangeAndNote> {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        return response.json();
    }
};