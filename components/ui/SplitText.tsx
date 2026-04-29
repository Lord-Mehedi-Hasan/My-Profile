'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

/**
 * Splits text into individual words, each sliding up from y:100%
 * when the element enters the viewport.
 */
export default function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
    const words = text.split(' ');

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em', verticalAlign: 'bottom' }}
                >
                    <motion.span
                        initial={{ y: '105%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.75,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * 0.055,
                        }}
                        style={{ display: 'inline-block' }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
