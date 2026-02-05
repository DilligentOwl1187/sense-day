import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY missing, using mock response");
            return NextResponse.json({
                today_advice: "오늘은 잠시 쉬어가도 괜찮은 날입니다. 별들도 때로는 구름 뒤에서 휴식을 취하거든요.",
                curious_question: "지금 당신의 마음을 색깔로 표현한다면 어떤 색일까요?",
                time_sense: "새벽 2시의 고요한 침묵 같은 에너지"
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a gentle, empathetic counselor and astrologer.
      The user will tell you how they feel.
      Your task is to provide a comforting response in JSON format.
      Language: Korean (Keep it warm, poetic, and soothing).
      
      User Input: "${message}"
      
      Response Format (JSON only):
      {
        "today_advice": "A warm, comforting message (Korean, 1-2 sentences)",
        "curious_question": "A gentle, thought-provoking question related to their mood (Korean)",
        "time_sense": "A metaphorical description of the current 'time' feeling (e.g., 'Late night starlight', 'Morning dew energy') (Korean)"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        let json;
        try {
            json = JSON.parse(text);
        } catch (e) {
            console.error("JSON parse error:", text);
            // Fallback if AI fails JSON
            json = {
                today_advice: "지금은 말로 표현하기 힘든 감정이 흐르고 있네요. 그저 흐르는 대로 두어도 괜찮아요.",
                curious_question: "당신의 마음속에 떠오르는 풍경은 무엇인가요?",
                time_sense: "해질 녘의 보랏빛 하늘"
            };
        }

        return NextResponse.json(json);
    } catch (error) {
        console.error("Error generating insight:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
