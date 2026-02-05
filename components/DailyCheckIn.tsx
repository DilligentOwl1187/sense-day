"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import ResultCardSkeleton from "./ResultCardSkeleton";

// Result type
interface AIResponse {
    today_advice: string;
    curious_question: string;
    time_sense: string;
}

export default function DailyCheckIn() {
    const [step, setStep] = useState<"input" | "loading" | "result">("input");
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<AIResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setStep("loading");

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data = await res.json();
            setResponse(data);
            setStep("result");
        } catch (error) {
            console.error(error);
            // Fallback/Error state could be added here
            setStep("input");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 min-h-[60vh]">
            <AnimatePresence mode="wait">
                {step === "input" && (
                    <motion.div
                        key="input-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                        className="w-full max-w-2xl flex flex-col items-center text-center space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center justify-center p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 mb-4"
                            >
                                <Sparkles className="w-5 h-5 text-indigo-400 mr-2" />
                                <span className="text-sm text-indigo-200">Sense Your Day</span>
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-light text-balance leading-tight">
                                오늘 기분은 <span className="text-indigo-400 font-normal">좀 어때요?</span>
                            </h2>
                            <p className="text-slate-400 max-w-lg mx-auto">
                                당신의 오늘을 들려주세요. 별들의 이야기와 함께 다정한 위로를 건네드릴게요.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="오늘은 조금 지치는 하루였어..."
                                className="w-full p-6 pr-16 text-lg rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none placeholder:text-slate-600 shadow-lg shadow-indigo-500/5"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}

                {step !== "input" && (
                    <motion.div
                        key="result-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full flex flex-col items-center"
                    >
                        {/* User Input Recap */}
                        <motion.div
                            layoutId="user-input"
                            className="mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 text-slate-300 max-w-2xl text-center w-full"
                        >
                            "{input}"
                        </motion.div>

                        {step === "loading" && <ResultCardSkeleton />}

                        {step === "result" && response && (
                            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                {/* Card 1: Today's Advice */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="glass-panel p-8 rounded-3xl flex flex-col border-l-4 border-l-indigo-500 shadow-xl shadow-indigo-900/10"
                                >
                                    <span className="text-xs uppercase tracking-widest text-slate-500 mb-4">오늘의 한마디</span>
                                    <p className="text-lg text-slate-200 leading-relaxed font-light">{response.today_advice}</p>
                                </motion.div>

                                {/* Card 2: Curious Question */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="glass-panel p-8 rounded-3xl flex flex-col border-l-4 border-l-rose-500 shadow-xl shadow-rose-900/10"
                                >
                                    <span className="text-xs uppercase tracking-widest text-slate-500 mb-4">궁금한 한가지</span>
                                    <p className="text-lg text-slate-200 leading-relaxed font-light">{response.curious_question}</p>
                                </motion.div>

                                {/* Card 3: Time Sense */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="glass-panel p-8 rounded-3xl flex flex-col border-l-4 border-l-amber-500 shadow-xl shadow-amber-900/10"
                                >
                                    <span className="text-xs uppercase tracking-widest text-slate-500 mb-4">시간의 감각</span>
                                    <p className="text-lg text-slate-200 leading-relaxed font-light">{response.time_sense}</p>
                                </motion.div>

                                <button
                                    onClick={() => { setInput(""); setStep("input"); }}
                                    className="col-span-1 md:col-span-3 mt-8 mx-auto px-8 py-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-all text-sm"
                                >
                                    다시 시작하기
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
