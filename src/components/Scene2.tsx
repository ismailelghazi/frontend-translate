"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, XCircle } from "lucide-react";

export default function Scene2() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black py-20">

            <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-10">
                {/* Abstract background shapes could go here */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900 rounded-full blur-[128px]" />
            </motion.div>

            <div className="z-10 container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-outfit text-red-500">
                        The Challenge
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 font-light">
                        At <span className="font-bold text-white">TalAIt</span>, teams translate everything manually...
                    </p>

                    <div className="space-y-4 pt-4">
                        {[
                            { icon: Clock, text: "Slow", color: "text-yellow-500" },
                            { icon: AlertTriangle, text: "Errors", color: "text-orange-500" },
                            { icon: XCircle, text: "Not Scalable", color: "text-red-500" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-4 text-xl md:text-2xl"
                            >
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                                <span className="text-gray-400">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: yText }}
                    className="relative h-[400px] w-full flex items-center justify-center"
                >
                    {/* Floating abstract representation of chaos */}
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
                        className="relative w-64 h-64 border border-red-500/30 rounded-full flex items-center justify-center"
                    >
                        <div className="absolute inset-0 border border-red-500/20 rounded-full animate-ping" />
                        <div className="text-red-500/50 font-mono text-sm p-4 text-center">
                            ERROR: TRANSLATION_MISSING<br />
                            404 NOT FOUND<br />
                            TIMEOUT_EXCEPTION
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
