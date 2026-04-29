'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StatsCards.module.css';

const stats = [
  { label: 'Projects Built', value: 7, suffix: '+', color: '#4A90D9' },
  { label: 'ICPC Participations', value: 4, suffix: '×', color: '#2ECC8A' },
  { label: 'NCPC Competitions', value: 2, suffix: '×', color: '#C49A3C' },
  { label: 'Research Papers', value: 4, suffix: '+', color: '#10b981' },
  { label: 'Certifications', value: 4, suffix: '+', color: '#f43f5e' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCards() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className={styles.card}
          style={{ '--stat-color': stat.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <div className={styles.value} style={{ color: stat.color }}>
            <CountUp target={stat.value} suffix={stat.suffix} />
          </div>
          <div className={styles.label}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
