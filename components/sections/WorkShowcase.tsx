'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/data/projects';
import styles from './WorkShowcase.module.css';

// Project image map — use a placeholder gradient if no real image exists
const PROJECT_IMAGES: Record<string, string> = {
    healthinfo:     'https://picsum.photos/seed/healthinfo/1200/900',
    ecommerce:      'https://picsum.photos/seed/ecommerce/1200/900',
    'online-store': 'https://picsum.photos/seed/onlinestore/1200/900',
    bank:           'https://picsum.photos/seed/banksystem/1200/900',
    dabble:         'https://picsum.photos/seed/dabblegame/1200/900',
    parcel:         'https://picsum.photos/seed/parceltrack/1200/900',
    'utility-suite':'https://picsum.photos/seed/utilitysuite/1200/900',
};

export default function WorkShowcase() {
    const [active, setActive] = useState(0);

    return (
        <div className={styles.showcase}>
            {/* ── Desktop: list + sticky preview ───────── */}
            <div className={styles.desktopGrid}>
                {/* Left: project list */}
                <div className={styles.list}>
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            className={`${styles.row} ${i === active ? styles.rowActive : ''}`}
                            onMouseEnter={() => setActive(i)}
                            whileHover={{ x: 10 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                        >
                            <span className={styles.rowNum}>{p.num}</span>
                            <div className={styles.rowBody}>
                                <Link href={`/projects/${p.id}`} className={styles.rowTitle}>
                                    {p.title}
                                </Link>
                                <p className={styles.rowDesc}>{p.desc}</p>
                            </div>
                            <div className={styles.rowMeta}>
                                <span className={styles.rowYear}>{p.year}</span>
                                <span className={styles.rowCat}>{p.cat}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right: sticky image panel */}
                <div className={styles.preview}>
                    <div className={styles.previewSticky}>
                        <div className={styles.previewFrame}>
                            {projects.map((p, i) => (
                                <motion.img
                                    key={p.id}
                                    src={PROJECT_IMAGES[p.id]}
                                    alt={p.title}
                                    className={styles.previewImg}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{
                                        opacity: i === active ? 1 : 0,
                                        scale: i === active ? 1 : 1.05,
                                    }}
                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                />
                            ))}
                            <div className={styles.previewGradient} />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4 }}
                                    className={styles.previewCaption}
                                >
                                    <div>
                                        <p className={styles.captionStack}>
                                            {projects[active].year} · {projects[active].tech.slice(0, 3).join(' · ')}
                                        </p>
                                        <p className={styles.captionDesc}>{projects[active].desc}</p>
                                    </div>
                                    <span className={styles.captionNum}>
                                        {projects[active].num} / {String(projects.length).padStart(2, '0')}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile: stacked cards ───────────────── */}
            <div className={styles.mobileList}>
                {projects.map((p) => (
                    <Link key={p.id} href={`/projects/${p.id}`} className={styles.mobileCard}>
                        <div className={styles.mobileImgWrap}>
                            <img
                                src={PROJECT_IMAGES[p.id]}
                                alt={p.title}
                                className={styles.mobileImg}
                                loading="lazy"
                            />
                            <div className={styles.mobileImgOverlay} />
                            <span className={styles.mobileNum}>{p.num}</span>
                            <span className={styles.mobileYear}>{p.year}</span>
                        </div>
                        <div className={styles.mobileBody}>
                            <h3 className={styles.mobileName}>{p.title}</h3>
                            <p className={styles.mobileDesc}>{p.desc}</p>
                            <p className={styles.mobileTech}>{p.tech.slice(0, 3).join(' · ')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
