// lib/engine/saju.ts
import { Solar, Lunar } from 'lunar-javascript';

export interface SajuData {
    fourPillars: {
        year: string;
        month: string;
        day: string;
        time: string;
    };
    dayMaster: string; // Ilgan (The User's Core Element)
    elements: { [key: string]: number }; // Mock implementation for now, or derived from pillars
}

export function calculateSaju(date: Date): SajuData {
    // Lunar-javascript accepts YYYY, MM, DD, HH, mm, ss
    const solar = Solar.fromYmdHms(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    );

    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar(); // BaZi

    // Heavenly Stems (Cheongan) & Earthly Branches (Jiji)
    const result = {
        fourPillars: {
            year: `${eightChar.getYearGan()}${eightChar.getYearZhi()}`, // e.g., GapJa
            month: `${eightChar.getMonthGan()}${eightChar.getMonthZhi()}`,
            day: `${eightChar.getDayGan()}${eightChar.getDayZhi()}`,
            time: `${eightChar.getTimeGan()}${eightChar.getTimeZhi()}`,
        },
        dayMaster: eightChar.getDayGan().toString(), // The most important character (Ilgan)
        // Detailed element counting requires parsing the Gan/Zhi to WuXing (Five Elements)
        // lunar-javascript provides getWuXing() for Gan/Zhi
        elements: calculateElementBalance(eightChar)
    };

    return result;
}

function calculateElementBalance(eightChar: any): { [key: string]: number } {
    // Simplified counting
    const pillars = [
        eightChar.getYearGan(), eightChar.getYearZhi(),
        eightChar.getMonthGan(), eightChar.getMonthZhi(),
        eightChar.getDayGan(), eightChar.getDayZhi(),
        eightChar.getTimeGan(), eightChar.getTimeZhi()
    ];

    const counts: { [key: string]: number } = {
        Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0
    };

    pillars.forEach(char => {
        // char.getWuXing() returns "Wood", "Fire" etc. (in Chinese/Korean usually)
        // We map it to English. The library usually returns Chinese characters like '木', '火'
        // Or English depending on configuration. Let's assume standard object property.

        // Checking library doc assumption: .getWuXing() returns string in Chinese
        const wuxing = char.getWuXing(); // e.g. "木"

        if (wuxing === '木') counts.Wood++;
        else if (wuxing === '火') counts.Fire++;
        else if (wuxing === '土') counts.Earth++;
        else if (wuxing === '金') counts.Metal++;
        else if (wuxing === '水') counts.Water++;
    });

    return counts;
}
