"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Sparkles, Copy, Check } from "lucide-react";

export default function TranslationDashboard() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState<"fr-en" | "en-fr">("fr-en");
    const [copied, setCopied] = useState(false);

    const handleTranslate = async () => {
        if (!inputText) return;
        setLoading(true);
        setTranslatedText("");

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock translation logic
        const mockTranslations: Record<string, string> = {
            "hello": "bonjour",
            "world": "monde",
            "bonjour": "hello",
            "monde": "world",
        };

        // Simple mock: if exact match found use it, otherwise just reverse or append " (translated)"
        let result = mockTranslations[inputText.toLowerCase()];
        if (!result) {
            result = language === "fr-en"
                ? `[EN] ${inputText}`
                : `[FR] ${inputText}`;
        }

        setTranslatedText(result);
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.02 }}
            animate={{
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0]
            }}
            transition={{
                y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            className="w-full max-w-4xl mx-auto p-6 cursor-grab active:cursor-grabbing"
        >
            <div className="flex flex-col md:flex-row gap-6">
                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -8, 0]
                    }}
                    transition={{
                        delay: 0.2,
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }
                    }}
                    className="flex-1 space-y-4"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 font-medium">Input ({language === "fr-en" ? "French" : "English"})</span>
                        <button
                            onClick={() => setLanguage(l => l === "fr-en" ? "en-fr" : "fr-en")}
                            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                            Switch
                        </button>
                    </div>
                    <motion.textarea
                        layout
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to translate..."
                        className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all resize-none backdrop-blur-sm"
                        whileFocus={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    />
                </motion.div>

                {/* Action Button (Mobile: Vertical, Desktop: Center) */}
                <div className="flex items-center justify-center">
                    <motion.button
                        onClick={handleTranslate}
                        disabled={loading || !inputText}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed group z-10"
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
                        )}
                    </motion.button>
                </div>

                {/* Output Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -12, 0]
                    }}
                    transition={{
                        delay: 0.4,
                        y: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }
                    }}
                    className="flex-1 space-y-4"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 font-medium">Output ({language === "fr-en" ? "English" : "French"})</span>
                        {translatedText && (
                            <button
                                onClick={copyToClipboard}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                    <div className="relative w-full h-64 bg-black/40 border border-white/5 rounded-2xl p-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="text-indigo-400/50 text-sm animate-pulse">Translating...</div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-lg text-indigo-100 leading-relaxed"
                                >
                                    {translatedText || <span className="text-gray-700 italic">Translation will appear here...</span>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
