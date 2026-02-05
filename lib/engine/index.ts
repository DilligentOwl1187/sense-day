// lib/engine/index.ts
import { calculateAstrology } from './astrology';
import { calculateSaju } from './saju';

export interface DestinyContext {
    astrology: any;
    saju: any;
    summary: string; // The text we feed to the LLM
}

export async function generateDestinyContext(birthDate?: Date): Promise<DestinyContext> {
    const now = new Date();

    // 1. Calculate Transits (Current Planetary Positions)
    const transits = await calculateAstrology(now);

    // 2. Calculate Saju (If birthdate provided, else current energy)
    const subjectDate = birthDate || now;
    const saju = calculateSaju(subjectDate);

    // 3. Generate Narrative Summary
    const moonSign = transits.planets.Moon.sign;
    const sunSign = transits.planets.Sun.sign;
    const myElement = saju.dayMaster; // e.g. "Gap" (Wood)

    // Translate Day Master to meaningful concept
    const elementMap: { [key: string]: string } = {
        '甲': 'Huge Tree', '乙': 'Flower', '丙': 'Sun', '丁': 'Candle',
        '戊': 'Mountain', '己': 'Garden Soil', '庚': 'Iron', '辛': 'Jewelry',
        '壬': 'Ocean', '癸': 'Rain'
    };
    const myNature = elementMap[myElement] || myElement;

    const summary = `
    [Current Cosmic Weather]
    Sun is in ${sunSign}, Moon is in ${moonSign}.
    
    [User's Nature]
    Day Master: ${myElement} (${myNature}).
    
    [Synthesis]
    The Moon in ${moonSign} highlights emotional needs.
    User's core nature is ${myNature}, which interacts with today's energy.
  `;

    return {
        astrology: transits,
        saju,
        summary
    };
}
