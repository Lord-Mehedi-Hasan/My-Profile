'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader() {
    // Start as false — only show after client mount (avoids SSR mismatch + sessionStorage)
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // If already loaded this session, skip entirely
        if (sessionStorage.getItem('loader_done')) {
            setMounted(false);
            return;
        }
        setMounted(true);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        sessionStorage.setItem('loader_done', 'true');
                    }, 500);
                    return 100;
                }
                // Speed: faster at start, slow near 100
                const increment = prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
                return Math.min(prev + increment, 100);
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: 'inset(50% 0 50% 0)',
                        transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] },
                    }}
                    className={styles.loader}
                >
                    {/* Scanline overlay */}
                    <div className={styles.scanlines} aria-hidden="true" />

                    <div className={styles.inner}>
                        {/* Pulsing accent dot */}
                        <motion.div
                            className={styles.dot}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        />

                        {/* Counter: 00 → 100 */}
                        <div className={styles.counter} aria-live="polite" aria-label={`Loading ${Math.round(progress)}%`}>
                            <span className={styles.counterNum}>
                                {String(Math.round(progress)).padStart(2, '0')}
                            </span>
                            <span className={styles.arrow}>→</span>
                            <span className={styles.counterTotal}>100</span>
                        </div>

                        {/* Progress bar */}
                        <div className={styles.bar}>
                            <motion.div
                                className={styles.barFill}
                                style={{ scaleX: progress / 100, originX: 0 }}
                            />
                        </div>

                        {/* Label */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className={styles.label}
                        >
                            Initializing Neural Link
                        </motion.p>
                    </div>

                    {/* Corner decorations */}
                    <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
                    <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
                    <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
                    <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
