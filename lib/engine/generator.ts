
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
        console.warn("GEMINI_API_KEY is not set. Returning poetic fallback.");

        const poeticSilences = [
            "우주가 잠시 숨을 고르고 있습니다. 당신의 내면에서 답을 찾아보세요.",
            "별들이 당신의 이야기를 경청하고 있습니다. 잠시만 기다려주세요.",
            "침묵 속에도 대답이 있습니다. 깊은 호흡으로 그 소리를 들어보세요.",
            "밤하늘의 구름이 걷히고 있습니다. 곧 당신의 별이 빛날 것입니다."
        ];
        const randomSilence = poeticSilences[Math.floor(Math.random() * poeticSilences.length)];

        return {
            today_advice: randomSilence,
            curious_question: "지금 이 순간, 당신에게 가장 필요한 온기는 무엇인가요?",
            time_sense: "잠시 눈을 감고 깊은 호흡을 세 번 반복해보세요.",
            art_curation: {
                title: "Inner Universe",
                description: "당신의 내면에 존재하는 고요한 우주를 마주하세요.",
                color_code: "#4F46E5", // Indigo
                music_recommendation: "Debussy - Clair de Lune"
            }
        };
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
