"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";
import { useEffect, useRef } from "react";

interface EarthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export default function EarthModal({ isOpen, onClose, onLogin }: EarthModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            const handleTab = (e: KeyboardEvent) => {
                if (e.key === "Tab") {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement?.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement?.focus();
                        }
                    }
                }
            };

            document.addEventListener("keydown", handleTab);
            firstElement?.focus();

            return () => document.removeEventListener("keydown", handleTab);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <h2
                                id="modal-title"
                                className="text-2xl font-bold text-white text-center mb-4 font-outfit"
                            >
                                Translation Assistant
                            </h2>

                            <p className="text-white/80 text-center mb-8 leading-relaxed">
                                Log in to activate translation assistance and smart suggestions.
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onLogin}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
                                >
                                    Login
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl border border-white/20 transition-all"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
