import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ResultsService } from '@/features/shared/services/resultsService';
import { useAppToast } from '@/features/shared/composables/useAppToast';

export enum ActivityType {
    RUN = 'Bieg',
    BIKE = 'Rower'
}

export interface ResultRecord {
    id: string;               
    personId: string;         
    activityType: ActivityType; 
    distance: string;           
    time: string;               
    startLocation: string;      
    endLocation: string;        
    equipment: string;          
    date: string;               
    notes?: string;             
    elevationGain?: number;     
}



export const useResultsStore = defineStore('results', () => {
    const records = ref<ResultRecord[]>([]);
    const isLoading = ref(false);     

    const loadAllRecords = async () => {
        isLoading.value = true;
        try {
            const data = await ResultsService.getAllRecords();
            setRecords(data);
        } catch (err) {
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    const setRecords = (newRecords: ResultRecord[]) => {
        records.value = newRecords;
    };

    return {
        isLoading,
        records,
        loadAllRecords,
        setRecords
    };
});