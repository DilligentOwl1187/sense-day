import { NextResponse } from 'next/server';
import { generateEmotionalInsight } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, identity } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Prepare context string from identity object
        // In a real scenario, this would involve calculating specific planetary positions
        const context = `
      Birth Date: ${identity?.birthDate || 'Unknown'}
      Zodiac: ${identity?.zodiac || 'Unknown'}
      Saju Element: ${identity?.sajuElement || 'Unknown'}
      Current Time: ${new Date().toLocaleString()}
    `;

        const insight = await generateEmotionalInsight(message, context);

        return NextResponse.json(insight);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate insight' },
            { status: 500 }
        );
    }
}
