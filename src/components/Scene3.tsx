"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

export default function Scene3() {
    const [particles, setParticles] = useState<Array<{
        x: number;
        y: number;
        scale: number;
        duration: number;
        size: number;
        yAnimate: number;
        xAnimate: number;
    }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 50 }).map(() => ({
            x: Math.random() * 1000,
            y: Math.random() * 1000,
            scale: Math.random() * 0.8 + 0.2,
            duration: Math.random() * 10 + 10,
            size: Math.random() * 8 + 2,
            yAnimate: Math.random() * -200 - 50,
            xAnimate: Math.random() * 100 - 50,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative bg-slate-900 overflow-hidden">
            {/* Background Particles */}
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-500/30 rounded-full blur-[1px]"
                    initial={{
                        x: p.x,
                        y: p.y,
                        scale: p.scale,
                    }}
                    animate={{
                        y: [null, p.yAnimate],
                        x: [null, p.x + p.xAnimate],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}

            <div className="z-10 container mx-auto px-4 text-center max-w-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-blue-200 font-outfit">
                        The Discovery
                    </h2>

                    <div className="text-xl md:text-3xl text-gray-300 font-mono leading-relaxed min-h-[150px]">
                        <p className="mb-4">
                            <TypewriterText text="He discovers a powerful backend API..." delay={0.5} />
                        </p>
                        <p className="text-red-400">
                            <TypewriterText text="But no interface." delay={3} />
                        </p>
                        <p className="text-red-400">
                            <TypewriterText text="No tool to help the team." delay={4.5} />
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
