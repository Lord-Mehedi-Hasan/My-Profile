'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';

type Variant = 'knot' | 'ico' | 'torus' | 'octa';

function Shape({ variant }: { variant: Variant }) {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((_, dt) => {
        if (!mesh.current) return;
        mesh.current.rotation.x += dt * 0.15;
        mesh.current.rotation.y += dt * 0.20;
    });

    const geo = (() => {
        switch (variant) {
            case 'knot':  return <torusKnotGeometry args={[1, 0.28, 180, 28]} />;
            case 'torus': return <torusGeometry args={[1, 0.32, 20, 90]} />;
            case 'octa':  return <octahedronGeometry args={[1.2, 0]} />;
            case 'ico':
            default:      return <icosahedronGeometry args={[1.2, 1]} />;
        }
    })();

    return (
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
            <mesh ref={mesh}>
                {geo}
                <meshStandardMaterial
                    color="#4a90d9"
                    wireframe
                    emissive="#4a90d9"
                    emissiveIntensity={0.35}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingShape({
    variant = 'knot',
    cameraZ = 4,
}: {
    variant?: Variant;
    cameraZ?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    // Only mount Canvas when element is visible in viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        // Skip on mobile — save battery + GPU
        if (window.innerWidth < 768) return;

        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            {inView && (
                <Canvas
                    camera={{ position: [0, 0, cameraZ], fov: 45 }}
                    dpr={1}
                    gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
                    frameloop="always"
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.4} />
                        <pointLight position={[5, 5, 5]} intensity={1} color="#4a90d9" />
                        <pointLight position={[-5, -5, -3]} intensity={0.6} color="#2ecc8a" />
                        <Shape variant={variant} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
