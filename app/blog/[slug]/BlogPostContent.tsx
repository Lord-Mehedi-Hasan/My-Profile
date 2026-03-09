'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { type BlogPost } from '@/data/blog';
import styles from './post.module.css';

interface Props {
    post: BlogPost;
    prev: BlogPost | null;
    next: BlogPost | null;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Very simple content renderer — handles **bold**, paragraphs, code blocks */
function renderContent(content: string) {
    const paragraphs = content.split('\n\n').filter(Boolean);
    return paragraphs.map((para, i) => {
        // Code block
        if (para.startsWith('```')) {
            const lines = para.split('\n');
            const code = lines.slice(1, -1).join('\n');
            return (
                <pre key={i} className={styles.codeBlock}>
                    <code>{code}</code>
                </pre>
            );
        }
        // Heading (starts with **)
        if (para.startsWith('**') && para.endsWith('**') && !para.slice(2, -2).includes('**')) {
            return <h3 key={i} className={styles.h3}>{para.slice(2, -2)}</h3>;
        }
        // Regular paragraph with possible **bold** inline
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
            <p key={i} className={styles.para}>
                {parts.map((part, j) =>
                    part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j}>{part.slice(2, -2)}</strong>
                        : <span key={j}>{part}</span>
                )}
            </p>
        );
    });
}

export default function BlogPostContent({ post, prev, next }: Props) {
    const headerRef = useRef<HTMLElement>(null);
    const bodyRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const header = headerRef.current;
            const body = bodyRef.current;
            if (!header || !body) return;
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
            tl.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
                .fromTo(body, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4');
        };
        init();
    }, []);

    return (
        <div className={styles.page}>
            {/* Back nav */}
            <div className={styles.backRow}>
                <Link href="/blog" className={styles.back}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    All posts
                </Link>
            </div>

            {/* Header */}
            <header ref={headerRef} className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.cat}>{post.category}</span>
                    <time className={styles.date} dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className={styles.readTime}>{post.readTime} min read</span>
                </div>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.tags}>
                    {post.tags.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                    ))}
                </div>
            </header>

            <div className={styles.divider} />

            {/* Article body */}
            <article ref={bodyRef} className={styles.article}>
                {renderContent(post.content)}
            </article>

            <div className={styles.divider} />

            {/* Prev / Next */}
            <nav className={styles.pager} aria-label="Post navigation">
                {prev ? (
                    <Link href={`/blog/${prev.slug}`} className={styles.pagerItem}>
                        <span className={styles.pagerDir}>← Previous</span>
                        <span className={styles.pagerName}>{prev.title}</span>
                    </Link>
                ) : <div />}
                {next ? (
                    <Link href={`/blog/${next.slug}`} className={`${styles.pagerItem} ${styles.pagerRight}`}>
                        <span className={styles.pagerDir}>Next →</span>
                        <span className={styles.pagerName}>{next.title}</span>
                    </Link>
                ) : <div />}
            </nav>
        </div>
    );
}
