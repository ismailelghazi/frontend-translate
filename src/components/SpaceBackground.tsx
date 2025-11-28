"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";

function FloatingPlanets({ onPlanetClick }: { onPlanetClick: () => void }) {
    const groupRef = useRef<Group>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05;
            groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Purple Planet */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere args={[1.5, 32, 32]} position={[-6, 2, -10]}>
                    <meshStandardMaterial color="#9333ea" roughness={0.7} metalness={0.2} />
                </Sphere>
                <Text
                    position={[-6, 4, -10]}
                    fontSize={0.5}
                    color="#e9d5ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Global
                </Text>
            </Float>

            {/* Blue Planet (Clickable) */}
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
                <Sphere
                    args={[2.5, 32, 32]}
                    position={[8, -3, -15]}
                    onClick={onPlanetClick}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshStandardMaterial
                        color={hovered ? "#60a5fa" : "#3b82f6"}
                        roughness={0.5}
                        metalness={0.5}
                        emissive={hovered ? "#1e3a8a" : "#000000"}
                    />
                </Sphere>
                <Text
                    position={[8, 0, -15]}
                    fontSize={0.8}
                    color="#bfdbfe"
                    anchorX="center"
                    anchorY="middle"
                >
                    Secure
                </Text>
            </Float>

            {/* Tiny Moon */}
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[0.5, 16, 16]} position={[5, 4, -8]}>
                    <meshStandardMaterial color="#e879f9" emissive="#e879f9" emissiveIntensity={0.5} />
                </Sphere>
            </Float>
        </group>
    );
}

export default function SpaceBackground({ onPlanetClick }: { onPlanetClick?: () => void }) {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                <FloatingPlanets onPlanetClick={onPlanetClick || (() => { })} />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000000', 5, 30]} />
            </Canvas>
        </div>
    );
}
