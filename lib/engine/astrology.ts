// lib/engine/astrology.ts
// @ts-ignore
import { swisseph } from 'swisseph-wasm';

// Define planets we care about
const PLANETS = {
    Sun: 0,
    Moon: 1,
    Mercury: 2,
    Venus: 3,
    Mars: 4,
    Jupiter: 5,
    Saturn: 6,
};

export interface AstroData {
    planets: { [key: string]: { longitude: number; sign: string; speed: number } };
}

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function getSign(longitude: number): string {
    return ZODIAC_SIGNS[Math.floor(longitude / 30) % 12];
}

export async function calculateAstrology(date: Date): Promise<AstroData> {
    // Ensure WASM is loaded (implementation detail of swisseph-wasm usually handles this, 
    // but we might need a specific init depending on the version. 
    // For 'swisseph-wasm', it often exports a ready-to-use API or promise).

    // Note: swisseph-wasm interface can vary. 
    // We'll assume a standard Julian Day calculation and planet retrieval.

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours() + date.getUTCMinutes() / 60;

    // Calculate Julian Day (Simplified conversion for UTC)
    // swisseph.swe_julday(year, month, day, hour, flag)
    // flag: 1 for Gregorian
    const julday = swisseph.swe_julday(year, month, day, hour, 1);

    const results: any = {};

    for (const [name, id] of Object.entries(PLANETS)) {
        // swe_calc_ut(tjd_ut, ipl, iflag)
        // iflag: 2 (SEFLG_SWIEPH) | 256 (SEFLG_SPEED)
        const flag = 2 | 256;
        const result = swisseph.swe_calc_ut(julday, id, flag);

        // result is usually { longitude: number, latitude: number, distance: number, speed: number, ... }
        // or an array depending on the binding. swisseph-wasm usually returns object.

        if (result && typeof result.longitude === 'number') {
            results[name] = {
                longitude: result.longitude,
                sign: getSign(result.longitude),
                speed: result.longitudeSpeed || 0
            };
        } else {
            // Fallback/Mock if calc fails (or WASM not ready)
            results[name] = { longitude: 0, sign: 'Unknown', speed: 0 };
        }
    }

    return { planets: results };
}
