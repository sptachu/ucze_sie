import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ActivityType } from '@/stores/resultsStore';
import { usePeopleStore } from '@/stores/peopleStore';
import { useResultsPage } from '@/features/resultsHistory/composables/useResultsPage';
import { useAppToast } from '@/features/shared/composables/useAppToast'; 
import { useResultsStore } from '@/stores/resultsStore';
import { ROUTES } from '@/router';

export function usePersonResults() {
    const route = useRoute();
    const router = useRouter();
    const personId = route.params.id as string;

    const  peopleStore  = usePeopleStore();
    const { getPersonRecords } = useResultsPage();
    const resultsStore = useResultsStore();
    const { showError } = useAppToast();

    const personRecords = getPersonRecords(personId);


    const person = computed(() => {
        return peopleStore.peopleList.find(p => p.id === personId) || null;
    });

    const calculateAge = (dob?: string) => {
        if (!dob) return '-';
        const birthYear = new Date(dob).getFullYear();
        return new Date().getFullYear() - birthYear; 
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

    const timeToSeconds = (timeStr: string) => {
        const parts = timeStr.split(':').map(Number);
        
        if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2]; 
        } else if (parts.length === 2) {
            return parts[0] * 60 + parts[1]; 
        } else if (parts.length === 1) {
            return parts[0] || 0; 
        }
        
        return 0; 
    };

    const personalBests = computed(() => {
        const records = personRecords.value;
        if (!records || records.length === 0) return [];

        const distances = [...new Set(records.map(r => r.distance))];

        return distances.map(dist => {
            const runTimes = records
                .filter(r => r.distance === dist && r.activityType === ActivityType.RUN)
                .map(r => r.time)
                .sort((a, b) => timeToSeconds(a) - timeToSeconds(b));
            
            const bikeTimes = records
                .filter(r => r.distance === dist && r.activityType === ActivityType.BIKE)
                .map(r => r.time)
                .sort((a, b) => timeToSeconds(a) - timeToSeconds(b));

            return {
                distance: dist,
                pbRun: runTimes.length > 0 ? runTimes[0] : '-',
                pbBike: bikeTimes.length > 0 ? bikeTimes[0] : '-'
            };
        });
    });

    onMounted(async () => {
        if (peopleStore.peopleList.length === 0) {
            await peopleStore.loadPeople(); 
        }
        const exists = peopleStore.peopleList.some(p => p.id === personId);
        
        if (!exists) {
            showError('Błąd', 'Zawodnik o podanym ID nie istnieje.');
            router.replace(ROUTES.DASHBOARD); 
            return; 
        }
        await resultsStore.loadAllRecords();
    });  //ref, composable, computed, (potem jakies funkcje <-- moze sie zamieniac --> watch) onmuted onunmounted na sam koniec są nawet pod to reguły eslint w firmie <-- taka jest kolejność

    return {
        personId,
        personInfoTable,
        personalBests,
        personRecords
    };
}