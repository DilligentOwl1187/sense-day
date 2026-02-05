import { motion } from "framer-motion";

export default function ResultCardSkeleton() {
    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col gap-3 min-h-[160px] animate-pulse"
                >
                    <div className="h-4 w-24 bg-slate-800 rounded mb-2" />
                    <div className="h-3 w-full bg-slate-800/50 rounded" />
                    <div className="h-3 w-4/5 bg-slate-800/50 rounded" />
                    <div className="h-3 w-5/6 bg-slate-800/50 rounded" />
                </motion.div>
            ))}
        </div>
    );
}
