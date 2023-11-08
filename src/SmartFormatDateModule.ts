class SmartFormat {
    private readonly language: string
    private readonly date: Date
    private readonly format: Intl.DateTimeFormatOptions

    constructor(date: Date, language: string, format: string) {
        this.language = language || "en-US"
        this.date = date || new Date()
        this.format = format || "long"  
    }

    private getWeek(date : Date) : number {
        const firstDayOfYear : Date = new Date(date.getFullYear(), 0, 1)
        const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000
        return Math.floor((pastDays + firstDayOfYear.getDay() + 1) / 7)
    }

    private isValidDate(date : Date | any): boolean {
        return isNaN(date)
    }

    private splitDate(date: Date): { year: number, month: number, day: number } {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return { year, month, day }
    }

    private isDateInWeek(date: Date): boolean {
        const currentDate : Date = new Date()
        const currentDateSplit = this.splitDate(currentDate)
        const dateSplit = this.splitDate(date)

        const currentWeek = this.getWeek(currentDate)
        const compareWeek = this.getWeek(date)
        const currentYear = currentDateSplit.year
        const compareYear = dateSplit.year

        return currentYear == compareYear && currentWeek == compareWeek
    }

    smartDate(): string {
        if(this.isValidDate(this.date)){throw Error(`${console.trace(this.date)} Date is invalid`)}

        const currentDate = new Date()
        const currentDateSplit = this.splitDate(currentDate)
        const dateSplit = this.splitDate(this.date)



        if (
            currentDateSplit.day - dateSplit.day === 1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year
        ) {
            return "Yesterday"
        }else if(
            currentDateSplit.day - dateSplit.day === -1 &&
            currentDateSplit.month == dateSplit.month &&
            currentDateSplit.year == dateSplit.year)
        {
            return "Tomorrow"
        }


        if (currentDate.toDateString() === this.date.toDateString()) {
            return "Today"
        }

        if (this.isDateInWeek(this.date) && dateSplit.day <= currentDateSplit.day) {
            return `Last ${this.date.toLocaleString(this.language, { weekday: this.format })}`
        }else{
            return `${dateSplit.year} ${this.date.toLocaleString(this.language, { month: this.format })} ${dateSplit.day}`
        }

    }
}
