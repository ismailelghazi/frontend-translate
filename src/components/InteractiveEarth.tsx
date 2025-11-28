"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

interface InteractiveEarthProps {
    onThemeChange: (isAlert: boolean) => void;
}

export default function InteractiveEarth({ onThemeChange }: InteractiveEarthProps) {
    const { scrollYProgress } = useScroll();
    const [isHovered, setIsHovered] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Transform scroll progress to visual states
    // 0 -> 0.2: Hero state (Large, Center)
    // 0.2 -> 0.4: Transition to Icon
    // 0.4+: Icon state (Small, Top-Right)

    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.15]);
    const top = useTransform(scrollYProgress, [0, 0.3], ["50%", "5%"]);
    const left = useTransform(scrollYProgress, [0, 0.3], ["50%", "95%"]);
    const x = useTransform(scrollYProgress, [0, 0.3], ["-50%", "-100%"]); // Anchor adjustment
    const y = useTransform(scrollYProgress, [0, 0.3], ["-50%", "0%"]);

    // Theme trigger
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            onThemeChange(latest > 0.2);
        });
        return () => unsubscribe();
    }, [scrollYProgress, onThemeChange]);

    // Smooth rotation on hover
    const rotate = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        if (isHovered) {
            rotate.set(15);
        } else {
            rotate.set(0);
        }
    }, [isHovered, rotate]);

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    top,
                    left,
                    x,
                    y,
                    scale,
                    zIndex: 50,
                    rotate
                }}
                className="cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowToast(true)}
                role="button"
                aria-label="Interactive Earth: Click to login"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        setShowToast(true);
                    }
                }}
            >
                {/* SVG Earth */}
                <svg
                    viewBox="0 0 200 200"
                    className="w-[80vmin] h-[80vmin] md:w-[60vmin] md:h-[60vmin] drop-shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                >
                    <defs>
                        <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Atmosphere Halo */}
                    <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="2" />

                    {/* Main Body */}
                    <circle cx="100" cy="100" r="90" fill="url(#earthGradient)" filter="url(#glow)" />

                    {/* Continents (Simplified Abstract Shapes) */}
                    <path
                        d="M50,80 Q70,60 90,80 T130,90 T160,70 V130 Q140,150 110,140 T60,120 Z"
                        fill="rgba(255, 255, 255, 0.2)"
                    />
                    <path
                        d="M140,40 Q160,30 170,50 T160,80 Z"
                        fill="rgba(255, 255, 255, 0.2)"
                    />
                </svg>
            </motion.div>

            {/* Toast / Modal */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[300px]"
                    >
                        <p className="text-white text-lg font-medium text-center">
                            Log in to enable translation assistance
                        </p>
                        <button
                            onClick={() => {
                                setShowToast(false);
                                // Scroll to login form
                                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                            }}
                            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setShowToast(false)}
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
