// lib/engine/saju.ts
import { Solar, Lunar } from 'lunar-javascript';

export interface SajuData {
    fourPillars: {
        year: string;
        month: string;
        day: string;
        time: string;
    };
    dayMaster: string; // Ilgan (The User's Core Element / Self)
    elements: { [key: string]: number }; // Wood, Fire, Earth, Metal, Water count
    animal: string; // Zodiac Animal (Year Branch)
}

// Mappings for Heavenly Stems (Cheongan) -> Element
const GAN_MAP: { [key: string]: string } = {
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire',
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water'
};

// Mappings for Earthly Branches (Jiji) -> Element
const ZHI_MAP: { [key: string]: string } = {
    '寅': 'Wood', '卯': 'Wood',
    '巳': 'Fire', '午': 'Fire',
    '辰': 'Earth', '戌': 'Earth', '丑': 'Earth', '未': 'Earth',
    '申': 'Metal', '酉': 'Metal',
    '亥': 'Water', '子': 'Water'
};

// Mappings for Zodiac Animals
const ANIMAL_MAP: { [key: string]: string } = {
    '子': 'Rat', '丑': 'Ox', '寅': 'Tiger', '卯': 'Rabbit',
    '辰': 'Dragon', '巳': 'Snake', '午': 'Horse', '未': 'Goat',
    '申': 'Monkey', '酉': 'Rooster', '戌': 'Dog', '亥': 'Pig'
};


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
    const eightChar = lunar.getEightChar(); // BaZi (Palja)

    // Ensure we get strings
    const yearGan = eightChar.getYearGan().toString();
    const yearZhi = eightChar.getYearZhi().toString();
    const monthGan = eightChar.getMonthGan().toString();
    const monthZhi = eightChar.getMonthZhi().toString();
    const dayGan = eightChar.getDayGan().toString();
    const dayZhi = eightChar.getDayZhi().toString();
    const timeGan = eightChar.getTimeGan().toString();
    const timeZhi = eightChar.getTimeZhi().toString();

    // Heavenly Stems (Cheongan) & Earthly Branches (Jiji)
    const result: SajuData = {
        fourPillars: {
            year: `${yearGan}${yearZhi}`,
            month: `${monthGan}${monthZhi}`,
            day: `${dayGan}${dayZhi}`,
            time: `${timeGan}${timeZhi}`,
        },
        dayMaster: dayGan, // The Ilgan
        elements: calculateElementBalance([
            yearGan, yearZhi, monthGan, monthZhi, dayGan, dayZhi, timeGan, timeZhi
        ]),
        animal: ANIMAL_MAP[yearZhi] || "Unknown" // Zodiac Animal
    };

    return result;
}

function calculateElementBalance(chars: string[]): { [key: string]: number } {
    const counts: { [key: string]: number } = {
        Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0
    };

    chars.forEach(char => {
        // Check both maps
        const element = GAN_MAP[char] || ZHI_MAP[char];

        if (element && counts[element] !== undefined) {
            counts[element]++;
        }
    });

    return counts;
}
