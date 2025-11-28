"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Earth3D = dynamic(() => import("@/components/Earth3D"), { ssr: false });

export default function Scene1() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden pointer-events-none">
            {/* 3D Background - Earth (Removed in favor of InteractiveEarth) */}
            <div className="absolute inset-0 opacity-80 z-0">
                {/* <Earth3D /> */}
            </div>

            {/* Content Container */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="z-10 text-center px-4 max-w-4xl relative"
            >
                <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                    The Arrival
                </motion.h1>

                <motion.p variants={item} className="text-xl md:text-3xl text-gray-200 font-light mb-4 leading-relaxed">
                    A young developer arrives in a new country...
                </motion.p>

                <motion.p variants={item} className="text-lg md:text-2xl text-gray-400 font-light italic">
                    Everything is unfamiliar — the language, the culture, the work.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 animate-bounce text-gray-500"
            >
                <span className="text-sm">Scroll to continue</span>
            </motion.div>
        </section>
    );
}
