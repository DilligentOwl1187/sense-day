export type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface Destiny_Identity {
  birthDate: string; // ISO format
  birthTime?: string;
  birthPlace?: string;
  zodiac: ZodiacSign;
  sajuElement: ElementType;
  resolutionScore?: number; // From previous context (PoDR), keeping as optional
  sbtId?: string; // Token ID if minted
}

export interface DailyInsight {
  date: string;
  message: string; // [오늘의 한마디]
  curiosity: string; // [궁금한 한가지]
  timeSense: string; // [시간의 감각]
  luckyColor?: string;
}
