import { usePeopleStore, Gender } from '@/stores/peopleStore';
import { useToast } from 'primevue/usetoast';

// Proste bazy danych do losowania
const maleNames = ['Jan', 'Piotr', 'Kamil', 'Michał', 'Tomasz', 'Jakub', 'Maciej', 'Dawid'];
const femaleNames = ['Anna', 'Katarzyna', 'Magdalena', 'Julia', 'Zuzanna', 'Maja', 'Alicja'];
const lastNames = ['Kowalski', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński'];

export function useRandomPerson() {
    const peopleStore = usePeopleStore();
    const toast = useToast();

    const generateRandom = async () => {
        const isMale = Math.random() > 0.5;
        const gender = isMale ? Gender.MALE : Gender.FEMALE;

        const namesArray = isMale ? maleNames : femaleNames;
        const firstName = namesArray[Math.floor(Math.random() * namesArray.length)];
        
        
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        if (!isMale && lastName.endsWith('i')) {
            lastName = lastName.slice(0, -1) + 'a'; 
        }

        const minutes = Math.floor(Math.random() * (35 - 14 + 1)) + 14;
        const seconds = Math.floor(Math.random() * 60);
        const pb5k = `${minutes}:${seconds.toString().padStart(2, '0')}`; // padStart dodaje zero, np. 15:05 zamiast 15:5

        const newRandomPerson = {
            firstName,
            lastName,
            gender,
            pb5k
        };

        const isSuccess = await peopleStore.addPerson(newRandomPerson);

        if (isSuccess) {
            toast.add({ 
                severity: 'success', 
                summary: 'Wylosowano', 
                detail: `Dodano biegacza: ${firstName} ${lastName} (${pb5k})`, 
                life: 3000 
            });
        } else {
            toast.add({ 
                severity: 'error', 
                summary: 'Błąd', 
                detail: 'Nie udało się zapisać losowego biegacza.', 
                life: 3000 
            });
        }
    };

    return { generateRandom };
}