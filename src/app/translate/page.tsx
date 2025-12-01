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
        const checkAuth = async () => {
            try {
                const res = await fetch("https://backend-with-fastapi.vercel.app/login", {
                    credentials: "include" // Send cookies
                });
                if (res.ok) {
                    setAuthorized(true);
                } else {
                    router.push("/");
                }
            } catch (error) {
                console.error("Auth check failed", error);
                router.push("/");
            }
        };
        checkAuth();
    }, [router]);

    if (!authorized) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

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
                    Space Translate
                </div>
                <button
                    onClick={async () => {
                        try {
                            await fetch("https://backend-with-fastapi.vercel.app/logout", {
                                method: "POST",
                                credentials: "include"
                            });
                        } catch (e) {
                            console.error("Logout failed", e);
                        }
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
