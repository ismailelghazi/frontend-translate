"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Key } from "lucide-react";

export default function Scene4() {
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative bg-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="z-10 flex flex-col items-center text-center px-4"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                    className="mb-12 relative"
                >
                    <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-30 rounded-full" />
                    <Key className="w-32 h-32 md:w-48 md:h-48 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-outfit">
                    The Key
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
                    He decides to build the key.
                </p>

                <Link href="/auth">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(250, 204, 21, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-xl rounded-full overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            ✨ Start the Journey — Enter the App
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
}
