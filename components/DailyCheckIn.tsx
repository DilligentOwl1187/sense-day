"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ChevronRight, Clock, MapPin, Calendar } from "lucide-react";
import ResultCardSkeleton from "./ResultCardSkeleton";

interface UserProfile {
    name: string;
    birthDate: string;
    birthTime: string;
    birthCity: string;
    feeling: string;
}

interface AIResponse {
    today_advice: string;
    curious_question: string;
    time_sense: string;
    art_curation?: {
        title: string;
        description: string;
        color_code: string;
    };
}

export default function DailyCheckIn() {
    const [step, setStep] = useState<"intro" | "name" | "birth" | "city" | "feeling" | "loading" | "result">("intro");
    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        birthDate: "",
        birthTime: "",
        birthCity: "",
        feeling: ""
    });
    const [response, setResponse] = useState<AIResponse | null>(null);

    const handleNext = () => {
        if (step === "intro") setStep("name");
        else if (step === "name" && profile.name) setStep("birth");
        else if (step === "birth" && profile.birthDate) setStep("city");
        else if (step === "city" && profile.birthCity) setStep("feeling");
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!profile.feeling.trim()) return;

        setStep("loading");

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: profile.feeling,
                    userProfile: profile
                })
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data = await res.json();
            setResponse(data);
            setStep("result");
        } catch (error) {
            console.error(error);
            setStep("feeling"); // Retry
        }
    };

    // Helper for input animation
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 min-h-[70vh]">
            <AnimatePresence mode="wait">

                {/* Intro Step */}
                {step === "intro" && (
                    <motion.div key="intro" {...fadeInUp} className="text-center space-y-8 max-w-lg">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full mx-auto"
                        />
                        <h2 className="text-3xl font-light text-slate-200">
                            당신의 <span className="text-indigo-400 font-serif">우주</span>를 읽어드립니다.
                        </h2>
                        <p className="text-slate-400 leading-relaxed font-light">
                            Sense Your Day는 당신의 탄생 정보와 오늘의 마음을 연결하여<br />
                            가장 사적인 위로와 예술적 처방을 건넸습니다.
                        </p>
                        <button onClick={handleNext} className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105 shadow-lg shadow-indigo-500/20">
                            시작하기
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {/* Name Step */}
                {step === "name" && (
                    <motion.div key="name" {...fadeInUp} className="w-full max-w-md space-y-6">
                        <h3 className="text-xl text-slate-300 font-light text-center">어떻게 불러드릴까요?</h3>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            placeholder="이름 또는 닉네임"
                            className="w-full p-4 text-center text-xl bg-transparent border-b-2 border-slate-700 focus:border-indigo-500 outline-none transition-colors placeholder:text-slate-600 text-white"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                        />
                        <button onClick={handleNext} disabled={!profile.name} className="w-full py-4 text-slate-400 hover:text-white disabled:opacity-0 transition-all">
                            다음으로 <ChevronRight className="inline w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Birth Info Step */}
                {step === "birth" && (
                    <motion.div key="birth" {...fadeInUp} className="w-full max-w-md space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-xl text-slate-300 font-light">당신이 세상에 도착한 시간</h3>
                            <p className="text-xs text-slate-500">별들의 배치를 읽기 위해 필요합니다.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="date"
                                    value={profile.birthDate}
                                    onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                                    className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-indigo-500 outline-none text-white appearance-none"
                                />
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="time"
                                    value={profile.birthTime}
                                    onChange={(e) => setProfile({ ...profile, birthTime: e.target.value })}
                                    className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-slate-700 focus:border-indigo-500 outline-none text-white appearance-none"
                                />
                            </div>
                        </div>
                        <button onClick={handleNext} disabled={!profile.birthDate} className="w-full py-4 text-slate-400 hover:text-white disabled:opacity-0 transition-all">
                            다음으로 <ChevronRight className="inline w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* City Step */}
                {step === "city" && (
                    <motion.div key="city" {...fadeInUp} className="w-full max-w-md space-y-6">
                        <h3 className="text-xl text-slate-300 font-light text-center">태어난 도시</h3>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                value={profile.birthCity}
                                onChange={(e) => setProfile({ ...profile, birthCity: e.target.value })}
                                placeholder="예: 서울, 부산, 뉴욕"
                                className="w-full p-4 pl-12 text-lg bg-slate-800/50 rounded-xl border border-slate-700 focus:border-indigo-500 outline-none text-white"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                            />
                        </div>
                        <button onClick={handleNext} disabled={!profile.birthCity} className="w-full py-4 text-slate-400 hover:text-white disabled:opacity-0 transition-all">
                            다음으로 <ChevronRight className="inline w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Feeling Step (Final Input) */}
                {step === "feeling" && (
                    <motion.div key="feeling" {...fadeInUp} className="w-full max-w-2xl text-center space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-light text-slate-200">
                                {profile.name}님, 오늘 하루는 어땠나요?
                            </h2>
                            <p className="text-slate-500 text-sm">사소한 감정도, 깊은 고민도 좋아요.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={profile.feeling}
                                onChange={(e) => setProfile({ ...profile, feeling: e.target.value })}
                                placeholder="당신의 이야기를 들려주세요..."
                                className="w-full p-6 pr-16 text-lg rounded-2xl bg-slate-900/50 backdrop-blur-md border border-slate-800 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none placeholder:text-slate-600 shadow-xl"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!profile.feeling.trim()}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* Result View */}
                {step !== "intro" && step !== "name" && step !== "birth" && step !== "city" && step !== "feeling" && (
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
                            <span className="text-slate-500 text-xs block mb-1">{profile.name}님의 기록</span>
                            "{profile.feeling}"
                        </motion.div>

                        {step === "loading" && <ResultCardSkeleton />}

                        {step === "result" && response && (
                            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                {/* Card 1: Today's Advice */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl flex flex-col border-l-4 border-l-indigo-500 shadow-xl shadow-indigo-900/10 bg-slate-900/50"
                                >
                                    <span className="text-xs uppercase tracking-widest text-indigo-400 mb-4 font-bold">오늘의 한마디</span>
                                    <p className="text-xl text-slate-200 leading-relaxed font-serif keep-all">{response.today_advice}</p>
                                </motion.div>

                                {/* Card 2: Curious Question */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="col-span-1 glass-panel p-6 rounded-3xl flex flex-col border-t-4 border-t-rose-500 shadow-xl shadow-rose-900/10 bg-slate-900/50"
                                >
                                    <span className="text-xs uppercase tracking-widest text-rose-400 mb-4 font-bold">당신을 위한 갈무리</span>
                                    <p className="text-sm text-slate-300 leading-relaxed font-light keep-all">{response.curious_question}</p>
                                </motion.div>

                                {/* Card 3: Action Guide */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="col-span-1 glass-panel p-6 rounded-3xl flex flex-col border-t-4 border-t-amber-500 shadow-xl shadow-amber-900/10 bg-slate-900/50"
                                >
                                    <span className="text-xs uppercase tracking-widest text-amber-400 mb-4 font-bold">오늘의 행동 지침</span>
                                    <p className="text-sm text-slate-300 leading-relaxed font-light keep-all">{response.time_sense}</p>
                                </motion.div>

                                {/* Card 4: Art/Remedy (New) */}
                                {response.art_curation && (
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="col-span-1 md:col-span-2 lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-row items-center gap-6 border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800"
                                    >
                                        <div className="w-24 h-24 rounded-lg bg-slate-700 flex-shrink-0" style={{ backgroundColor: response.art_curation.color_code }}></div>
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">오늘의 영혼 처방</span>
                                            <h4 className="text-lg text-white font-serif mb-1">{response.art_curation.title}</h4>
                                            <p className="text-sm text-slate-400">{response.art_curation.description}</p>
                                        </div>
                                    </motion.div>
                                )}

                                <button
                                    onClick={() => { setStep("intro"); setProfile({ ...profile, feeling: "" }); }}
                                    className="col-span-1 md:col-span-2 lg:col-span-4 mt-8 mx-auto px-8 py-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-all text-sm"
                                >
                                    처음으로 돌아가기
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
