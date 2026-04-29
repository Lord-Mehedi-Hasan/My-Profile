'use client';

import { useEffect, useRef } from 'react';
import styles from './SkillGlobe.module.css';

interface SkillTag {
  name: string;
  color: string;
}

const tags: SkillTag[] = [
  { name: 'C++', color: '#00599C' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#f89820' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'C#', color: '#9B4F96' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'NestJS', color: '#E0234E' },
  { name: 'Angular', color: '#DD0031' },
  { name: 'Node.js', color: '#339933' },
  { name: 'HTML5', color: '#E34F26' },
  { name: 'CSS3', color: '#1572B6' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Oracle', color: '#F80000' },
  { name: 'GitHub', color: '#ffffff' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'VS Code', color: '#007ACC' },
  { name: 'Machine Learning', color: '#4A90D9' },
  { name: 'NLP', color: '#2ECC8A' },
  { name: 'Scikit-learn', color: '#C49A3C' },
  { name: 'Jupyter', color: '#F37626' },
  { name: 'Postman', color: '#FF6C37' },
  { name: 'XAMPP', color: '#FB7A24' },
  { name: 'Codeforces', color: '#4A90D9' },
  { name: 'LeetCode', color: '#FFA116' },
];

interface TagPos extends SkillTag {
  x: number;
  y: number;
  z: number;
  projX: number;
  projY: number;
  scale: number;
  alpha: number;
}

export default function SkillGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = Math.min(container.clientWidth, 500);
    canvas.width = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const RADIUS = SIZE * 0.42;

    // Place tags on sphere surface using Fibonacci spiral
    const tagPositions: TagPos[] = tags.map((tag, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / tags.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ...tag,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        projX: 0,
        projY: 0,
        scale: 1,
        alpha: 1,
      };
    });

    let rotX = 0, rotY = 0;
    let velX = 0.003, velY = 0.005;
    let isDragging = false;
    let lastMX = 0, lastMY = 0;
    let raf: number;

    const rotate = (x: number, y: number, z: number, rx: number, ry: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const nx = x * cosY + z * sinY;
      const nz = -x * sinY + z * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const ny2 = y * cosX - nz * sinX;
      const nz2 = y * sinX + nz * cosX;
      return { x: nx, y: ny2, z: nz2 };
    };

    ctx.font = 'bold 12px "Fira Code", monospace';

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Draw wireframe sphere lines
      const LINES = 8;
      for (let l = 0; l <= LINES; l++) {
        const lat = (l / LINES) * Math.PI;
        ctx.beginPath();
        for (let s = 0; s <= 60; s++) {
          const lon = (s / 60) * 2 * Math.PI;
          const px = Math.sin(lat) * Math.cos(lon);
          const py = Math.cos(lat);
          const pz = Math.sin(lat) * Math.sin(lon);
          const r = rotate(px, py, pz, rotX, rotY);
          const scale = 1 / (1 - r.z * 0.3);
          const sx = cx + r.x * RADIUS * scale;
          const sy = cy + r.y * RADIUS * scale;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = 'rgba(74,144,217,0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let l = 0; l < LINES * 2; l++) {
        const lon = (l / (LINES * 2)) * 2 * Math.PI;
        ctx.beginPath();
        for (let s = 0; s <= 30; s++) {
          const lat = (s / 30) * Math.PI;
          const px = Math.sin(lat) * Math.cos(lon);
          const py = Math.cos(lat);
          const pz = Math.sin(lat) * Math.sin(lon);
          const r = rotate(px, py, pz, rotX, rotY);
          const scale = 1 / (1 - r.z * 0.3);
          const sx = cx + r.x * RADIUS * scale;
          const sy = cy + r.y * RADIUS * scale;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = 'rgba(74,144,217,0.05)';
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // Project and sort tags
      tagPositions.forEach(tag => {
        const r = rotate(tag.x, tag.y, tag.z, rotX, rotY);
        const perspective = 1 / (1 - r.z * 0.3);
        tag.projX = cx + r.x * RADIUS * perspective;
        tag.projY = cy + r.y * RADIUS * perspective;
        tag.scale = perspective;
        tag.alpha = (r.z + 1) / 2;
      });

      const sorted = [...tagPositions].sort((a, b) => a.alpha - b.alpha);

      sorted.forEach(tag => {
        const fontSize = Math.max(9, Math.round(12 * tag.scale));
        ctx.font = `bold ${fontSize}px "Fira Code", monospace`;
        const w = ctx.measureText(tag.name).width;
        const h = fontSize + 4;
        const px = tag.projX - w / 2 - 6;
        const py = tag.projY - h / 2 - 2;
        const pw = w + 12;
        const ph = h + 4;

        ctx.globalAlpha = tag.alpha * 0.85;
        ctx.fillStyle = 'rgba(240,248,255,0.9)';
        ctx.beginPath();
        ctx.roundRect(px, py, pw, ph, 4);
        ctx.fill();

        ctx.strokeStyle = tag.color + '60';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.fillStyle = tag.color;
        ctx.globalAlpha = tag.alpha;
        ctx.fillText(tag.name, tag.projX - w / 2, tag.projY + fontSize / 3);
      });

      ctx.globalAlpha = 1;

      if (!isDragging) {
        rotY += velY;
        rotX += velX;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onMouseDown = (e: MouseEvent) => { isDragging = true; lastMX = e.clientX; lastMY = e.clientY; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      rotY += (e.clientX - lastMX) * 0.005;
      rotX += (e.clientY - lastMY) * 0.005;
      lastMX = e.clientX;
      lastMY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e: TouchEvent) => { isDragging = true; lastMX = e.touches[0].clientX; lastMY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      rotY += (e.touches[0].clientX - lastMX) * 0.005;
      rotX += (e.touches[0].clientY - lastMY) * 0.005;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.globeContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
      <p className={styles.hint}>⊕ Drag to rotate in any direction</p>
    </div>
  );
}
