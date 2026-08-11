import { ActivityType } from '@/stores/resultsStore'; 

export type DistanceOptions = {
    label: string,
    value: string
}

export type ActivityOptions = {
    label: string,
    value: ActivityType | string
}


export const DISTANCES = [
        '1 km', '2 km', '3 km', '4 km', '5 km', 
        '10 km', 'Półmaraton', 'Maraton', '50 km', '100 km' // todo poprzezuc do tego results const
] as const;

export const DISTANCE_OPTIONS = DISTANCES.map(d => ({ label: d, value: d }));

export const ACTIVITY_OPTIONS: ActivityOptions[] = [
    { label: 'Bieg', value: ActivityType.RUN }, 
    { label: 'Rower', value: ActivityType.BIKE }
];

export const DEFAULT_RESULT_STATE = {
    id: '',
    date: '',
    activityType: ActivityType.RUN, 
    distance: '',
    time: '',
    startLocation: '',
    endLocation: '',
    equipment: ''
};