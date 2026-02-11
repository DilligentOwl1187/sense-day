import { NextResponse } from "next/server";
import { generatePoeticInsight, UserContext } from "@/lib/engine/generator";
import { supabase } from "@/lib/supabase";
import { getRemedyContext } from "@/lib/astrology";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, userProfile } = body;

        // 1. Parse User Profile & Calculate Destiny Data
        const birthDate = userProfile?.birthDate ? new Date(userProfile.birthDate) : new Date("2000-01-01");

        // Handle Time: Use provided time or default to 12:00 if unknown/missing
        if (userProfile?.birthTime && !userProfile?.birthTimeUnknown) {
            const [hours, minutes] = userProfile.birthTime.split(':');
            birthDate.setHours(parseInt(hours), parseInt(minutes));
        } else {
            birthDate.setHours(12, 0); // Default to Noon (Horse Hour) - standard for unknown time
        }

        // 2. Run Hybrid Engine (Saju + Astrology)
        const remedyContext = await getRemedyContext(birthDate);

        // 3. Construct UserContext with Hard Data
        const context: UserContext = {
            name: userProfile?.name || "Traveler",
            birthDate: userProfile?.birthDate || "2000-01-01",
            birthTime: userProfile?.birthTime || "12:00",
            birthCity: userProfile?.birthCity || "Seoul",
            feeling: message,
            // Inject calculated data
            sajuElements: remedyContext.missingElements,
            cosmicWeather: remedyContext.cosmicWeather,
            recommendedColor: remedyContext.recommendedColor,
            dominantPlanet: remedyContext.dominantPlanets[0],
            remedySchema: remedyContext.remedySchema,
            energyScore: remedyContext.energyScore,
            dayMaster: remedyContext.dayMaster
        };

        // 4. Generate Insight via Gemini
        const aiResponse = await generatePoeticInsight(context);

        // 5. Append Art Curation Data (Derived from RemedyContext) relative to AI's output
        // The AI generates the text, but the "Art Curation" card needs specific structured data.
        // We override or merge the engine's recommendation with the AI's if needed, 
        // but typically the Engine determines the 'Curation' logic (Color, Element).

        // We attach the calculated remedy data to the response so the UI can render the 'Geometric Icon' and 'Color'
        // correctly, ensuring the visual matches the 'Energy'.
        const finalResponse = {
            ...aiResponse,
            art_curation: {
                ...aiResponse.art_curation, // AI generated title/desc
                color_code: remedyContext.recommendedColor, // Engine enforced color
                missingElement: remedyContext.missingElements[0] || "Fire", // Engine enforced element
                keyword: remedyContext.remedySchema.keyword // Engine enforced keyword
            }
        };

        // 6. Save to Supabase
        try {
            await supabase.from('results').insert({
                user_profile: context,
                user_message: message,
                analysis_result: finalResponse,
                // created_at is auto
            });
        } catch (dbError) {
            console.warn("DB Save failed", dbError);
        }

        return NextResponse.json(finalResponse);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
