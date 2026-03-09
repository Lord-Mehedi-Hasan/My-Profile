'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const anchorLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#research', label: 'Research' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 40);
            if (!isHome) return;
            anchorLinks.forEach(({ href }) => {
                const el = document.getElementById(href.slice(1));
                if (el) {
                    const r = el.getBoundingClientRect();
                    if (r.top <= 120 && r.bottom >= 120) setActive(href.slice(1));
                }
            });
        };
        window.addEventListener('scroll', fn, { passive: true });
        fn();
        return () => window.removeEventListener('scroll', fn);
    }, [isHome]);

    const go = (href: string) => {
        setOpen(false);
        if (isHome) {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/' + href; // navigate home then scroll
        }
    };

    const isBlogActive = pathname.startsWith('/blog');

    return (
        <>
            <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
                <div className={styles.inner}>
                    {/* Logo */}
                    <Link
                        href="/"
                        className={styles.logo}
                        aria-label="Home"
                    >
                        MH<span className={styles.logoDot}>.</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className={styles.links} role="list">
                        {anchorLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={isHome ? href : `/${href}`}
                                    className={`${styles.link} ${!isBlogActive && active === href.slice(1) ? styles.active : ''}`}
                                    onClick={e => { e.preventDefault(); go(href); }}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                        {/* Blog — real page link */}
                        <li>
                            <Link
                                href="/blog"
                                className={`${styles.link} ${isBlogActive ? styles.active : ''}`}
                                onClick={() => setOpen(false)}
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>

                    {/* Hamburger */}
                    <button
                        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
                        onClick={() => setOpen(o => !o)}
                        aria-expanded={open}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} role="dialog" aria-label="Mobile menu">
                {anchorLinks.map(({ href, label }, i) => (
                    <a
                        key={href}
                        href={isHome ? href : `/${href}`}
                        className={`${styles.drawerLink} ${!isBlogActive && active === href.slice(1) ? styles.drawerActive : ''}`}
                        onClick={e => { e.preventDefault(); go(href); }}
                    >
                        <span className={styles.drawerNum}>0{i + 1}</span>
                        {label}
                    </a>
                ))}
                <Link
                    href="/blog"
                    className={`${styles.drawerLink} ${isBlogActive ? styles.drawerActive : ''}`}
                    onClick={() => setOpen(false)}
                >
                    <span className={styles.drawerNum}>08</span>
                    Blog
                </Link>
            </div>
            {open && <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />}
        </>
    );
}
