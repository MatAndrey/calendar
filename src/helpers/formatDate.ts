const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export function formatDate(date: Date | number, format: string) {
    if (typeof date === "number") {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let result = format;
    result = result.replace("YYYY", String(year));
    result = result.replace("YY", String(year).substring(2));
    result = result.replace("MM", String(month));
    result = result.replace("month", months[date.getMonth()]);
    result = result.replace("DD", String(day));
    result = result.replace("day", daysOfWeek[date.getDay()]);
    result = result.replace("hh", String(hours));
    result = result.replace("mm", String(minutes));
    result = result.replace("ss", String(seconds));
    return result;
}
