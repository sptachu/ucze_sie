import { Gender } from '@/stores/peopleStore';
import { useAppToast } from '@/features/shared/composables/useAppToast';
import  useDashboardPage  from '@/features/dashboard/composables/useDashboardPage'

// Proste bazy danych do losowania
const maleNames = ['Jan', 'Piotr', 'Kamil', 'Michał', 'Tomasz', 'Jakub', 'Maciej', 'Dawid'];
const femaleNames = ['Anna', 'Katarzyna', 'Magdalena', 'Julia', 'Zuzanna', 'Maja', 'Alicja'];
const lastNames = ['Kowalski', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamiński', 'Lewandowski', 'Zieliński'];

export function useRandomPerson() {
    const { addPerson } = useDashboardPage();
    const { showError, showSuccess } = useAppToast();

    const generateRandom = async () => {
        const isMale = Math.random() > 0.5;
        const gender = isMale ? Gender.MALE : Gender.FEMALE;

        const namesArray = isMale ? maleNames : femaleNames;
        const firstName = namesArray[Math.floor(Math.random() * namesArray.length)];
        
        
        let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        if (!isMale && lastName.endsWith('i')) {
            lastName = lastName.slice(0, -1) + 'a'; 
        }

        const getRandomDateOfBirth = (): string => {
            const start = new Date(1950, 0, 1).getTime();
            const end = new Date(2005, 11, 31).getTime();
            
            const randomDate = new Date(start + Math.random() * (end - start));
            
            const year = randomDate.getFullYear();
            const month = String(randomDate.getMonth() + 1).padStart(2, '0');
            const day = String(randomDate.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        };
        
        const dateOfBirth = getRandomDateOfBirth();

        const newRandomPerson = {
            firstName,
            lastName,
            gender,
            dateOfBirth
        };

        const isSuccess = await addPerson(newRandomPerson);

        if (isSuccess) {
            showSuccess('Wylosowano', `Dodano biegacza: ${firstName} ${lastName} (${dateOfBirth})`);
            return // sprawdź early return
        } 
        
        showError('Błąd', 'Nie udało się zapisać losowego biegacza.'); 
    };

    return { generateRandom };
}