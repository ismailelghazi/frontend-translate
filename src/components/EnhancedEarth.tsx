"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Earth3D from "./Earth3D";

interface EnhancedEarthProps {
    onThemeChange: (isAlert: boolean) => void;
    onOpenModal: () => void;
}

export default function EnhancedEarth({ onThemeChange, onOpenModal }: EnhancedEarthProps) {
    const { scrollYProgress } = useScroll();
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Transform scroll progress to visual states
    // 0 -> 0.3: Hero state (Large, Center)
    // 0.3+: Icon state (Small, Top-Right)
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.12]);
    const top = useTransform(scrollYProgress, [0, 0.3], ["50%", "2rem"]);
    const left = useTransform(scrollYProgress, [0, 0.3], ["50%", "calc(100% - 2rem)"]);
    const x = useTransform(scrollYProgress, [0, 0.3], ["-50%", "-50%"]);
    const y = useTransform(scrollYProgress, [0, 0.3], ["-50%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.9, 1]);

    // Theme trigger at 20% scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            onThemeChange(latest > 0.2);
        });
        return () => unsubscribe();
    }, [scrollYProgress, onThemeChange]);

    const handleClick = useCallback(() => {
        onOpenModal();
    }, [onOpenModal]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal();
        }
    }, [onOpenModal]);

    return (
        <motion.div
            style={{
                top,
                left,
                x,
                y,
                scale,
                opacity,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            role="button"
            aria-label="Interactive Earth: Click for translation assistance"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="relative w-[80vmin] h-[80vmin] md:w-[60vmin] md:h-[60vmin] max-w-[600px] max-h-[600px]">
                {/* 3D Earth Component */}
                <div className={`transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}>
                    <Earth3D isHovered={isHovered} isMobile={isMobile} />
                </div>

                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
                    }}
                />
            </div>
        </motion.div>
    );
}
