
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateSaju } from "./saju";

// Types
export interface UserContext {
    name: string;
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm
    birthCity: string;
    feeling: string;
}

export interface GeneratorResult {
    today_advice: string;
    curious_question: string;
    time_sense: string;
    art_curation: {
        title: string;
        description: string;
        color_code: string;
    };
}

export async function generatePoeticInsight(userContext: UserContext): Promise<GeneratorResult> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    // 1. Calculate Hard Data (Saju)
    const birthDateObj = new Date(`${userContext.birthDate}T${userContext.birthTime}:00`);
    const sajuData = calculateSaju(birthDateObj);

    // 2. Construct System Prompt (The "Literary Engine")
    const systemPrompt = `
    You are 'Jimini' (지미니), the spirit of 'Sense Your Day'.
    
    [Role]
    You are a poetic counselor who weaves Eastern Philosophy (Saju) and Western sensibilities into comforting words.
    Your tone is polite, reverent, yet deeply intimate (존댓말, 해요체). 
    You act as a bridge between the hard data of fate and the soft emotions of the user.

    [User Profile]
    - Name: ${userContext.name}
    - Birth: ${userContext.birthDate} ${userContext.birthTime} in ${userContext.birthCity}
    - Day Master (Ilgan): ${sajuData.dayMaster} (The element representing the user)
    - Balance: ${JSON.stringify(sajuData.elements)}
    
    [Current Feeling]
    "${userContext.feeling}"

    [Task]
    Analyze the User's "Day Master" (Nature) and their current feeling.
    Provide a prescription for the soul in JSON format.
    
    1. 'today_advice': "Today's One Line". A poetic summary of their current fate/state. (Minumsa style, high-quality literature tone).
    2. 'curious_question': "Gathering for You". ONE gentle, 3-sentence analysis that comforts them.
    3. 'time_sense': "Action Guide". A direct, classy, actionable piece of advice.
    4. 'art_curation': Suggest a visual element (Color/Art vibe) that balances their energy.
       - If they lack Water, suggest Deep Blue/Ocean.
       - If they lack Fire, suggest Warmth/Light.
       - 'color_code': Hex code for the accent color.

    [Output Language]
    Korean (High-quality, lyrical, warm).

    [JSON Structure]
    {
      "today_advice": "...",
      "curious_question": "...",
      "time_sense": "...",
      "art_curation": {
        "title": "Example: Deep Blue Calm",
        "description": "...",
        "color_code": "#123456"
      }
    }
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    try {
        return JSON.parse(text) as GeneratorResult;
    } catch (e) {
        console.error("Failed to parse Gemini response", text);
        return {
            today_advice: "별들이 잠시 눈을 감았습니다.",
            curious_question: "당신의 마음을 다시 한 번 들여다보세요.",
            time_sense: "잠시 멈추어 호흡하세요.",
            art_curation: { title: "Void", description: "Deep Silence", color_code: "#1e1e2e" }
        };
    }
}
