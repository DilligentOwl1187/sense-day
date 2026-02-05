import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { generateDestinyContext } from "@/lib/engine";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { message, birthDate } = await req.json(); // birthDate might be passed if user logged in

        // 1. Calculate Hybrid Context (Soul)
        // If no birthDate, it defaults to "Current Time Energy" (Transit + Today's Ilgan)
        const context = await generateDestinyContext(birthDate ? new Date(birthDate) : undefined);

        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY missing");
            return NextResponse.json({
                today_advice: `별들의 속삭임이 들리지 않네요. (API Key Missing). Context: ${context.summary.slice(0, 20)}...`,
                curious_question: "지금 이 순간, 당신의 마음은 어디에 있나요?",
                time_sense: "침묵하는 우주의 시간"
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `
      You are 'Sense Your Day', a gentle, empathetic counselor who sees the world through the lens of Astrology and Eastern Philosophy (Saju).
      
      [Energetic Context]
      ${context.summary}
      
      [User's Input]
      "${message}"
      
      [Task]
      Provide a comforting, poetic response that weaves the user's feeling with the current cosmic energy.
      Do NOT mention technical terms like "Day Master" or "Transit Moon" directly unless it feels natural and poetic (e.g., "The moon in Pisces deepens your emotions...").
      Focus on the *feeling* of the energy.
      
      Language: Korean (Warm, broken lines like a poem, soothing).
      
      Response Format (JSON only):
      {
        "today_advice": "Advice connecting user's mood + cosmic energy (1-2 sentences)",
        "curious_question": "A soulful question for self-reflection",
        "time_sense": "Metaphorical time description based on the energy"
      }
    `;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();

        let aiResponse;
        try {
            aiResponse = JSON.parse(responseText);
        } catch (e) {
            console.error("JSON parse error", responseText);
            aiResponse = {
                today_advice: "우주의 메시지가 바람에 흩어졌네요. 다시 한 번 귀 기울여주세요.",
                curious_question: "지금 당신의 호흡은 어떤 리듬인가요?",
                time_sense: "알 수 없는 미지의 시간"
            };
        }

        // 2. Save to Memory (Supabase)
        // We try/catch here so chat doesn't fail if DB is down/unconfigured
        try {
            await supabase.from('chat_logs').insert({
                user_message: message,
                ai_response: aiResponse,
                context_snapshot: context
            });
        } catch (dbError) {
            console.warn("Failed to save to Supabase:", dbError);
        }

        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error("Error generating insight:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
