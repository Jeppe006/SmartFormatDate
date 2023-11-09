const _textlist = {
    "Today": {
        "en-US": "Today",
        "sv-EU": "Idag",
        "no-EU": "I dag",
        "dk-EU": "I dag",
        "fi-EU": "Tänään",
        "de-EU": "Heute",
    },
    "Yesterday": {
        "en-US": "Yesterday",
        "sv-EU": "Igår",
        "no-EU": "I går",
        "dk-EU": "I går",
        "fi-EU": "Eilen",
        "de-EU": "Gestern"
    },
    "Tomorrow": {
        "en-US": "Tomorrow",
        "sv-EU": "Imorgon",
        "no-EU": "I morgen",
        "dk-EU": "I morgen",
        "fi-EU": "Huomenna",
        "de-EU": "Morgen",
    },
    "Last": {
        "en-US": "Last",
        "sv-EU": "I",
        "no-EU": "Siste",
        "dk-EU": "Sidst",
        "fi-EU": "Viime",
        "de-EU": "Letzten"
    }
};
class SmartFormat {
    language;
    date;
    format;
    constructor(date, language, format) {
        this.language = language || "en-US";
        this.date = date || new Date();
        this.format = format || "long";
    }
    _getWeek(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.floor((pastDays + firstDayOfYear.getDay() + 1) / 7);
    }
    _isValidDate(date) {
        return isNaN(date);
    }
    _splitDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return { year, month, day };
    }
    _isDateInWeek(date) {
        const currentDate = new Date();
        const currentDateSplit = this._splitDate(currentDate);
        const dateSplit = this._splitDate(date);
        const currentWeek = this._getWeek(currentDate);
        const compareWeek = this._getWeek(date);
        const currentYear = currentDateSplit.year;
        const compareYear = dateSplit.year;
        return currentYear == compareYear && currentWeek == compareWeek;
    }
    smartDate() {
        if (this._isValidDate(this.date)) {
            throw Error(`Invalid Argument 1. Date is invalid`);
        }
        const currentDate = new Date();
        const currentDateSplit = this._splitDate(currentDate);
        const dateSplit = this._splitDate(this.date);
        if (currentDateSplit.day - dateSplit.day === 1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year) {
            return _textlist["Yesterday"][this.language];
        }
        else if (currentDateSplit.day - dateSplit.day === -1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year) {
            return _textlist["Tomorrow"][this.language];
        }
        if (currentDate.toDateString() === this.date.toDateString()) {
            return _textlist["Today"][this.language];
        }
        if (this._isDateInWeek(this.date) && dateSplit.day <= currentDateSplit.day) {
            return `${_textlist["Last"][this.language]} ${this.date.toLocaleString(this.language, { weekday: this.format })}`;
        }
        else {
            return `${dateSplit.year} ${this.date.toLocaleString(this.language, { month: this.format })} ${dateSplit.day}`;
        }
    }
}
