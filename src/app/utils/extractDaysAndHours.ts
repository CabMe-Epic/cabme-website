export function extractDaysAndHours(durationString: string) {
    const daysMatch = durationString.match(/(\d+)\s+days/);
    const hoursMatch = durationString.match(/(\d+)\s+hours/);

    const days = daysMatch ? parseInt(daysMatch[1], 10) : '0';
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : '0';

    return { days, hours };
}

