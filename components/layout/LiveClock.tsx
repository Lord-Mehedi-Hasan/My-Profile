'use client';

import { useEffect, useState } from 'react';
import styles from './LiveClock.module.css';

/**
 * Live ticking clock — matches Showcase's HH:MM:SS display in the Navbar.
 * Shows local time with timezone abbreviation.
 */
export default function LiveClock() {
    const [time, setTime] = useState('');
    const [tz, setTz] = useState('');

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short',
        });

        const tick = () => {
            const parts = fmt.formatToParts(new Date());
            const h = parts.find(p => p.type === 'hour')?.value ?? '00';
            const m = parts.find(p => p.type === 'minute')?.value ?? '00';
            const s = parts.find(p => p.type === 'second')?.value ?? '00';
            const tzName = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
            setTime(`${h}:${m}:${s}`);
            setTz(tzName);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    if (!time) return null;

    return (
        <div className={styles.clock} aria-label="Current local time" title="Local time">
            <span className={styles.tz}>{tz}</span>
            <span className={styles.time}>{time}</span>
        </div>
    );
}
