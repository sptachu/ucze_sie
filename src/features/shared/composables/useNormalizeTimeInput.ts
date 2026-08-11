export const normalizeTimeInput = (timeStr: string): string => {
    if (!timeStr) return '00:00:00';

    const parts = timeStr.split(':').map(val => Number(val) || 0);
    
    let totalSeconds = 0;

    if (parts.length === 3) {
        totalSeconds = (parts[0] * 3600) + (parts[1] * 60) + parts[2];
    } else if (parts.length === 2) {
        totalSeconds = (parts[0] * 60) + parts[1];
    } else {
        totalSeconds = parts[0];
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};