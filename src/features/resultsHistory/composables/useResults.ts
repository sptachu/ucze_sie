import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ActivityType } from '@/stores/resultsStore';
import { usePeopleStore } from '@/stores/peopleStore';
import { useResultsPage } from '@/features/resultsHistory/composables/useResultsPage';

export function usePersonResultsPage() {
    const route = useRoute();
    const personId = route.params.id as string;

    const { peopleList } = usePeopleStore();
    const { getPersonRecords, loadAllRecords } = useResultsPage();

    const personRecords = getPersonRecords(personId);

    onMounted(async () => {
        await loadAllRecords();
    });


    const person = computed(() => {
        return peopleList.find(p => p.id === personId) || null;
    });

    const calculateAge = (dob?: string) => {
        if (!dob) return '-';
        const birthYear = new Date(dob).getFullYear();
        return 2026 - birthYear; 
    };

    const preferredSport = computed(() => {
        if (!personRecords.value || personRecords.value.length === 0) return 'Brak danych';
        
        const runCount = personRecords.value.filter(r => r.activityType === ActivityType.RUN).length;
        const bikeCount = personRecords.value.filter(r => r.activityType === ActivityType.BIKE).length;
        
        if (runCount === bikeCount) return 'Bieg i Rower (Po równo)';
        return runCount > bikeCount ? 'Bieganie' : 'Rower';
    });

    const personInfoTable = computed(() => {
        if (!person.value) return [];
        
        return [
            { label: 'Imię i nazwisko', value: `${person.value.firstName} ${person.value.lastName}` },
            { label: 'Płeć', value: person.value.gender },
            { label: 'Data urodzenia', value: person.value.dateOfBirth || 'Brak danych' },
            { label: 'Wiek', value: calculateAge(person.value.dateOfBirth) },
            { label: 'Preferowany sport', value: preferredSport.value } 
        ];
    });

    const personalBests = computed(() => {
        const records = personRecords.value;
        if (!records || records.length === 0) return [];

        const distances = [...new Set(records.map(r => r.distance))];

        return distances.map(dist => {
            const runTimes = records
                .filter(r => r.distance === dist && r.activityType === ActivityType.RUN)
                .map(r => r.time)
                .sort();
            
            const bikeTimes = records
                .filter(r => r.distance === dist && r.activityType === ActivityType.BIKE)
                .map(r => r.time)
                .sort();

            return {
                distance: dist,
                pbRun: runTimes.length > 0 ? runTimes[0] : '-',
                pbBike: bikeTimes.length > 0 ? bikeTimes[0] : '-'
            };
        });
    });

    return {
        personInfoTable,
        personalBests,
        personRecords
    };
}