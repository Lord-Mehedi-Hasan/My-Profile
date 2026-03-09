import { NextRequest, NextResponse } from 'next/server';

const GEMINI_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const SYSTEM_PROMPT = `You are a concise AI assistant for Mehedi Hasan's portfolio. Answer visitor questions warmly and accurately using only this info:

Mehedi Hasan — CSE graduate, AIUB (2021-2025), Mirpur, Dhaka, Bangladesh.
Email: mh2822299@gmail.com | GitHub: github.com/Lord-Mehedi-Hasan | LinkedIn: linkedin.com/in/mehedi-hasan-50b2ba2b2/
Roles: Full-Stack Developer, Competitive Programmer (ICPC 4×, NCPC 2×), ML Researcher.
Languages: C++, Python, Java, JavaScript, TypeScript, PHP, C#.
Frameworks: Next.js, React, Node.js, NestJS, ASP.NET, Angular.
DBs: PostgreSQL, MySQL, Oracle. Tools: Git, Docker, Azure, Figma.
Projects: 7+ shipped — portfolio site (Next.js+Three.js+GSAP), full-stack apps (Next.js+NestJS+PG), desktop apps (ASP.NET+C#), ML research (Python).
Research papers: Alzheimer's, CHD, Stroke prediction, NLP sentiment analysis — all healthcare AI.
Services: Frontend dev, Backend/API, Algorithm consulting, ML research, Full-stack apps, Tech consulting.
Current focus: Azure DevOps, Generative AI, Angular. Open to full-time/freelance/research.
If unsure, say so and suggest emailing mh2822299@gmail.com. Keep replies to 2–4 sentences max (use bullets for lists).`;

export async function POST(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    let body: { messages?: { role: string; content: string }[] };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { messages = [] } = body;

    // Gemini requires conversations to start with a 'user' turn.
    // Strip any leading 'assistant'/'model' messages (e.g. hardcoded welcome).
    const rawContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));
    // Drop leading model turns
    let startIdx = 0;
    while (startIdx < rawContents.length && rawContents[startIdx].role === 'model') {
        startIdx++;
    }
    const contents = rawContents.slice(startIdx);

    if (contents.length === 0) {
        return NextResponse.json({ error: 'No user message provided' }, { status: 400 });
    }

    const payload = {
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
            topP: 0.9,
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
    };

    try {
        const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Gemini API error:', err);
            return NextResponse.json({ error: 'AI service error' }, { status: 502 });
        }

        const data = await res.json();
        const text: string =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "I'm sorry, I couldn't generate a response. Please try again.";

        return NextResponse.json({ reply: text });
    } catch (err) {
        console.error('Chat route error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
