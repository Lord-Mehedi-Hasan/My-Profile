'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
            setShowTop(scrollTop > 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Top progress bar */}
            <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Page scroll progress"
            />

            {/* Scroll to top */}
            <button
                className={`${styles.scrollTop} ${showTop ? styles.visible : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll back to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
        </>
    );
}
