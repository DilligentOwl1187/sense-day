
import { generatePoeticInsight, UserContext } from "../lib/engine/generator";
import { config } from "dotenv";

config({ path: ".env.local" });

async function testUnknownTime() {
    console.log("Testing Time Unknown Logic...");

    const userContext: UserContext = {
        name: "TestUser",
        birthDate: "1990-01-01",
        birthTime: "12:00",
        birthTimeUnknown: true,
        birthCity: "Seoul",
        feeling: "Lost but hopeful"
    };

    try {
        console.log("Calling generatePoeticInsight with birthTimeUnknown=true...");
        // valid key check
        if (!process.env.GEMINI_API_KEY) {
            console.warn("Skipping actual API call because GEMINI_API_KEY is missing.");
            return;
        }

        const result = await generatePoeticInsight(userContext);
        console.log("Result received:", result);
    } catch (error) {
        console.error("Error during test:", error);
    }
}

testUnknownTime();
