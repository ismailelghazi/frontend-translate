"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, ArrowRight } from "lucide-react";

interface AuthFormProps {
    isAlertTheme?: boolean;
}

export default function AuthForm({ isAlertTheme = false }: AuthFormProps) {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? "http://localhost:8000/login" : "http://localhost:8000/register";

        // Get form data
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username") as string; // We'll need to add name="username" to input
        const password = formData.get("password") as string; // We'll need to add name="password" to input

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Important for cookies
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.detail || "Authentication failed");
                setLoading(false);
                return;
            }

            // If login/register successful
            if (isLogin) {
                // Cookie is set by backend, just redirect
                router.push("/translate");
            } else {
                // If registered, switch to login or auto-login (for now just switch to login view)
                alert("Registration successful! Please login.");
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Auth error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Dynamic colors based on theme
    const accentColor = isAlertTheme
        ? "from-red-600 to-yellow-500"
        : "from-indigo-600 to-purple-600";

    const focusRing = isAlertTheme
        ? "focus:ring-red-500"
        : "focus:ring-indigo-500";

    return (
        <div className="w-full max-w-md p-6 md:p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl mx-auto">
            <div className="flex justify-center mb-8">
                <div className="bg-black/30 p-1 rounded-full flex relative">
                    <motion.div
                        className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r ${accentColor}`}
                        animate={{ x: isLogin ? 0 : "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${isLogin ? "text-white" : "text-gray-400"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isLogin ? "text-white" : "text-gray-400"}`}
                    >
                        Register
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.form
                    key={isLogin ? "login" : "register"}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            className={`w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${focusRing} transition-all`}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className={`w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${focusRing} transition-all`}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className={`w-full bg-gradient-to-r ${accentColor} text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <>
                                {isLogin ? "Sign In" : "Create Account"}
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </AnimatePresence>
        </div>
    );
}
