declare module 'lunar-javascript' {
    export class Solar {
        static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
        getLunar(): Lunar;
    }
    export class Lunar {
        getEightChar(): EightChar;
    }
    export class Gan {
        getWuXing(): string;
        getName(): string;
        toString(): string;
    }
    export class Zhi {
        getWuXing(): string;
        getName(): string;
        getShengxiao(): Shengxiao;
        toString(): string;
    }
    export class Shengxiao {
        getName(): string;
        toString(): string;
    }
    export class EightChar {
        getYearGan(): Gan;
        getYearZhi(): Zhi;
        getMonthGan(): Gan;
        getMonthZhi(): Zhi;
        getDayGan(): Gan;
        getDayZhi(): Zhi;
        getTimeGan(): Gan;
        getTimeZhi(): Zhi;
    }
}
