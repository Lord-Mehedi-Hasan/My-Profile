'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';

const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), { ssr: false });
const Background3D = dynamic(() => import('@/components/layout/Background3D'), { ssr: false });
const ChatBot = dynamic(() => import('@/components/layout/ChatBot'), { ssr: false });

export default function GlobalShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Global fixed 3D background — sits beneath everything */}
            <Background3D />
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
