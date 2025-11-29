"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Sparkles, Copy, Check } from "lucide-react";

/**
 * Cyberpunk Neon TranslationDashboard
 * - Orange / Red neon
 * - Scanlines, noise, sparks, holographic text
 * - Responsive and mobile-friendly
 */

export default function TranslationDashboard() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState<"fr-en" | "en-fr">("fr-en");
    const [copied, setCopied] = useState(false);

    const handleTranslate = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setTranslatedText("");

        // Mock delay + translation
        await new Promise((r) => setTimeout(r, 1200));
        const mock: Record<string, string> = {
            hello: "bonjour",
            world: "monde",
            bonjour: "hello",
            monde: "world",
        };

        const result =
            mock[inputText.toLowerCase()] ||
            (language === "fr-en" ? `[EN] ${inputText}` : `[FR] ${inputText}`);

        setTranslatedText(result);
        setLoading(false);
    };

    const copyToClipboard = async () => {
        if (!translatedText) return;
        await navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4 py-12">
            {/* Cyberpunk background layers */}
            <div className="absolute inset-0 -z-20">
                {/* gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2b0300] via-[#1a0500] to-black opacity-90" />
                {/* horizontal scanlines */}
                <div className="absolute inset-0 pointer-events-none mix-blend-screen">
                    <div className="scanlines" />
                </div>
                {/* subtle noise */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="noise" />
                </div>
                {/* drifting particles */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="particles" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-5xl mx-auto relative z-10"
            >
                {/* neon frame */}
                <div className="neon-panel rounded-3xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: [10, -6, 0] }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                            className="flex-1 space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <motion.span
                                    initial={{ opacity: 0.9 }}
                                    animate={{ x: [0, 2, 0], opacity: [0.9, 1, 0.95] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    className="text-sm font-medium tracking-wide holograph text-orange-300"
                                >
                                    Input ({language === "fr-en" ? "French" : "English"})
                                </motion.span>

                                <button
                                    onClick={() => setLanguage((l) => (l === "fr-en" ? "en-fr" : "fr-en"))}
                                    className="flex items-center gap-2 text-orange-400 hover:text-white transition-colors text-sm"
                                >
                                    <ArrowRightLeft className="w-4 h-4" />
                                    <span className="text-xs select-none">Switch</span>
                                </button>
                            </div>

                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type or paste text to translate..."
                                className="w-full h-56 md:h-64 resize-none rounded-2xl p-5 bg-[rgba(0,0,0,0.45)] border border-[rgba(255,120,0,0.08)] text-white placeholder:italic placeholder:text-[#8b7464] focus:outline-none focus:ring-2 focus:ring-orange-500/40 backdrop-blur-md transition"
                            />
                        </motion.div>

                        {/* center action */}
                        <div className="flex items-center justify-center md:justify-center">
                            <motion.button
                                onClick={handleTranslate}
                                disabled={loading || !inputText.trim()}
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group p-5 rounded-full bg-gradient-to-br from-[#ff7a00] to-[#ff2b00] shadow-[0_10px_40px_rgba(255,80,0,0.18)] disabled:opacity-40"
                                aria-label="Translate"
                            >
                                {/* energy halo */}
                                <span className="absolute -inset-1 rounded-full blur-xl opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(255,120,0,0.35),transparent_30%)] pointer-events-none" />

                                {/* SVG sparks layer */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="2" result="coloredBlur"></feGaussianBlur>
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <g filter="url(#glow)" className="spark-group opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <path d="M10 30 L30 20 L45 40" stroke="#ffb47a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        <path d="M70 10 L85 25 L65 35" stroke="#ff5a00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </g>
                                </svg>

                                {/* button content */}
                                <div className="relative z-10 flex items-center justify-center">
                                    {loading ? (
                                        <motion.div
                                            className="w-7 h-7 rounded-full border-2 border-white/40 border-t-white"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                                        />
                                    ) : (
                                        <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                                    )}
                                </div>

                                {/* energy ripple when clicked - CSS triggered by :active */}
                                <span className="absolute inset-0 rounded-full ripple pointer-events-none" />
                            </motion.button>
                        </div>

                        {/* Output */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: [10, -6, 0] }}
                            transition={{ duration: 1.1, ease: "easeOut", delay: 0.08 }}
                            className="flex-1 space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <motion.span
                                    className="text-sm font-medium tracking-wide holograph text-orange-300"
                                    animate={{ x: [0, -2, 0], opacity: [0.95, 1, 0.95] }}
                                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                                >
                                    Output ({language === "fr-en" ? "English" : "French"})
                                </motion.span>

                                {translatedText && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="text-[#d9cfc6] hover:text-white transition-colors"
                                        aria-label="Copy Translation"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                )}
                            </div>

                            <div className="relative w-full h-56 md:h-64 rounded-2xl p-5 bg-[rgba(0,0,0,0.5)] border border-[rgba(255,120,0,0.06)] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center text-orange-300/80"
                                        >
                                            Translating...
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.45 }}
                                            className="relative z-10 text-lg text-orange-100 leading-relaxed"
                                        >
                                            {translatedText ? (
                                                <pre className="whitespace-pre-wrap break-words">{translatedText}</pre>
                                            ) : (
                                                <span className="text-[#8b6f61] italic">Translation will appear here...</span>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* holographic grid overlay */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <g stroke="rgba(255,120,0,0.03)" strokeWidth="0.4">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <line key={i} x1="0" y1={(i + 1) * 5} x2="100" y2={(i + 1) * 5} />
                                            ))}
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Styles */}
            <style>{`
        /* scanlines */
        .scanlines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(transparent 92%, rgba(255,120,0,0.03) 100%);
          background-size: 100% 6px;
          opacity: 0.7;
          mix-blend-mode: overlay;
        }

        /* subtle noise */
        .noise {
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.03"/></svg>');
          opacity: 0.9;
          mix-blend-mode: overlay;
        }

        /* particles animation */
        .particles {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 10% 20%, rgba(255,160,80,0.06) 0 2px, transparent 2px),
            radial-gradient(circle at 70% 40%, rgba(255,80,20,0.04) 0 1.5px, transparent 1.5px),
            radial-gradient(circle at 50% 80%, rgba(255,100,40,0.03) 0 1px, transparent 1px);
          animation: drift 10s linear infinite;
          opacity: 0.9;
        }
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(8px); }
          100% { transform: translateY(0) translateX(0); }
        }

        /* neon panel */
        .neon-panel {
          position: relative;
          border-radius: 22px;
          padding: 18px;
          background: linear-gradient(180deg, rgba(20,10,8,0.35), rgba(0,0,0,0.6));
          border: 1px solid rgba(255,120,0,0.08);
          box-shadow: 0 10px 40px rgba(255,80,0,0.06), inset 0 1px 0 rgba(255,255,255,0.01);
          overflow: hidden;
        }
        .neon-panel::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          padding: 2px;
          background: linear-gradient(90deg, rgba(255,90,0,0.12), rgba(255,30,0,0.08) 50%, rgba(255,120,0,0.12));
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* holographic label */
        .holograph {
          text-shadow:
            0 0 6px rgba(255,140,60,0.06),
            0 0 12px rgba(255,90,20,0.03);
        }

        /* button spark animations */
        .group:hover .spark-group {
          opacity: 1;
        }

        /* ripple */
        .ripple {
          transition: transform 0.35s ease, opacity 0.35s ease;
        }
        .group:active .ripple {
          transform: scale(1.6);
          opacity: 0.25;
        }

        /* small responsive tweaks */
        @media (max-width: 768px) {
          .neon-panel { padding: 14px; }
        }
      `}</style>
        </div>
    );
}
