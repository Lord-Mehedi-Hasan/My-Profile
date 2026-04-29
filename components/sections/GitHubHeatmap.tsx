'use client';

import { useMemo } from 'react';
import styles from './GitHubHeatmap.module.css';

// Generate a simulated 52-week contribution heatmap
function generateHeatmapData() {
  const weeks = 52;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      const weeksAgo = weeks - w;
      const recency = Math.pow(1 - weeksAgo / weeks, 1.5);
      const base = Math.random();
      let level = 0;
      if (base < 0.35) level = 0;
      else if (base < 0.55) level = 1;
      else if (base < 0.75) level = 2;
      else if (base < 0.88) level = 3;
      else level = 4;
      if (recency > 0.6 && Math.random() > 0.4) level = Math.min(4, level + 1);
      if (w < 4) level = Math.min(4, level + 1);
      days.push(level);
    }
    data.push(days);
  }
  return data;
}

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', ''];

export default function GitHubHeatmap() {
  // Generate random data only on the client — never during SSR —
  // so server HTML and client HTML always match (both render nothing / same seed).
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.dot} />
          <span className={styles.title}>GITHUB CONTRIBUTIONS</span>
        </div>
        <a
          href="https://github.com/Lord-Mehedi-Hasan"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghLink}
          id="heatmap-github-link"
        >
          Lord-Mehedi-Hasan ↗
        </a>
      </div>

      <div className={styles.grid}>
        {/* Month labels */}
        <div className={styles.monthRow}>
          {months.map((m, i) => (
            <span key={i} className={styles.monthLabel}>{m}</span>
          ))}
        </div>

        {/* Day labels + cells */}
        <div className={styles.mainGrid}>
          <div className={styles.dayLabels}>
            {dayLabels.map((d, i) => (
              <span key={i} className={styles.dayLabel}>{d}</span>
            ))}
          </div>

          <div className={styles.cells}>
            {heatmapData.map((week, wi) => (
              <div key={wi} className={styles.week}>
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`${styles.cell} ${styles[`level${level}` as keyof typeof styles]}`}
                    title={`Level ${level} activity`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className={`${styles.cell} ${styles[`level${l}` as keyof typeof styles]}`} />
          ))}
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>
    </div>
  );
}
