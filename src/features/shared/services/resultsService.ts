import type { ResultRecord } from '@/stores/resultsStore';
import { API } from '@/features/shared/dict/storageKeys';

const API_URL = `${API.BASE_URL}${API.RESULTS}`; 

export const ResultsService = {
    
    async getAllRecords(): Promise<ResultRecord[]> {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Błąd podczas pobierania historii wyników');
        
        return response.json();
    },

    async addRecord(record: Omit<ResultRecord, 'id'>): Promise<ResultRecord> {
        const newRecord:ResultRecord = {
            ...record,
            id: crypto.randomUUID()
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newRecord)
        });
        
        if (!response.ok) throw new Error('Błąd podczas dodawania wyniku');
        
        return response.json();
    },

    
    async updateRecord(id: string, updatedData: Partial<ResultRecord>): Promise<ResultRecord> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH', 
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) throw new Error('Błąd podczas aktualizacji wyniku');
        
        return response.json();
    },

    async deleteRecord(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Błąd podczas usuwania wyniku');
    }
};