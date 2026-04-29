'use client';

import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    padding?: number;
}

/**
 * Wraps any element with the GSAP magnetic hover effect.
 * Drop-in: <Magnetic><button>Click</button></Magnetic>
 */
export default function Magnetic({ children, strength = 0.35, padding = 28 }: MagneticProps) {
    const ref = useMagnetic<HTMLDivElement>(strength, padding);
    return <div ref={ref} style={{ display: 'inline-block' }}>{children}</div>;
}
