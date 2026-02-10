import { NextResponse } from "next/server";
import { generatePoeticInsight, UserContext } from "@/lib/engine/generator";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, userProfile } = body;

        // Construct UserContext
        // If userProfile exists (from new UI), use it. 
        // fallback for older calls if any (though we updated UI)
        const context: UserContext = userProfile ? {
            ...userProfile,
            feeling: message
        } : {
            name: "Traveler",
            birthDate: "2000-01-01",
            birthTime: "12:00",
            birthCity: "Unknown",
            feeling: message
        };

        const aiResponse = await generatePoeticInsight(context);

        // Save to Supabase (Fire and Forget)
        try {
            await supabase.from('chat_logs').insert({
                user_id: null, // Anonymous for now, or link if auth exists
                user_message: message,
                ai_response: aiResponse,
                // store raw profile if needed in a separate column or metadata
            });
        } catch (dbError) {
            console.warn("DB Save failed", dbError);
        }

        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
