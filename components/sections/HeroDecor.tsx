'use client';

import { motion } from 'framer-motion';

const TICKERS = [
    'GRAPH NEURAL NETWORKS',
    'ICPC 4× FINALIST',
    'ALZHEIMER\'S DETECTION',
    'FULL-STACK ENGINEER',
    'TYPESCRIPT × PYTHON',
    'CLINICAL AI',
    'DESIGN ENGINEERING',
    'DHAKA · 2026',
];

/**
 * Hero decorative element: concentric rotating SVG rings + vertical ticker.
 * Adapted from Portfolio-Showcase-main — uses --c-accent (blue) and --c-accent2 (green).
 */
export default function HeroDecor() {
    return (
        <div
            style={{
                position: 'absolute',
                inset: '0 0 0 auto',
                width: '55%',
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden',
                /* clip-path ensures transformed SVG children are hard-clipped */
                clipPath: 'inset(0)',
            }}
            aria-hidden="true"
        >
            {/* Concentric rotating rings */}
            <svg
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-15%',
                    transform: 'translateY(-50%)',
                    width: '110%',
                    aspectRatio: '1',
                }}
                viewBox="0 0 800 800"
                fill="none"
            >
                <defs>
                    <radialGradient id="heroRingFade" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="rgba(74,144,217,0)" />
                        <stop offset="100%" stopColor="rgba(74,144,217,0.30)" />
                    </radialGradient>
                </defs>

                {/* Rotating rings */}
                {[120, 180, 240, 300, 360].map((r, i) => (
                    <motion.circle
                        key={r}
                        cx="400" cy="400" r={r}
                        stroke="url(#heroRingFade)"
                        strokeWidth="1"
                        initial={{ rotate: 0, opacity: 0 }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: 1 }}
                        transition={{
                            rotate: { duration: 40 + i * 12, ease: 'linear', repeat: Infinity },
                            opacity: { duration: 1.5, delay: 0.3 * i },
                        }}
                        style={{ transformOrigin: '400px 400px' }}
                    />
                ))}

                {/* Tick marks on outer ring */}
                {Array.from({ length: 60 }).map((_, i) => {
                    const angle = (i / 60) * Math.PI * 2;
                    const x1 = 400 + Math.cos(angle) * 365;
                    const y1 = 400 + Math.sin(angle) * 365;
                    const x2 = 400 + Math.cos(angle) * (i % 5 === 0 ? 380 : 372);
                    const y2 = 400 + Math.sin(angle) * (i % 5 === 0 ? 380 : 372);
                    return (
                        <line
                            key={i}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke={i % 5 === 0 ? 'rgba(74,144,217,0.6)' : 'rgba(74,144,217,0.15)'}
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Crosshairs */}
                <line x1="400" y1="40"  x2="400" y2="120" stroke="rgba(74,144,217,0.35)" strokeWidth="1" />
                <line x1="400" y1="680" x2="400" y2="760" stroke="rgba(74,144,217,0.35)" strokeWidth="1" />
                <line x1="40"  y1="400" x2="120" y2="400" stroke="rgba(74,144,217,0.35)" strokeWidth="1" />
                <line x1="680" y1="400" x2="760" y2="400" stroke="rgba(74,144,217,0.35)" strokeWidth="1" />

                {/* Inner spinning text */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
                    style={{ transformOrigin: '400px 400px' }}
                >
                    <defs>
                        <path id="heroTextInner" d="M 400,400 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
                    </defs>
                    <text fill="rgba(5,21,51,0.40)" fontSize="13" fontFamily="monospace" letterSpacing="6">
                        <textPath href="#heroTextInner" startOffset="0">
                            MEHEDI HASAN · WEB DEVELOPER × ML RESEARCHER · DHAKA · 2026 ·
                        </textPath>
                    </text>
                </motion.g>

                {/* Outer counter-rotating text */}
                <motion.g
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
                    style={{ transformOrigin: '400px 400px' }}
                >
                    <defs>
                        <path id="heroTextOuter" d="M 400,400 m -330,0 a 330,330 0 1,1 660,0 a 330,330 0 1,1 -660,0" />
                    </defs>
                    <text fill="rgba(46,204,138,0.28)" fontSize="11" fontFamily="monospace" letterSpacing="8">
                        <textPath href="#heroTextOuter" startOffset="0">
                            SELECTED WORK · 2021—2026 · ML × FULL STACK · ICPC FINALIST · GRAPH NEURAL NETWORKS ·
                        </textPath>
                    </text>
                </motion.g>

                {/* Centre pulse dot */}
                <motion.circle
                    cx="400" cy="400" r="6"
                    fill="rgba(74,144,217,1)"
                    animate={{ scale: [1, 1.7, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                    style={{ transformOrigin: '400px 400px' }}
                />
                <circle cx="400" cy="400" r="14" stroke="rgba(74,144,217,0.35)" strokeWidth="1" fill="none" />
                <circle cx="400" cy="400" r="28" stroke="rgba(74,144,217,0.15)" strokeWidth="1" fill="none" />
            </svg>

            {/* Vertical scrolling ticker */}
            <div
                style={{
                    position: 'absolute',
                    top: 0, bottom: 0, right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ position: 'relative', height: '80%', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ y: ['0%', '-50%'] }}
                        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '48px',
                            fontSize: '0.6rem',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: 'rgba(5,21,51,0.22)',
                            writingMode: 'vertical-rl',
                        }}
                    >
                        {[...TICKERS, ...TICKERS].map((t, i) => (
                            <span key={i} style={{ whiteSpace: 'nowrap' }}>
                                <span style={{ color: 'var(--c-accent2)' }}>●</span>&nbsp;&nbsp;{t}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Blueprint grid */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.055,
                    backgroundImage:
                        'linear-gradient(rgba(74,144,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,217,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(circle at 70% 50%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 0%, transparent 70%)',
                }}
            />
        </div>
    );
}
