'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';

const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), { ssr: false });
// Background3D removed — was running a full Three.js RAF loop (18 shapes + scroll + mouse tracking)
// simultaneously with HeroCanvas, Lenis, and FloatingShape causing frame drops.
// Background handled by CSS gradients in globals.css instead.
const ChatBot = dynamic(() => import('@/components/layout/ChatBot'), { ssr: false });
const Loader = dynamic(() => import('@/components/ui/Loader'), { ssr: false });

export default function GlobalShell({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        let lenisInstance: import('lenis').default | null = null;
        let raf: number;
        let destroyed = false;

        import('lenis').then(({ default: Lenis }) => {
            if (destroyed) return;
            lenisInstance = new Lenis({
                duration: 1.4,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                lerp: 0.1,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            // Expose lenis on window so other components can hook into it
            (window as Window & { __lenis?: typeof lenisInstance }).lenis = lenisInstance;

            const loop = (time: number) => {
                lenisInstance?.raf(time);
                raf = requestAnimationFrame(loop);
            };
            raf = requestAnimationFrame(loop);
        });

        return () => {
            destroyed = true;
            cancelAnimationFrame(raf);
            lenisInstance?.destroy();
        };
    }, []);

    return (
        <>
            {/* Cinematic intro loader */}
            <Loader />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
            {/* AI Chatbot floating overlay */}
            <ChatBot />
        </>
    );
}
