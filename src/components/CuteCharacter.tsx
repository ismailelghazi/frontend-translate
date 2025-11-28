"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CuteCharacter({ message, onClick }: { message?: string; onClick?: () => void }) {
    const { scrollYProgress } = useScroll();

    // Character moves from top-left (hero) to center-right (login form) based on scroll
    const xScroll = useTransform(scrollYProgress, [0, 1], ["15%", "85%"]);
    const yScroll = useTransform(scrollYProgress, [0, 1], ["25%", "45%"]);
    const scaleScroll = useTransform(scrollYProgress, [0, 1], [1.2, 0.8]);
    const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 10]);

    // Smooth mouse follow with more "floaty" physics
    const springConfig = { damping: 15, stiffness: 100, mass: 0.5 };
    const xMouse = useSpring(0, springConfig);
    const yMouse = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const targetX = (clientX - window.innerWidth / 2) * 0.08;
            const targetY = (clientY - window.innerHeight / 2) * 0.08;
            xMouse.set(targetX);
            yMouse.set(targetY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [xMouse, yMouse]);

    return (
        <motion.div
            style={{
                left: xScroll,
                top: yScroll,
                x: xMouse,
                y: yMouse,
                scale: scaleScroll,
                rotate: rotateScroll
            }}
            className="fixed z-50 pointer-events-auto cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Speech Bubble */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -20, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-indigo-900 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg"
                >
                    {message}
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                </motion.div>
            )}

            {/* Cute Floating Spirit SVG */}
            <motion.svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                initial="idle"
                animate="idle"
            >
                {/* Glow behind */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                </defs>

                {/* Body - Soft Blob Shape */}
                <motion.path
                    d="M 75 20 C 110 20 130 50 130 80 C 130 120 110 140 75 140 C 40 140 20 120 20 80 C 20 50 40 20 75 20 Z"
                    fill="url(#bodyGradient)"
                    filter="url(#glow)"
                    variants={{
                        idle: {
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1],
                            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }
                    }}
                />

                {/* Face Container */}
                <motion.g
                    variants={{
                        idle: {
                            y: [0, -2, 0],
                            transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                        }
                    }}
                >
                    {/* Eyes - Large and Expressive */}
                    <ellipse cx="55" cy="75" rx="8" ry="12" fill="#1e1b4b" />
                    <ellipse cx="95" cy="75" rx="8" ry="12" fill="#1e1b4b" />

                    {/* Eye Highlights (Sparkle) */}
                    <circle cx="58" cy="70" r="3" fill="white" />
                    <circle cx="98" cy="70" r="3" fill="white" />

                    {/* Blinking Animation Overlay */}
                    <motion.g
                        variants={{
                            idle: {
                                opacity: [0, 0, 1, 0, 0], // Blink
                                scaleY: [1, 1, 0.1, 1, 1],
                                transition: { duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1, 1] }
                            }
                        }}
                    >
                        {/* Eyelids (hidden by default, shown during blink) */}
                    </motion.g>

                    {/* Cheeks */}
                    <circle cx="45" cy="90" r="6" fill="#f472b6" opacity="0.6" />
                    <circle cx="105" cy="90" r="6" fill="#f472b6" opacity="0.6" />

                    {/* Mouth - Small Smile */}
                    <path d="M 70 95 Q 75 100 80 95" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
                </motion.g>
            </motion.svg>
        </motion.div>
    );
}
