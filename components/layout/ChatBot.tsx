'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ChatBot.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    ts: string;
}

const WELCOME: Message = {
    role: 'assistant',
    content: "Hi! 👋 I'm Mehedi's AI assistant. Ask me anything about his skills, projects, research, or how to get in touch!",
    ts: now(),
};

const SUGGESTIONS = [
    'What are his skills?',
    'Tell me about his projects',
    'Any research papers?',
    'How to contact him?',
];

function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDot, setShowDot] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    /* Auto-scroll */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    /* Focus input when opened */
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
        setShowDot(false);
    }, [open]);

    const send = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        const userMsg: Message = { role: 'user', content: trimmed, ts: now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Exclude the hardcoded WELCOME message — Gemini requires the
                    // first turn to be 'user'. Sending a leading 'assistant' turn
                    // causes Gemini to reject the request entirely.
                    messages: [...messages, userMsg]
                        .filter(m => m.content !== WELCOME.content)
                        .map(m => ({ role: m.role, content: m.content })),
                }),
            });
            const data = await res.json();
            const reply = data.reply ?? "Sorry, I couldn't get a response. Please try again.";
            setMessages(prev => [...prev, { role: 'assistant', content: reply, ts: now() }]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: "Network error — please check your connection and try again.", ts: now() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(input);
        }
    };

    const clearChat = () => setMessages([WELCOME]);

    return (
        <div className={styles.root}>
            {/* Chat panel */}
            <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`} role="dialog" aria-label="AI Chat Assistant">

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.avatar}>MH</div>
                        <div>
                            <div className={styles.headerName}>Mehedi&apos;s AI</div>
                            <div className={styles.headerStatus}>
                                <span className={styles.onlineDot} />
                                Online
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.iconBtn} onClick={clearChat} title="Clear chat" aria-label="Clear chat">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                        </button>
                        <button className={styles.iconBtn} onClick={() => setOpen(false)} title="Close" aria-label="Close chat">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className={styles.messages}>
                    {/* Suggestion chips — only show when just welcome message */}
                    {messages.length === 1 && (
                        <div className={styles.suggestions}>
                            {SUGGESTIONS.map(s => (
                                <button key={s} className={styles.chip} onClick={() => send(s)}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div key={i} className={`${styles.msgRow} ${m.role === 'user' ? styles.msgRowUser : styles.msgRowAI}`}>
                            {m.role === 'assistant' && (
                                <div className={styles.aiAvatar}>AI</div>
                            )}
                            <div className={styles.msgWrap}>
                                <div className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleAI}`}>
                                    {m.content}
                                </div>
                                <span className={styles.ts}>{m.ts}</span>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div className={`${styles.msgRow} ${styles.msgRowAI}`}>
                            <div className={styles.aiAvatar}>AI</div>
                            <div className={styles.msgWrap}>
                                <div className={`${styles.bubble} ${styles.bubbleAI} ${styles.typingBubble}`}>
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                    <span className={styles.dot} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className={styles.inputRow}>
                    <textarea
                        ref={inputRef}
                        className={styles.input}
                        placeholder="Ask me anything…"
                        value={input}
                        rows={1}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        disabled={loading}
                        aria-label="Chat input"
                    />
                    <button
                        className={styles.sendBtn}
                        onClick={() => send(input)}
                        disabled={loading || !input.trim()}
                        aria-label="Send message"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* FAB toggle button */}
            <button
                className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle AI chat"
                aria-expanded={open}
            >
                {showDot && <span className={styles.notifDot} aria-hidden="true" />}
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        <path d="M8 10h.01M12 10h.01M16 10h.01" />
                    </svg>
                )}
            </button>
        </div>
    );
}
