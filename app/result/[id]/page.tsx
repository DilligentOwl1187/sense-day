

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Share2, ArrowLeft } from 'lucide-react';
import Typewriter from '@/components/Typewriter';

// Initialize Supabase Client (Server-side)
import { supabase } from '@/lib/supabase';

async function getResult(id: string) {
    const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return null;
    return data;
}

export default async function ResultPage({ params }: { params: { id: string } }) {
    const resultData = await getResult(params.id);

    if (!resultData) {
        return notFound();
    }

    const { user_profile, analysis_result } = resultData;
    const { art_curation } = analysis_result;

    // Dynamic Background logic
    const backgroundStyle = {
        background: `radial-gradient(circle at 50% 10%, ${art_curation.color_code}20 0%, #0f172a 100%)`
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-8 text-slate-200 transition-colors duration-1000" style={backgroundStyle}>

            {/* Nav */}
            <nav className="w-full max-w-4xl flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <Link href="/" className="flex items-center text-sm text-slate-500 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    다시 감각하기
                </Link>
                <div className="text-xs text-slate-600 uppercase tracking-widest">
                    Sense Your Day
                </div>
            </nav>

            {/* Main Content */}
            <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">

                {/* Header Section */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center mb-8">
                    <p className="text-slate-500 text-sm mb-2">{user_profile.name}님의 기록</p>
                    <h1 className="text-2xl md:text-3xl font-light font-serif text-white">
                        {analysis_result.today_advice}
                    </h1>
                </div>

                {/* Card 1: Curious Question */}
                <div className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl flex flex-col border-t-4 border-t-rose-500 shadow-xl shadow-rose-900/10 bg-slate-900/50">
                    <span className="text-xs uppercase tracking-widest text-rose-400 mb-4 font-bold">당신을 위한 갈무리</span>
                    <div className="text-lg text-slate-300 leading-relaxed font-light keep-all">
                        <Typewriter text={analysis_result.curious_question} speed={30} delay={0.5} />
                    </div>
                </div>

                {/* Card 2: Action Guide */}
                <div className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl flex flex-col border-t-4 border-t-amber-500 shadow-xl shadow-amber-900/10 bg-slate-900/50">
                    <span className="text-xs uppercase tracking-widest text-amber-400 mb-4 font-bold">오늘의 행동 지침</span>
                    <div className="text-lg text-slate-300 leading-relaxed font-light keep-all">
                        <Typewriter text={analysis_result.time_sense} speed={30} delay={1.5} />
                    </div>
                </div>

                {/* Card 3: Total Arts Remedy */}
                <div
                    className="col-span-1 md:col-span-2 lg:col-span-4 glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden"
                    style={{ borderColor: `${art_curation.color_code}40` }}
                >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" style={{ color: art_curation.color_code }} />

                    <div
                        className="w-32 h-32 md:w-48 md:h-48 rounded-xl flex-shrink-0 shadow-2xl flex items-center justify-center text-4xl"
                        style={{ backgroundColor: art_curation.color_code }}
                    >
                        {/* Placeholder for Art Image */}
                        🎨
                    </div>

                    <div className="flex-1 z-10 text-center md:text-left">
                        <span className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">Total Arts Remedy</span>
                        <h2 className="text-2xl text-white font-serif mb-2">{art_curation.title}</h2>
                        <p className="text-slate-400 mb-4 leading-relaxed">{art_curation.description}</p>

                        {art_curation.music_recommendation && (
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-300 text-sm">
                                🎵 {art_curation.music_recommendation}
                            </div>
                        )}
                    </div>
                </div>

            </main>

            {/* Footer / Share */}
            <div className="mt-12 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <Link href="/" className="px-6 py-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-800 transition-all text-sm">
                    새로운 기록 남기기
                </Link>
                {/* Sharing would go here */}
            </div>

        </div>
    );
}
