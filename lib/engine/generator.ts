
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateSaju } from "./saju";
import { getRemedyContext } from "../astrology";

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
        music_recommendation?: string;
    };
}

export async function generatePoeticInsight(userContext: UserContext): Promise<GeneratorResult> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    // 1. Calculate Hard Data (Saju & Remedy)
    const birthDateObj = new Date(`${userContext.birthDate}T${userContext.birthTime}:00`);
    const sajuData = calculateSaju(birthDateObj);
    const remedyContext = await getRemedyContext(birthDateObj);

    // 2. Construct System Prompt (The "Literary Engine")
    const systemPrompt = `
    You are 'Jimini' (지미니), the spirit of 'Sense Your Day'.
    
    [Role]
    You are a poetic counselor. You see the user's hidden energy gaps and prescribing 'Art' and 'Words' to heal them.
    
    [User Profile]
    - Name: ${userContext.name}
    - Day Master (Ilgan): ${sajuData.dayMaster}
    
    [Hidden Context - FOR AI EYES ONLY]
    - Missing Elements: ${remedyContext.missingElements.join(", ")}
    - Recommended Remedy: ${JSON.stringify(remedyContext.remedySchema)}
    - Energy Score: ${remedyContext.energyScore}
    
    [Current Feeling]
    "${userContext.feeling}"

    [Task]
    Using the 'Hidden Context' (especially the Missing Elements), craft a response that *subtly* fills this void.
    If they lack 'Fire', your words should be warm and passionate.
    If they lack 'Water', your words should be flowing and deep.

    1. 'today_advice': "Today's One Line". Minumsa style. High literary quality.
    2. 'curious_question': "Gathering for You". ONE gentle, 3-sentence analysis.
    3. 'time_sense': "Action Guide". Direct, classy advice.
    4. 'art_curation': 
       - Suggest a specific Art Piece or Style matching: '${remedyContext.remedySchema.artStyle}'.
       - Suggest Music matching: '${remedyContext.remedySchema.musicTempo}'.
       - 'color_code': Use '${remedyContext.remedySchema.colorCode}'.

    [Output Language]
    Korean (High-quality, lyrical, warm. 존댓말, 해요체).

    [JSON Structure]
    {
      "today_advice": "...",
      "curious_question": "...",
      "time_sense": "...",
      "art_curation": {
        "title": "Example: Monet's Sunrise",
        "description": "Why this art heals you...",
        "color_code": "${remedyContext.remedySchema.colorCode}",
        "music_recommendation": "Example: Chopin Nocturne..."
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
            today_advice: "별들이 잠시 침묵합니다.",
            curious_question: "당신의 마음을 다시 한 번 들여다보세요.",
            time_sense: "잠시 멈추어 호흡하세요.",
            art_curation: { title: "Deep Silence", description: "Void", color_code: "#1e1e2e" }
        };
    }
}
