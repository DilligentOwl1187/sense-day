import { DailyInsight } from '@/types/destiny';

interface Props {
    data: DailyInsight;
}

export default function ThreeStepOutput({ data }: Props) {
    return (
        <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* 1. Message */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-xs font- tracking-widest text-slate-400 mb-2 uppercase">Today's Message</h3>
                <p className="text-lg font-light leading-relaxed text-slate-100">
                    {data.message}
                </p>
            </div>

            {/* 2. Curiosity */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors delay-150">
                <h3 className="text-xs font-medium tracking-widest text-indigo-400 mb-2 uppercase">A Question for You</h3>
                <p className="text-md font-medium text-indigo-200 italic">
                    "{data.curiosity}"
                </p>
            </div>

            {/* 3. Time Sense */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xs font-medium tracking-widest text-purple-400 mb-2 uppercase">Sense of Time</h3>
                <p className="text-sm font-light text-slate-300">
                    {data.timeSense}
                </p>
            </div>
        </div>
    );
}
