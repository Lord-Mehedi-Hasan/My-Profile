'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { type BlogPost } from '@/data/blog';
import styles from './blog.module.css';

interface Props { posts: BlogPost[]; categories: string[]; }

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogListClient({ posts, categories }: Props) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');
    const listRef = useRef<HTMLUListElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    const filtered = useMemo(() => {
        let list = posts;
        if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        return list;
    }, [posts, activeCategory, search]);

    const featured = posts[0];

    /* ── GSAP 3D Card-Stack Entrance (header + cards fan out) ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');

            /* Header — drop in from above with rotateX */
            const header = headerRef.current;
            if (header) {
                const headerItems = header.querySelectorAll<HTMLElement>('[data-blog-header-item]');
                gsap.fromTo(headerItems,
                    { y: -50, rotateX: 30, opacity: 0, transformOrigin: 'top center' },
                    { y: 0, rotateX: 0, opacity: 1, duration: 1.0, ease: 'expo.out', stagger: 0.14 }
                );
            }

            /* Blog list rows — 3D card-stack fan out */
            const list = listRef.current;
            if (!list) return;

            const cards = list.querySelectorAll<HTMLElement>('li');
            gsap.fromTo(cards,
                {
                    z: -200,
                    rotateY: (i) => (i % 2 === 0 ? -18 : 18),
                    scale: 0.7,
                    opacity: 0,
                    transformOrigin: 'center center',
                },
                {
                    z: 0,
                    rotateY: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'expo.out',
                    stagger: { each: 0.1, from: 'start' },
                    delay: 0.3,
                }
            );
        };
        init();
    }, [filtered]);

    /* ── Mouse tilt on each row ── */
    const onMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        el.style.transform = `perspective(800px) rotateX(${-dy * 5}deg) rotateY(${dx * 8}deg) translateZ(10px)`;
    };
    const onMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    };

    return (
        <div className={styles.page} style={{ perspective: '1200px' }}>
            {/* ── Hero header ── */}
            <header className={styles.header} ref={headerRef}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLabel} data-blog-header-item>
                        <span className={styles.labelDot} />
                        Blog
                    </div>
                    <h1 className={styles.headerTitle} data-blog-header-item>
                        Thoughts &amp;<br />
                        <span className={styles.outline}>Writings.</span>
                    </h1>
                    <p className={styles.headerSub} data-blog-header-item>
                        Essays on web development, algorithms, machine learning, and the craft of building software.
                    </p>
                </div>
            </header>

            <div className={styles.wrap}>

                {/* ── Featured post ── */}
                <section className={styles.featuredSection} aria-label="Featured post">
                    <span className={styles.sectionMeta}>Featured</span>
                    <Link href={`/blog/${featured.slug}`} className={styles.featured}>
                        <div className={styles.featuredLeft}>
                            <div className={styles.featuredCat}>{featured.category}</div>
                            <h2 className={styles.featuredTitle}>{featured.title}</h2>
                            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                            <div className={styles.featuredFooter}>
                                <span className={styles.date}>{formatDate(featured.date)}</span>
                                <span className={styles.readTime}>{featured.readTime} min read</span>
                            </div>
                        </div>
                        <div className={styles.featuredArrow} aria-hidden="true">↗</div>
                    </Link>
                </section>

                {/* ── Filter + search row ── */}
                <div className={styles.filterRow}>
                    <div className={styles.cats} role="group" aria-label="Filter by category">
                        {['All', ...categories].map(c => (
                            <button
                                key={c}
                                className={`${styles.catBtn} ${activeCategory === c ? styles.catActive : ''}`}
                                onClick={() => setActiveCategory(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className={styles.searchWrap}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search posts…"
                            className={styles.search}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            aria-label="Search posts"
                        />
                    </div>
                </div>

                {/* ── Post list ── */}
                {filtered.length === 0 ? (
                    <div className={styles.empty}>No posts found for &ldquo;{search}&rdquo;</div>
                ) : (
                    <ul className={styles.list} ref={listRef} aria-label="Blog posts" style={{ perspective: '1000px' }}>
                        {filtered.map((post) => (
                            <li
                                key={post.slug}
                                className={styles.row}
                                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.22s ease' }}
                                onMouseMove={onMouseMove}
                                onMouseLeave={onMouseLeave}
                            >
                                <Link href={`/blog/${post.slug}`} className={styles.rowLink}>
                                    <span className={styles.rowNum}>{post.num}</span>
                                    <div className={styles.rowBody}>
                                        <div className={styles.rowMeta}>
                                            <span className={styles.rowCat}>{post.category}</span>
                                            {post.tags.slice(0, 2).map(t => (
                                                <span key={t} className={styles.tag}>{t}</span>
                                            ))}
                                        </div>
                                        <h3 className={styles.rowTitle}>{post.title}</h3>
                                        <p className={styles.rowExcerpt}>{post.excerpt}</p>
                                    </div>
                                    <div className={styles.rowRight}>
                                        <time className={styles.date} dateTime={post.date}>{formatDate(post.date)}</time>
                                        <span className={styles.readTime}>{post.readTime} min</span>
                                        <span className={styles.viewHint}>Read →</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div className={styles.count}>
                    {filtered.length} post{filtered.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    );
}
