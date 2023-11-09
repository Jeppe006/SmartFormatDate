const _textlist = {
    "Today" : {
        "en-US": "Today",
        "sv-EU": "Idag",
        "no-EU": "I dag",
        "dk-EU": "I dag",
        "fi-EU": "Tänään",
        "de-EU": "Heute",
    },
    "Yesterday" : {
        "en-US": "Yesterday",
        "sv-EU": "Igår",
        "no-EU": "I går",
        "dk-EU": "I går",
        "fi-EU": "Eilen",
        "de-EU": "Gestern"
    },

    "Tomorrow" : {
        "en-US": "Tomorrow",
        "sv-EU": "Imorgon",
        "no-EU": "I morgen",
        "dk-EU": "I morgen",
        "fi-EU": "Huomenna",
        "de-EU": "Morgen",
    },
    "Last" : {
        "en-US": "Last",
        "sv-EU": "I",
        "no-EU": "Siste",
        "dk-EU": "Sidst",
        "fi-EU": "Viime",
        "de-EU": "Letzten"
    }
}

class SmartFormat {
    private readonly language: string
    private readonly date: Date
    private readonly format: Intl.DateTimeFormatOptions | string

    constructor(date: Date, language: string, format: string) {
        this.language = language || "en-US"
        this.date = date || new Date()
        this.format = format || "long"  
    }

    private _getWeek(date : Date) : number {
        const firstDayOfYear : Date = new Date(date.getFullYear(), 0, 1)
        const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000
        return Math.floor((pastDays + firstDayOfYear.getDay() + 1) / 7)
    }

    private _isValidDate(date : Date | any): boolean {
        return isNaN(date)
    }

    private _splitDate(date: Date): { year: number, month: number, day: number } {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return { year, month, day }
    }

    private _isDateInWeek(date: Date): boolean {
        const currentDate : Date = new Date()
        const currentDateSplit = this._splitDate(currentDate)
        const dateSplit = this._splitDate(date)

        const currentWeek = this._getWeek(currentDate)
        const compareWeek = this._getWeek(date)
        const currentYear = currentDateSplit.year
        const compareYear = dateSplit.year

        return currentYear == compareYear && currentWeek == compareWeek
    }

    smartDate(): string {
        if(this._isValidDate(this.date)){throw Error(`Invalid Argument 1. Date is invalid`)}

        const currentDate = new Date()
        const currentDateSplit = this._splitDate(currentDate)
        const dateSplit = this._splitDate(this.date)



        if (
            currentDateSplit.day - dateSplit.day === 1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year
        ) {
            return _textlist["Yesterday"][this.language]
        }else if(
            currentDateSplit.day - dateSplit.day === -1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year)
        {
            return _textlist["Tomorrow"][this.language]
        }


        if (currentDate.toDateString() === this.date.toDateString()) {
            return _textlist["Today"][this.language]
        }

        if (this._isDateInWeek(this.date) && dateSplit.day <= currentDateSplit.day) {
            return `${_textlist["Last"][this.language]} ${this.date.toLocaleString(this.language, { weekday: this.format })}`
        }else{
            return `${dateSplit.year} ${this.date.toLocaleString(this.language, { month: this.format })} ${dateSplit.day}`
        }

    }
}
