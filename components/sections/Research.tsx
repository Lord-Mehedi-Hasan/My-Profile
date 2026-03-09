'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Research.module.css';

const papers = [
    {
        num: '01',
        title: "Alzheimer's Disease Detection using Machine Learning",
        area: 'Neurology · AI',
        year: '2024',
        tags: ['ML', 'Classification', 'Healthcare', 'Neural Networks'],
        desc: "ML-based early-stage Alzheimer's detection from clinical/imaging data. Focuses on classification accuracy and model interpretability for clinical deployment.",
    },
    {
        num: '02',
        title: 'ML-Based Early Detection of Atrial & Ventricular Septal Defects in CHD',
        area: 'Cardiology · AI',
        year: '2024',
        tags: ['ML', 'Risk Prediction', 'Cardiology', 'CHD'],
        desc: 'Machine learning for early detection and risk scoring of congenital heart defects, targeting ASD and VSD to support clinical decision-making and triage.',
    },
    {
        num: '03',
        title: 'Stroke Prediction using Gaussian Naïve Bayes Classifier',
        area: 'Predictive Analytics',
        year: '2024',
        tags: ['Naïve Bayes', 'Stroke', 'Statistics', 'Classification'],
        desc: 'Probabilistic stroke risk prediction using Gaussian Naïve Bayes on patient health datasets. Evaluated across accuracy, precision, recall, and AUC-ROC metrics.',
    },
    {
        num: '04',
        title: 'TweetSentiment Analyzer – Twitter Polarity Classification by NLP',
        area: 'NLP · Social Media',
        year: '2024',
        tags: ['NLP', 'Sentiment Analysis', 'TF-IDF'],
        desc: 'NLP project classifying tweet sentiment using ML pipelines, TF-IDF vectorization, and preprocessing for social media data.',
    },
];

export default function Research() {
    const ref = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    /* ── GSAP 3D stagger entrance for flip cards ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const grid = gridRef.current;
            if (!grid) return;

            const cards = grid.querySelectorAll<HTMLElement>('[data-flip-card]');
            gsap.fromTo(cards,
                { rotateX: -35, scale: 0.82, opacity: 0, z: -80, transformOrigin: 'top center' },
                {
                    rotateX: 0, scale: 1, opacity: 1, z: 0,
                    duration: 0.95, ease: 'expo.out', stagger: 0.14,
                    scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none reverse' },
                }
            );
        };
        init();
    }, []);

    return (
        <section id="research" className={`section ${styles.research}`} ref={ref} aria-labelledby="res-h">
            <div className="wrap">
                <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`}>
                    <span>04</span>
                    Research
                </div>

                <h2 className={`${styles.title} ${vis ? 'reveal in' : 'reveal'}`} id="res-h" style={{ transitionDelay: '0.06s' }}>
                    Academic<br />
                    <span className={styles.outline}>Papers</span>
                </h2>

                {/* 3D Flip-card grid */}
                <div className={styles.flipGrid} ref={gridRef} style={{ perspective: '1000px' }}>
                    {papers.map((p) => (
                        <div key={p.num} className={styles.flipCard} data-flip-card style={{ transformStyle: 'preserve-3d' }}>
                            {/* Front face */}
                            <div className={styles.flipFront}>
                                <span className={styles.num}>{p.num}</span>
                                <h3 className={styles.paperTitle}>{p.title}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.area}>{p.area}</span>
                                    <span className={styles.year}>{p.year}</span>
                                </div>
                                <div className={styles.hoverHint}>Hover to see abstract →</div>
                            </div>
                            {/* Back face */}
                            <div className={styles.flipBack}>
                                <span className={styles.num}>{p.num}</span>
                                <p className={styles.desc}>{p.desc}</p>
                                <div className={styles.tags}>
                                    {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                                </div>
                                <div className={styles.meta}>
                                    <span className={styles.area}>{p.area}</span>
                                    <span className={styles.year}>{p.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
