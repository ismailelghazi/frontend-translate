"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

interface Earth3DProps {
    isHovered?: boolean;
    isMobile?: boolean;
}

export default function Earth3D({ isHovered = false, isMobile = false }: Earth3DProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phiRef = useRef(0);

    useEffect(() => {
        let phi = 0;
        let width = canvasRef.current?.offsetWidth || 0;
        const doublePR = window.devicePixelRatio;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: doublePR,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: isMobile ? 8000 : 16000, // Reduce samples on mobile for performance
            mapBrightness: 6,
            baseColor: [0.1, 0.2, 0.4], // Deep ocean blue
            markerColor: [0.1, 0.8, 1], // Bright cyan for markers
            glowColor: [0.5, 0.8, 1], // Light blue glow
            markers: [
                // Major cities
                { location: [37.7595, -122.4367], size: 0.05 }, // San Francisco
                { location: [40.7128, -74.006], size: 0.08 }, // New York
                { location: [51.5074, -0.1278], size: 0.06 }, // London
                { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
                { location: [48.8566, 2.3522], size: 0.05 }, // Paris
            ],
            onRender: (state) => {
                // Smooth rotation - faster on hover
                state.phi = phi;
                phi += isHovered ? 0.015 : 0.005;

                // Subtle tilt on hover
                state.theta = 0.3 + (isHovered ? 0.1 : 0);

                // Update width
                width = canvasRef.current?.offsetWidth || 0;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        // Cleanup
        return () => {
            globe.destroy();
        };
    }, [isHovered, isMobile]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    aspectRatio: 1,
                    contain: "layout paint size",
                }}
                className="transition-transform duration-300"
            />
        </div>
    );
}
