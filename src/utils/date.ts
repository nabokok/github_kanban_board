export const getNumberOdDays = (date: string) => {
    const millisecondsDiff = Date.now() - Date.parse(date)
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const days = Math.floor(millisecondsDiff / millisecondsInDay);

    return days;
}