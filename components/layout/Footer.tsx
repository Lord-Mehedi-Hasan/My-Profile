'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const fmt = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
                timeZone: 'Asia/Dhaka',
            }));
        };
        fmt();
        const id = setInterval(fmt, 1000);
        return () => clearInterval(id);
    }, []);

    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.inner}>
                {/* Left */}
                <span className={styles.copy}>
                    &copy; {new Date().getFullYear()} Mehedi Hasan
                </span>

                {/* Center */}
                <span className={styles.location}>
                    Dhaka, Bangladesh
                    <span className={styles.dot}>·</span>
                    <span className={styles.clock}>{time}</span>
                </span>

                {/* Right */}
                <button
                    className={styles.contactBtn}
                    onClick={() => scrollTo('contact')}
                    aria-label="Go to contact section"
                >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Contact
                </button>
            </div>
        </footer>
    );
}
