"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

export default function Typewriter({
    text,
    speed = 50,
    delay = 0,
    className = "",
    onComplete
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay * 1000);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText((prev) => prev + text[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, isStarted, onComplete]);

    return (
        <motion.div className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 ml-1 bg-current align-middle"
            />
        </motion.div>
    );
}
