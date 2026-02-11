import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateSaju } from "./saju";
import { getRemedyContext, PlanetarySigns, RemedySchema } from "../astrology";

// Types
export interface UserContext {
    name: string;
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm
    birthTimeUnknown?: boolean;
    birthCity: string;
    feeling: string;
    // Injected Hard Data (Optional, but preferred)
    sajuElements?: string[];
    cosmicWeather?: PlanetarySigns;
    recommendedColor?: string;
    dominantPlanet?: string;
    remedySchema?: RemedySchema; // To pass full remedy details
    energyScore?: number;
    dayMaster?: string;
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
        console.warn("GEMINI_API_KEY is not set. Returning poetic fallback.");
        return {
            today_advice: "우주가 잠시 숨을 고르고 있습니다. 당신의 내면에서 답을 찾아보세요.",
            curious_question: "지금 이 순간, 당신에게 가장 필요한 온기는 무엇인가요?",
            time_sense: "잠시 멈추어 호흡하세요.",
            art_curation: {
                title: "Inner Universe",
                description: "당신의 내면에 존재하는 고요한 우주를 마주하세요.",
                color_code: "#4F46E5",
                music_recommendation: "Debussy - Clair de Lune"
            }
        };
    }

    // 1. Prepare Data (Use injected or Calculate if missing)
    let dayMaster = userContext.dayMaster;
    let missingElements = userContext.sajuElements;
    let remedySchema = userContext.remedySchema;
    let energyScore = userContext.energyScore;

    // Fallback calculation if not injected (Backward compatibility)
    if (!dayMaster || !missingElements || !remedySchema) {
        const birthDateObj = new Date(`${userContext.birthDate}T${userContext.birthTime}:00`);
        const sajuData = calculateSaju(birthDateObj);
        const remedyContext = await getRemedyContext(birthDateObj);

        dayMaster = sajuData.dayMaster;
        missingElements = remedyContext.missingElements;
        remedySchema = remedyContext.remedySchema;
        energyScore = remedyContext.energyScore;
    }

    // 2. Construct System Prompt (The "Literary Engine")
    const systemPrompt = `
    You are 'Jimini' (지미니), the spirit of 'Sense Your Day'.
    
    [Role]
    You are a poetic counselor. You see the user's hidden energy gaps and prescribing 'Art' and 'Words' to heal them.
    
    [User Profile]
    - Name: ${userContext.name}
    - Day Master (Ilgan): ${dayMaster}
    ${userContext.birthTimeUnknown ? "- Note: User does not know their exact birth time. The 'Time' pillar is approximated to noon." : ""}
    
    [Hidden Context - FOR AI EYES ONLY]
    - Missing Elements: ${missingElements?.join(", ")}
    - Recommended Remedy: ${JSON.stringify(remedySchema)}
    - Energy Score: ${energyScore}
    
    [Current Feeling]
    "${userContext.feeling}"

    [Task]
    Using the 'Hidden Context' (especially the Missing Elements), craft a response that *subtly* fills this void.
    If they lack 'Fire', your words should be warm and passionate.
    If they lack 'Water', your words should be flowing and deep.

    ${userContext.birthTimeUnknown ? "**Special Instruction**: Since the user doesn't know their birth time, start the 'today_advice' or 'time_sense' with a gentle acknowledgement like '정확한 시간을 알 수 없어도, 당신이 이 세상에 도착한 날의 별들은 이미 충분한 이야기를 품고 있습니다.'" : ""}

    1. 'today_advice': "Today's One Line". Minumsa style. High literary quality.
    2. 'curious_question': "Gathering for You". ONE gentle, 3-sentence analysis.
    3. 'time_sense': "Action Guide". Direct, classy advice.
    4. 'art_curation': 
       - Suggest a specific Art Piece or Style matching: '${remedySchema?.artStyle}'.
       - Suggest Music matching: '${remedySchema?.musicTempo}'.
       - 'color_code': Use '${remedySchema?.colorCode}'.

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
        "color_code": "${remedySchema?.colorCode}",
        "music_recommendation": "Example: Chopin Nocturne..."
      }
    }
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

    try {
        const result = await model.generateContent(systemPrompt);
        const text = result.response.text();
        return JSON.parse(text) as GeneratorResult;
    } catch (e) {
        console.error("Failed to generate/parse Gemini response", e);
        return {
            today_advice: "별들이 잠시 침묵합니다.",
            curious_question: "당신의 마음을 다시 한 번 들여다보세요.",
            time_sense: "잠시 멈추어 호흡하세요.",
            art_curation: { title: "Deep Silence", description: "Void", color_code: "#1e1e2e" }
        };
    }
}
