export default function dateFormat() {
    const toDateString = (dateString:Date|string) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return 'Brak daty';
        }
        
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    return {toDateString};
}