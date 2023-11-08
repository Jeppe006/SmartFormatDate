class SmartFormat {
    language;
    date;
    format;
    constructor(date, language, format) {
        this.language = language || "en-US";
        this.date = date || new Date();
        this.format = format || "long";
    }
    getWeek(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.floor((pastDays + firstDayOfYear.getDay() + 1) / 7);
    }
    isValidDate(date) {
        return isNaN(date);
    }
    splitDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return { year, month, day };
    }
    isDateInWeek(date) {
        const currentDate = new Date();
        const currentDateSplit = this.splitDate(currentDate);
        const dateSplit = this.splitDate(date);
        const currentWeek = this.getWeek(currentDate);
        const compareWeek = this.getWeek(date);
        const currentYear = currentDateSplit.year;
        const compareYear = dateSplit.year;
        return currentYear == compareYear && currentWeek == compareWeek;
    }
    smartDate() {
        if (this.isValidDate(this.date)) {
            throw Error(`${console.trace(this.date)} Date is invalid`);
        }
        const currentDate = new Date();
        const currentDateSplit = this.splitDate(currentDate);
        const dateSplit = this.splitDate(this.date);
        if (currentDateSplit.day - dateSplit.day === 1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year) {
            return "Yesterday";
        }
        else if (currentDateSplit.day - dateSplit.day === -1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year) {
            return "Tomorrow";
        }
        if (currentDate.toDateString() === this.date.toDateString()) {
            return "Today";
        }
        if (this.isDateInWeek(this.date) && dateSplit.day <= currentDateSplit.day) {
            return `Last ${this.date.toLocaleString(this.language, { weekday: this.format })}`;
        }
        else {
            return `${dateSplit.year} ${this.date.toLocaleString(this.language, { month: this.format })} ${dateSplit.day}`;
        }
    }
}
