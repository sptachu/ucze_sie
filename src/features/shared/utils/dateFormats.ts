export default function dateFormat() {
    const toDateString = (dateString:Date) => {
        if (!(dateString instanceof Date)) return 'Brak daty';
        
        return dateString.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    return {toDateString};
}