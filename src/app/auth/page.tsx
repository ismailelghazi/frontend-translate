"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import EnhancedEarth from "@/components/EnhancedEarth";
import EarthModal from "@/components/EarthModal";
import AuthForm from "@/components/AuthForm";
import SpaceBackground from "@/components/SpaceBackground";

export default function AuthPage() {
    const [isAlertTheme, setIsAlertTheme] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleThemeChange = useCallback((isAlert: boolean) => {
        setIsAlertTheme(isAlert);
        // Apply theme class to body
        if (isAlert) {
            document.body.classList.add("theme-alert");
        } else {
            document.body.classList.remove("theme-alert");
        }
    }, []);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleLogin = useCallback(() => {
        setIsModalOpen(false);
        // Scroll to form
        window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-[200vh] w-full bg-black text-white relative overflow-x-hidden">
            {/* Space Background */}
            <SpaceBackground />

            {/* Interactive Earth */}
            <EnhancedEarth
                onThemeChange={handleThemeChange}
                onOpenModal={handleOpenModal}
            />

            {/* Modal */}
            <EarthModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onLogin={handleLogin}
            />

            {/* Hero Section - Earth takes center stage */}
            <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center max-w-2xl pointer-events-none"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pointer-events-auto">
                        Welcome to TalAIt
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 pointer-events-auto">
                        Your intelligent translation companion
                    </p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="text-gray-500 text-sm pointer-events-auto"
                    >
                        Scroll to explore
                    </motion.div>
                </motion.div>
            </section>

            {/* Auth Form Section */}
            <section className="min-h-screen flex items-center justify-center relative z-10 px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Left side - Info */}
                    <div className="space-y-6 text-center md:text-left">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold font-outfit"
                        >
                            Get Started
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-300"
                        >
                            Join thousands of users who trust TalAIt for accurate,
                            intelligent translations powered by cutting-edge AI.
                        </motion.p>
                        <motion.ul
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3 text-gray-400"
                        >
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                Real-time translation
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="w-2 h-2 bg-purple-500 rounded-full" />
                                Context-aware suggestions
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <span className="w-2 h-2 bg-pink-500 rounded-full" />
                                Secure and private
                            </li>
                        </motion.ul>
                    </div>

                    {/* Right side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <AuthForm isAlertTheme={isAlertTheme} />
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
