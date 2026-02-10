
import { generatePoeticInsight } from './lib/engine/generator';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGenerator() {
    console.log("🔮 Testing Sense Your Day Hybrid Engine...");

    const context = {
        name: "Lotus",
        birthDate: "1990-05-15",
        birthTime: "14:30",
        birthCity: "Seoul",
        feeling: "I feel a bit lost and anxious about the future."
    };

    try {
        const result = await generatePoeticInsight(context);
        console.log("\n✨ Result Recieved:");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

testGenerator();
