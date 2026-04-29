'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CertMarquee.module.css';

const certs = [
  { title: 'DevOps with Azure Programming', issuer: 'Mind Luster', year: '2025', icon: '☁️', color: '#4A90D9', tags: ['DevOps', 'Azure'] },
  { title: 'Prompt Engineering with Generative AI', issuer: 'Mind Luster', year: '2025', icon: '🤖', color: '#2ECC8A', tags: ['AI', 'LLM'] },
  { title: 'Web Development with Angular', issuer: 'Mind Luster', year: '2025', icon: '🌐', color: '#C49A3C', tags: ['Frontend', 'Angular'] },
  { title: 'IT Essentials', issuer: 'CISCO', year: '2021', icon: '🔌', color: '#10b981', tags: ['Networking', 'IT'] },
];

// Duplicate for infinite scroll
const allCerts = [...certs, ...certs, ...certs];

export default function CertMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.marqueeContainer}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className={`${styles.track} ${paused ? styles.trackPaused : ''}`}
        >
          {allCerts.map((cert, i) => (
            <div key={i} className={styles.card} style={{ '--cert-c': cert.color } as React.CSSProperties}>
              <div className={styles.cardTop}>
                <span className={styles.icon}>{cert.icon}</span>
                <div className={styles.tags}>
                  {cert.tags.map((t, ti) => (
                    <span key={ti} className={styles.tag} style={{ color: cert.color, borderColor: cert.color + '40' }}>{t}</span>
                  ))}
                </div>
              </div>
              <h4 className={styles.title}>{cert.title}</h4>
              <p className={styles.meta}>
                <span className={styles.issuer}>{cert.issuer}</span>
                <span className={styles.year} style={{ color: cert.color }}>{cert.year}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.autoBtn} ${paused ? '' : styles.autoBtnActive}`}
          onClick={() => setPaused(p => !p)}
          id="cert-autoscroll-toggle"
        >
          <span className={styles.autoDot} />
          {paused ? '▶ Auto-Scroll Paused' : '▶ Auto-Scroll Active'}
        </button>
      </div>
    </div>
  );
}
