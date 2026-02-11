import { REMEDY_MAPPING, RemedySchema } from './remedy';
import { calculateSaju } from './engine/saju';

// Re-export specific types if needed by consumers
export type { RemedySchema };

export interface PlanetaryPositions {
    Sun: number;
    Moon: number;
    Mercury: number;
    Venus: number;
    Mars: number;
    Jupiter: number;
    Saturn: number;
    // Ascendant?: number; // Requires precise Geo-coord
}

export interface PlanetarySigns {
    Sun: string;
    Moon: string;
    Mercury: string;
    Venus: string;
    Mars: string;
    Jupiter: string;
    Saturn: string;
}

export interface RemedyContext {
    missingElements: string[];
    dominantPlanets: string[];
    recommendedColor: string;
    energyScore: number;
    remedySchema: RemedySchema;
    cosmicWeather: PlanetarySigns;
    dayMaster: string; // Added Day Master
}

const ZODIACS = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Function to get Sun Sign (Accurate enough)
function getSunSign(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    return "Unknown";
}

export async function calculatePlanetaryPositions(date: Date): Promise<PlanetarySigns> {
    // In a real production app, we would use `astronomy-engine` here.
    // For this prototype, we calculate Sun Sign accurately and randomize others or use simple logic.
    // AI context implies these are "Current Transits" or "Natal" depending on usage.
    // Let's assume this function calculates NATAL positions for the user.

    return {
        Sun: getSunSign(date),
        Moon: getSunSign(new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000)), // Moon is approx.
        Mercury: getSunSign(date), // Often close to Sun
        Venus: getSunSign(date),   // Often close to Sun
        Mars: "Scorpio",    // Mock
        Jupiter: "Pisces",  // Mock
        Saturn: "Aquarius"  // Mock
    };
}

export async function getRemedyContext(date: Date): Promise<RemedyContext> {
    // 1. Get Saju Data
    const saju = calculateSaju(date);

    // 2. Analyze Elements & Determine Scores
    // Simple logic: Base score 100, deduct for missing elements to simulate "Energy Balance"
    const elements = saju.elements;
    const missing: string[] = [];

    // Check missing elements
    if (elements.Wood === 0) missing.push("Wood");
    if (elements.Fire === 0) missing.push("Fire");
    if (elements.Earth === 0) missing.push("Earth");
    if (elements.Metal === 0) missing.push("Metal");
    if (elements.Water === 0) missing.push("Water");

    // 3. Determine Primary Remedy
    // If multiple missing, pick the first one 
    // If none missing, default to user's Day Master's "enhancing" element.
    let primaryTarget = missing.length > 0 ? missing[0] : "Fire"; // Default fallback

    const remedy = REMEDY_MAPPING[primaryTarget] || REMEDY_MAPPING["Fire"];

    // 4. Calculate Energy Score (Mock Logic for now)
    // Fewer missing elements = Higher score
    const energyScore = Math.max(50, 100 - (missing.length * 10));

    // 5. Get Cosmic Weather (Planets)
    const cosmicWeather = await calculatePlanetaryPositions(date);

    return {
        missingElements: missing,
        dominantPlanets: [cosmicWeather.Sun, cosmicWeather.Moon],
        recommendedColor: remedy.colorCode,
        energyScore,
        remedySchema: remedy,
        cosmicWeather,
        dayMaster: saju.dayMaster
    };
}
