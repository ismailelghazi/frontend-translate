"use client";

import { motion } from "framer-motion";
import TranslationDashboard from "@/components/TranslationDashboard";
import SpaceBackground from "@/components/SpaceBackground";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TranslatePage() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check for token
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) return null;

    return (
        <div className="min-h-screen w-full bg-black text-white relative overflow-hidden flex flex-col">
            <SpaceBackground />

            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="p-6 flex justify-between items-center z-10"
            >
                <div className="text-2xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    TalAIt Translate
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/");
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    Logout
                </button>
            </motion.header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
                <div className="pointer-events-auto w-full">
                    <TranslationDashboard />
                </div>
            </main>
        </div>
    );
}
