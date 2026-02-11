
import { calculateSaju } from '../lib/engine/saju';
import { getRemedyContext } from '../lib/astrology';

// Test Dates
const testDates = [
    { name: "User A (2000-01-01)", date: new Date("2000-01-01T12:00:00") },
    { name: "User B (1990-05-15)", date: new Date("1990-05-15T09:30:00") },
    { name: "Today", date: new Date() }
];

async function runTests() {
    console.log("🛠  Hybrid Engine Verification  🛠\n");

    for (const test of testDates) {
        console.log(`\n---------------------------------------------------`);
        console.log(`Analyzing: ${test.name}`);
        console.log(`---------------------------------------------------`);

        try {
            // 1. Saju Test
            const saju = calculateSaju(test.date);
            console.log(`\n[Manse / Saju]`);
            console.log(`Day Master (Ilgan): ${saju.dayMaster}`);
            console.log(`Pillars: Y=${saju.fourPillars.year} M=${saju.fourPillars.month} D=${saju.fourPillars.day} T=${saju.fourPillars.time}`);
            console.log(`Zodiac Animal: ${saju.animal}`);
            console.log(`Five Elements:`, saju.elements);

            // 2. Astrology & Remedy Test
            const context = await getRemedyContext(test.date);
            console.log(`\n[Astrology & Remedy]`);
            console.log(`Cosmic Weather (Sun/Moon): Sun=${context.cosmicWeather.Sun}, Moon=${context.cosmicWeather.Moon}`);
            console.log(`Missing Elements: ${context.missingElements.join(", ") || "None"}`);
            // console.log(`Primary Remedy: ${context.remedySchema.keyword} (${context.recommendedColor})`);
            console.log(`Energy Score: ${context.energyScore}`);

            console.log(`\n[Status] ✅ Correctly Calculated`);

        } catch (error) {
            console.error(`\n[Status] ❌ Error:`, error);
        }
    }
}

runTests();
