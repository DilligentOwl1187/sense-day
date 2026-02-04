"use client";

import { useState } from 'react';
import { generateDailyInsight } from '@/lib/hybrid-engine';
import { DailyInsight } from '@/types/destiny';
import ThreeStepOutput from './ThreeStepOutput';

export default function DailyCheckIn() {
    const [input, setInput] = useState('');
    const [step, setStep] = useState<'ask' | 'analyzing' | 'result'>('ask');
    const [insight, setInsight] = useState<DailyInsight | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setStep('analyzing');

        // Mock Identity
        const identity = {
            birthDate: '1990-01-01',
            zodiac: 'Capricorn',
            sajuElement: 'Earth'
        } as const;

        try {
            const result = await generateDailyInsight(identity, input);
            setInsight(result);
            setStep('result');
        } catch (error) {
            console.error(error);
            setStep('ask');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full px-4">
            {step === 'ask' && (
                <div className="w-full max-w-lg space-y-8 animate-in fade-in zoom-in duration-700">
                    <h1 className="text-4xl md:text-5xl font-light text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                        오늘 기분은<br />좀 어때요?
                    </h1>

                    <form onSubmit={handleSubmit} className="relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="솔직한 마음을 들려주세요..."
                            className="w-full bg-white/5 border border-white/20 rounded-full px-4 py-4 text-center text-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all font-light"
                            autoFocus
                        />
                        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="mt-6 mx-auto block px-8 py-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:translate-y-4"
                        >
                            이야기하기
                        </button>
                    </form>
                </div>
            )}

            {step === 'analyzing' && (
                <div className="flex flex-col items-center space-y-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-indigo-400 animate-spin" />
                    <p className="text-sm tracking-widest text-indigo-300 uppercase">
                        별들의 목소리를 듣는 중...
                    </p>
                </div>
            )}

            {step === 'result' && insight && (
                <ThreeStepOutput data={insight} />
            )}
        </div>
    );
}
