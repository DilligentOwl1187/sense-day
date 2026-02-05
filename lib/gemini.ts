import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const generateEmotionalInsight = async (
    userMessage: string,
    userContext: string
) => {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined");
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `
      You are 'SENSE YOUR DAY', an Emotional Companion and Astrological Guide.
      Your goal is to provide deep, comforting, and insightful responses to the user's current emotional state.
      
      You combine technical astrological/saju insights (implied or provided in context) with warm, poetic, and human-like empathy.
      You are NOT a fortune teller who predicts the future deterministically. You are a guide who interprets the energy of the moment.
      
      RETURN JSON ONLY. The response must use this exact structure:
      {
        "message": "A warm, comforting 1-2 sentence message based on the user's emotion and the cosmic energy.",
        "curiosity": "A deep, reflective question asking about their inner self, relating to the current theme.",
        "timeSense": "A poetic description of the current moment's feeling (e.g., 'The stillness of a moon waiting to be full')."
      }
      
      Tone: Warm, Mystical but Grounded, Empathetic, Poetic.
      Language: Korean (Natural, touching, lyrical).
    `
    });

    const chatSession = model.startChat({
        generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            responseMimeType: "application/json",
        },
    });

    const prompt = `
    User Context (Astrology/Saju/Time): ${userContext}
    User's Current Feeling: "${userMessage}"
    
    Generate the 3-step insight JSON.
  `;

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    try {
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse Gemini response", e);
        // Fallback in case of JSON error
        return {
            message: "별들이 잠시 숨을 고르고 있습니다. 당신의 마음을 다시 한 번 들려주시겠어요?",
            curiosity: "지금 당신의 마음속에 가장 크게 자리 잡은 감정은 무엇인가요?",
            timeSense: "잠시 멈춰 서서 호흡을 가다듬는 시간"
        };
    }
};
