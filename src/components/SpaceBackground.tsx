"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";

export default function SpaceBackground({ onPlanetClick }: { onPlanetClick?: () => void }) {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000000', 5, 30]} />
            </Canvas>
        </div>
    );
}
