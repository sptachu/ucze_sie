import { defineStore } from 'pinia';
import { ref } from 'vue';
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

    const setRecords = (newRecords: ResultRecord[]) => {
        records.value = newRecords;
    };

    return {
        records,
        setRecords
    };
});