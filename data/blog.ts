export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // full markdown-like content
    category: string;
    tags: string[];
    date: string;       // ISO date string
    readTime: number;   // minutes
    num: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'why-nextjs-is-the-future-of-web-dev',
        num: '01',
        title: 'Why Next.js Is the Future of Web Development',
        excerpt: 'From SSR to the App Router, Next.js has become the gold standard for building production-grade React apps. Here\'s why I swear by it.',
        category: 'Web Dev',
        tags: ['Next.js', 'React', 'TypeScript'],
        date: '2026-02-18',
        readTime: 6,
        content: `Next.js 13+ introduced the App Router — a paradigm shift that changes how we think about routing, data fetching, and server-side rendering.

**Why it matters**

Server Components allow you to fetch data at the component level without prop drilling. You write async functions that run on the server, and Next.js handles hydration automatically. This means smaller JavaScript bundles, faster time-to-interactive, and dramatically improved SEO.

**The App Router vs Pages Router**

The old Pages Router required \`getServerSideProps\` or \`getStaticProps\` at the page level. The App Router moves data fetching to any component in the tree. This is a massive DX improvement.

**What I use Next.js for**

Literally everything now. Portfolio, dashboards, e-commerce backends, research tools — if it needs a web interface, it's Next.js. The ecosystem of server actions, streaming, and edge functions makes it the most complete framework available today.

**Verdict**

If you're building anything serious with React in 2025, you should be on Next.js. The learning curve is real, but the payoff is enormous.`,
    },
    {
        slug: 'competitive-programming-changed-how-i-code',
        num: '02',
        title: 'How Competitive Programming Changed How I Write Code',
        excerpt: 'Four ICPC regionals and hundreds of problems later — here\'s what I actually learned about writing better software.',
        category: 'Algorithms',
        tags: ['ICPC', 'Algorithms', 'C++'],
        date: '2026-02-10',
        readTime: 8,
        content: `I started competitive programming in my second year of university. At the time, I thought it was just a way to win prizes. I was wrong — it was the best training ground for analytical thinking I've ever encountered.

**Speed of thought**

CP forces you to convert a vague problem statement into a precise algorithm within minutes. That skill transfers directly to real-world problem decomposition. Before writing any code in my day job, I now instinctively break tasks into smaller subproblems.

**Debugging under pressure**

In ICPC, you have limited time and limited submissions. You cannot afford to debug blindly. You learn to trace your logic systematically, identify edge cases before they hit, and write code that's easy to verify.

**Data structures are everything**

Segment trees, BIT, disjoint sets — CP forces you to understand these deeply. Knowing when to reach for a Fenwick tree vs a sorted set vs a hash map has made me a better engineer in backend system design.

**The social layer**

Competing as a team teaches you to communicate technical ideas fast. "I think this is an O(n log n) problem with a sweep line" is a full sentence. You learn the vocabulary.

**Was it worth it?**

Absolutely. The mindset — not the medals — is what I carry forward.`,
    },
    {
        slug: 'machine-learning-in-healthcare',
        num: '03',
        title: 'Machine Learning in Healthcare: What I Learned Publishing Research',
        excerpt: 'My journey publishing papers on Alzheimer\'s detection, stroke prediction, and CHD — and what surprised me most along the way.',
        category: 'Research',
        tags: ['ML', 'Healthcare', 'Python'],
        date: '2026-01-28',
        readTime: 10,
        content: `Healthcare AI is both one of the most exciting and most humbling fields to work in. The stakes are real, the data is messy, and the interpretability requirements are brutal.

**Why healthcare?**

I've always been interested in applied ML — not AI for its own sake, but AI that solves a concrete human problem. Healthcare is the ultimate domain: if your model performs better, people live longer.

**The data problem**

Real clinical datasets are small, imbalanced, and full of missing values. My Alzheimer's work used an OASIS dataset with ~373 samples. You cannot just throw a neural net at this. Feature engineering, SMOTE oversampling, and careful cross-validation become critical.

**What actually worked**

Ensemble methods (XGBoost, Random Forest, Gradient Boosting) consistently outperformed deep learning on tabular medical data at these sample sizes. Simpler, more interpretable models won.

**Explainability is non-negotiable**

Doctors don't use black boxes. Every model I published came with SHAP values, feature importance charts, and clinical interpretation. The accuracy metric is the last thing reviewers care about — the first is "why did it predict this?"

**Publishing experience**

The review process is slow (months), sometimes brutal, and occasionally illuminating. Reviewers will catch assumptions you sailed past. It's genuinely educational.`,
    },
    {
        slug: 'nestjs-vs-express-which-one-to-use',
        num: '04',
        title: 'NestJS vs Express: Which Should You Actually Use?',
        excerpt: 'I\'ve shipped production apps with both. Here\'s an honest breakdown of when to use each, and when the choice doesn\'t matter.',
        category: 'Backend',
        tags: ['NestJS', 'Node.js', 'TypeScript'],
        date: '2026-01-15',
        readTime: 7,
        content: `Express is the OG Node.js framework. NestJS is a newer, opinionated framework built on top of it. I've used both in production, and the answer to "which one?" is more nuanced than most posts admit.

**Express: the good**

Minimal, fast, flexible. If you know what you're doing, you can ship an API in hours. The ecosystem is enormous. If you need a small service or a prototype, Express is still my first choice.

**Express: the bad**

No opinions means no guard rails. Large Express codebases drift toward chaos. You end up reinventing middleware patterns, validation layers, and dependency injection — badly.

**NestJS: the good**

Opinionated structure that scales. Controllers, services, modules, DTOs — every concept has a place. The built-in dependency injection container is excellent. TypeScript support is first-class. Testing is dramatically easier.

**NestJS: the bad**

The magic. Decorators everywhere. The learning curve is steep if you're not familiar with Angular-style architecture. Overhead for small services.

**My rule of thumb**

- Simple CRUD API or microservice? Express.
- Complex domain with many entities, relationship, and business logic? NestJS.
- Team of 3+ engineers? NestJS, always — consistency beats flexibility.`,
    },
    {
        slug: 'css-tricks-that-still-surprise-me',
        num: '05',
        title: 'CSS Tricks That Still Surprise Me in 2025',
        excerpt: 'After years of writing CSS, some properties still catch me off guard in the best way. A quick tour of my favorites.',
        category: 'CSS',
        tags: ['CSS', 'Web Dev', 'Frontend'],
        date: '2026-01-05',
        readTime: 5,
        content: `CSS is vast. You never know all of it. Here are the properties and techniques that I still reach for and say "wait, this just works?"

**clip-path**

The most powerful visual tool in CSS. You can create any polygon, circle, or ellipse shape without a single image. Combined with CSS transitions, you get budget animation effects for free. I use it heavily for section reveal animations.

**mix-blend-mode: difference**

Take two overlapping elements and invert their color intersection. It's used in design tools all the time. I use it for custom cursors — a red dot over dark text becomes white and vice versa, automatically.

**mask-image with radial gradients**

You can mask any element so it fades out at the edges using a CSS radial gradient. My 3D sphere is faded at the edges this way — no post-processing library needed.

**container queries**

The future of responsive design. Instead of responding to the viewport width, a component responds to its own container width. The shift from "layout responsive" to "component responsive" is fundamental.

**CSS custom properties in animations**

Registering a custom property with \`@property\` allows you to animate it — including non-numeric values like colors and gradients. Wild and underused.`,
    },
    {
        slug: 'my-competitive-programming-setup',
        num: '06',
        title: 'My Competitive Programming Setup (2025 Edition)',
        excerpt: 'My editor config, template, tools, and mindset going into ICPC — everything I\'ve refined over four regional seasons.',
        category: 'Algorithms',
        tags: ['ICPC', 'C++', 'Tools'],
        date: '2025-12-20',
        readTime: 6,
        content: `People always ask what setup I use for competitive programming. Here it is — refined over four ICPC regionals.

**Editor**

VS Code with the C++ extension, vim motions (VSCodeVim), and a dark theme. Some people use CLion; I find VS Code faster to set up on contest machines.

**Template**

I have a 80-line C++ template that includes fast I/O (\`ios_base::sync_with_stdio(false); cin.tie(NULL)\`), common type aliases (\`ll\`, \`pii\`, \`vi\`), and macros (\`forr\`, \`all\`, \`pb\`, \`sz\`). Writing boilerplate burns precious time.

**Problem approach**

1. Read the full problem twice
2. Identify constraints — what's N? What's the time limit?
3. Sketch a brute force mentally
4. Identify the bottleneck and optimize
5. Code clean, test edge cases, submit

**Online judges I practice on**

Codeforces is the gold standard. LeetCode for interview-style problems. CSES Problem Set for algorithm fundamentals. AtCoder for clean, elegant problem design.

**Mindset**

Don't panic at A. Don't tunnel on one problem. Communicate constantly with your team. And remember — wrong answers don't cost time if you think before you submit.`,
    },
    {
        slug: 'building-dark-brutalist-portfolio',
        num: '07',
        title: 'Building a Dark Brutalist Portfolio with Next.js and Three.js',
        excerpt: 'A walkthrough of how I rebuilt my portfolio in the lml.cc editorial style — from design tokens to the GLSL shader sphere.',
        category: 'Web Dev',
        tags: ['Three.js', 'GLSL', 'Next.js', 'Design'],
        date: '2025-12-10',
        readTime: 12,
        content: `I recently rebuilt my portfolio from scratch, inspired by the brutalist editorial aesthetic of lml.cc. Here's how it all came together.

**Design decisions first**

The design language is ruthlessly minimal: pure black background, white text with three opacity levels, and a single accent color (red #C51110). No gradients, no decorative borders, no shadows — negative space does all the heavy lifting.

**Typography as structure**

DM Sans for headings (900 weight, -0.04em tracking), Space Grotesk for body, Fira Code for labels. The hero section's giant "MEHEDI HASAN" text is 13rem at large viewports — the typography IS the hero graphic.

**The Three.js sphere**

I wrote a custom GLSL vertex/fragment shader using Simplex noise for organic surface displacement. The sphere morphs continuously as a function of time and mouse position. Red rim lighting using the 'dot(normal, viewDir)' function gives it a metallic feel without any PBR textures.

**GSAP ScrollTrigger choreography**

As you scroll, the hero elements (name, aside, sphere) animate out using different speeds — the name fades faster than the sphere, creating a parallax depth effect.

**Performance**

Everything is SSR where possible. The Three.js component is dynamically imported with \`ssr: false\`. Fonts are loaded via next/font. The result: perfect Lighthouse performance scores.`,
    },
    {
        slug: 'postgresql-vs-mysql-for-web-apps',
        num: '08',
        title: 'PostgreSQL vs MySQL: Which Should You Use for Web Apps?',
        excerpt: 'I\'ve shipped production systems on both. Here\'s my honest take on which database wins, and in what contexts.',
        category: 'Backend',
        tags: ['PostgreSQL', 'MySQL', 'Databases'],
        date: '2025-11-28',
        readTime: 7,
        content: `Database wars never end. PostgreSQL vs MySQL is fought in every tech meeting. Here's my take after shipping production systems on both.

**PostgreSQL wins on features**

Full ACID compliance, JSONB support, window functions, CTEs, partial indexes, table inheritance, custom types, and the best full-text search implementation in the RDBMS world. If you need to do anything out of the ordinary, Postgres handles it.

**MySQL wins on simplicity and ecosystem**

MySQL's replication model is battle-tested. The tooling (MySQL Workbench, AWS RDS support, managed backups) is mature. For LAMP-stack apps and WordPress-style workloads, MySQL is easier to spin up and scale.

**Real differences at scale**

Postgres's MVCC (multiversion concurrency control) handles concurrent writes better. MySQL's MyISAM vs InnoDB confusion is mostly gone now. At Facebook-scale, neither is used without heavy customization anyway.

**What I personally use**

PostgreSQL for everything new. The JSONB column type alone saves me from needing MongoDB half the time. Prisma ORM integrates cleanly with it.

**The real answer**

Use whatever your team knows best and your cloud provider supports cheaply. The ORM abstracts most differences anyway.`,
    },
    {
        slug: 'gsap-scrolltrigger-practical-guide',
        num: '09',
        title: 'GSAP ScrollTrigger: A Practical Guide for Website Motion',
        excerpt: 'ScrollTrigger is the most powerful scroll animation library available. Here\'s everything I know about using it properly.',
        category: 'Animation',
        tags: ['GSAP', 'Animation', 'JavaScript'],
        date: '2025-11-15',
        readTime: 9,
        content: `ScrollTrigger by GreenSock is the gold standard for scroll-based animations. I use it on almost every project that needs motion tied to scroll position.

**The basics**

\`\`\`js
gsap.from('.element', {
    opacity: 0,
    y: 60,
    scrollTrigger: {
        trigger: '.element',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    }
});
\`\`\`

\`start: 'top 80%'\` means "when the top of the element reaches 80% down the viewport." \`toggleActions\` controls what happens on enter, leave, re-enter, and re-leave.

**Scrub: the key to cinematic animation**

\`scrub: 1.2\` ties the animation directly to scroll position. The number is a smoothing factor — higher is smoother. This is what gives the "hero parallax" feel: elements animate in direct proportion to how far you've scrolled.

**Pinning**

\`pin: true\` fixes an element in place while the rest of the page scrolls. Classic sticky section effect. Add \`pinSpacing: false\` if you don't want to push other sections down.

**Batch for lists**

\`ScrollTrigger.batch('.row', {...})\` applies animations to multiple elements in a staggered, viewport-aware way. Perfect for project lists and blog feeds.

**Performance gotcha**

Never animate CSS properties that cause layout reflow (\`width\`, \`height\`, \`top\`, \`left\`). Only animate \`transform\` and \`opacity\`. This is the difference between 60fps and frame drops.`,
    },
    {
        slug: 'typescript-tips-i-wish-i-knew-earlier',
        num: '10',
        title: 'TypeScript Tips I Wish I Knew Earlier',
        excerpt: 'After 3 years of TypeScript in production, these are the patterns and utilities that changed how I write code.',
        category: 'TypeScript',
        tags: ['TypeScript', 'JavaScript', 'Web Dev'],
        date: '2025-10-30',
        readTime: 8,
        content: `TypeScript is table stakes for serious JavaScript development. But there's a difference between using TypeScript and using it well. Here are the patterns I wish I'd learned sooner.

**Discriminated unions over optionals**

Instead of \`{ type: string; value?: number; label?: string }\`, use discriminated unions:

\`\`\`ts
type State =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; data: User[] };
\`\`\`

The compiler now knows exactly which properties are available in each branch.

**Template literal types**

\`\`\`ts
type EventName = \`on\${Capitalize<string>}\`;
\`\`\`

This lets you type dynamic string patterns. Used extensively in design system prop APIs.

**Infer**

\`infer\` inside conditional types lets you extract type information:

\`\`\`ts
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
\`\`\`

**Satisfies vs as**

\`as\` is a lie — it silences the compiler. \`satisfies\` validates the type without widening it. Use \`satisfies\` when you want autocomplete without losing the specific type.

**const assertions**

\`as const\` converts mutable values to their literal type. Essential for discriminated unions derived from runtime values.`,
    },
    {
        slug: 'understanding-recursion-and-dp',
        num: '11',
        title: 'Understanding Recursion and Dynamic Programming (The Right Way)',
        excerpt: 'Most DP explanations start with Fibonacci. That\'s not where it begins. Here\'s how I actually think about recursive state machines.',
        category: 'Algorithms',
        tags: ['Algorithms', 'DP', 'C++'],
        date: '2025-10-15',
        readTime: 11,
        content: `Dynamic programming is consistently the hardest topic for beginners. Every tutorial starts with Fibonacci. That's the wrong entry point.

**What DP actually is**

DP is memoized recursion. Nothing more. You have a recursive function that recomputes the same subproblems repeatedly. DP says: cache the answers to subproblems so you compute each one only once.

**Start with the state**

Before writing any code, answer: "What is the minimum information I need to fully describe where I am in the problem?" That's your state.

For 0/1 knapsack: state = (item index, remaining capacity). For longest common subsequence: state = (i, j) = position in each string.

**Enumerate transitions**

From each state, what choices can I make? Each choice leads to a new state. The DP value of a state is the optimal choice across all transitions.

**Tabulation vs memoization**

Memoization (top-down): write the recursion naturally, add a cache. Cleaner to write.
Tabulation (bottom-up): fill a 2D array in order of dependency. Faster in practice due to no recursion overhead.

**Practice path**

Start with CSES Problem Set's DP section. Then Codeforces Div 2 C/D problems. Then Atcoder Educational DP Contest — 26 problems that cover every DP archetype.`,
    },
    {
        slug: 'design-for-developers',
        num: '12',
        title: 'Design for Developers: What I Wish Someone Had Told Me',
        excerpt: 'You don\'t need to be a designer to ship beautiful software. Here are the design principles that actually matter for developers.',
        category: 'Design',
        tags: ['Design', 'CSS', 'UI/UX'],
        date: '2025-10-01',
        readTime: 7,
        content: `I'm not a designer. I've never taken a design course. But I've shipped multiple UIs that people have called beautiful. Here's what I've learned.

**Spacing is everything**

Most developer-made UIs look bad because of inconsistent spacing, not bad colors or fonts. Pick a base unit (8px) and use only its multiples. 8, 16, 24, 32, 48, 64. Everything aligns, everything breathes.

**Fewer colors, more hierarchy**

A design with 7 colors looks amateur. A design with 2-3 colors with opacity variations looks premium. White at 100%, 55%, 30% opacity on a black background creates instant hierarchy.

**Typography does the heavy lifting**

Bold + large typeface = visual anchor. You don't need decorative elements if your typography is confident. Look at any editorial magazine — the design IS the typography.

**Negative space is not empty**

Whitespace tells the eye where to look. The most effective way to make content feel more prestigious is to give it more space.

**One strong accent color**

Pick one accent and use it sparingly — only for the most important interactive elements and highlights. Overusing the accent kills the impact. My portfolio uses red (#C51110) for approximately 5% of visual weight.

**Steal from the best**

Go to Awwwards, Behance, Dribbble. Screenshot what you love. Understand why it works. Apply the principles.`,
    },
    {
        slug: 'git-workflow-for-solo-developers',
        num: '13',
        title: 'Git Workflow That Actually Works for Solo Developers',
        excerpt: 'Most Git tutorials assume a team. Here\'s the workflow I\'ve settled on for solo projects that keeps history clean and rollbacks painless.',
        category: 'Tools',
        tags: ['Git', 'Workflow', 'Tools'],
        date: '2025-09-18',
        readTime: 5,
        content: `Git for solo development is both simpler and more personal than team Git. Here's what I've settled on.

**Commit structure**

I use Conventional Commits: \`feat:\`, \`fix:\`, \`refactor:\`, \`style:\`, \`chore:\`. This makes changelogs readable and git history searchable.

**Branch strategy**

For solo work: \`main\` (always stable), \`dev\` (working branch), feature branches off \`dev\`. When a feature is done, squash-merge into \`dev\`. When \`dev\` is stable and tested, merge into \`main\`.

**Daily workflow**

1. \`git pull\` on \`dev\`
2. Create feature branch: \`git checkout -b feat/thing\`
3. Work in small commits
4. At end of session: push branch, optionally open a draft PR to yourself for documentation
5. Squash merge when done

**The power of git stash**

I use \`git stash\` constantly to temporarily shelve changes when I need to switch context. \`git stash pop\` brings them back. Name stashes with \`git stash push -m "description"\`.

**gitignore matters**

\`.DS_Store\`, \`node_modules\`, \`.env\` — these should never appear in a repo. Use a global gitignore for OS files.

**When things go wrong**

\`git reflog\` is your nuclear option. Every action (even resets) is logged. You can recover almost anything.`,
    },
    {
        slug: 'csharp-vs-java-for-backend',
        num: '14',
        title: 'C# vs Java for Backend Development: My Honest Take',
        excerpt: 'I\'ve shipped desktop apps in C# and university projects in Java. Here\'s how they actually compare for server-side work.',
        category: 'Backend',
        tags: ['C#', 'Java', '.NET'],
        date: '2025-09-05',
        readTime: 7,
        content: `The C# vs Java debate is older than both of us on the internet. Having used both seriously, here's my honest take.

**Language ergonomics: C# wins**

Modern C# (10, 11, 12) is a remarkably expressive language. Pattern matching, records, required properties, primary constructors, collection expressions — C# moves fast and the features are well-designed. Java is catching up (records, sealed classes, pattern matching in switch) but C# is still ahead.

**Ecosystem**

Java has Maven Central with millions of packages. C# has NuGet, which is excellent. For web: Spring Boot (Java) vs ASP.NET Core (C#). Both are enterprise-grade, but ASP.NET Minimal APIs have a DX advantage for simple services.

**Cross-platform**

.NET Core solved the Windows-lock-in problem. Both run on Linux, both containerize fine, both support ARM. This used to be C#'s weakness — it no longer is.

**Tooling**

Rider (JetBrains) works brilliantly for both. Visual Studio is unmatched for Windows C# development. IntelliJ IDEA for Java. VS Code works adequately for both.

**Performance**

Both are JIT-compiled and similar in throughput for most workloads. Benchmarks favor C# slightly in raw HTTP throughput with ASP.NET Core minimal API.

**My honest recommendation**

If you're starting fresh, C# + ASP.NET Core. If you're joining an existing Java team, Spring Boot is totally viable and battle-tested. Don't switch ecosystems for ideology.`,
    },
    {
        slug: 'building-restful-apis-that-dont-suck',
        num: '15',
        title: 'Building RESTful APIs That Don\'t Suck',
        excerpt: 'Most tutorials show you how to build an API. Few show you how to design one that\'s intuitive, maintainable, and actually RESTful.',
        category: 'Backend',
        tags: ['REST', 'API Design', 'Backend'],
        date: '2025-08-22',
        readTime: 8,
        content: `REST APIs are everywhere. Most of them are poorly designed. Here's what I've learned after building and consuming hundreds of them.

**Nouns, not verbs**

\`/getUsers\` is wrong. \`GET /users\` is correct. The HTTP verb IS the action. The resource name should be a noun.

**Consistent pluralization**

Pick a convention and stick to it. I use plural nouns: \`/users\`, \`/projects\`, \`/posts\`. Singular for singletons: \`/me\`, \`/settings\`.

**Status codes actually matter**

- \`200\` — success
- \`201\` — resource created
- \`204\` — success, no content (for DELETE)
- \`400\` — client's fault (validation error)
- \`401\` — not authenticated
- \`403\` — authenticated but not authorized
- \`404\` — not found
- \`409\` — conflict (e.g., duplicate email)
- \`500\` — server's fault

Using \`200\` for everything with a custom error code in the body is not REST — it's RPC with a REST costume.

**Versioning**

\`/api/v1/users\` — always version your public API. Never break clients.

**Error responses**

Always return structured error objects: \`{ "error": "validation_error", "message": "Email already exists", "field": "email" }\`.

**Pagination**

Cursor-based pagination for large datasets (\`cursor: "abc123"\`). Offset pagination for small datasets. Always return total count.`,
    },
    {
        slug: 'python-vs-cpp-in-competitive-programming',
        num: '16',
        title: 'Python vs C++ in Competitive Programming: The Honest Answer',
        excerpt: 'Python is beautiful and expressive. But for ICPC? There\'s really only one answer.',
        category: 'Algorithms',
        tags: ['Python', 'C++', 'ICPC'],
        date: '2025-08-10',
        readTime: 5,
        content: `The question comes up in every CP community: Python or C++? Let me give you the honest answer.

**Speed**

C++ is ~50x faster than Python. At N=10^8 operations, C++ runs in under a second. Python doesn't finish. This is not opinion — it's physics. CPython is interpreted; C++ compiles to native machine code.

**Time limits in competitive programming**

Most online judges set 1-2 second time limits calibrated for C++. Python solutions are sometimes given 3x the time, but this doesn't cover the speed gap.

**What this means practically**

For problems where O(n) or O(n log n) with N ≤ 10^5, Python is often fine. For anything involving O(n^2) with N ≤ 10^4 or graph problems at scale, C++ is required.

**Where Python wins**

Mathematical problems, string processing, simulation with small N, constructive problems where the answer is computed directly. Also: Python's default integer is arbitrary precision — no overflow bugs.

**My approach**

I think in algorithms using any language, then implement in C++ for ICPC. I use Python for ML/research, scripting, and data processing.

**The verdict**

For ICPC at regional and above: C++. No contest. For Leetcode medium-hards where the interviewer doesn't care about language: Python's readability wins.`,
    },
    {
        slug: 'how-to-read-research-papers',
        num: '17',
        title: 'How to Read Research Papers (Without Losing Your Mind)',
        excerpt: 'Reading ML papers felt impossible when I started. Here\'s the exact process I use to extract maximum value from papers efficiently.',
        category: 'Research',
        tags: ['Research', 'ML', 'Study'],
        date: '2025-07-25',
        readTime: 6,
        content: `Academic papers are not written to be read linearly. They're written to survive peer review. These are different goals. Here's how I actually read them.

**Pass 1: The skim (5 minutes)**

Title → Abstract → Introduction (last paragraph only, which summarizes contributions) → Figures and their captions → Conclusion. You now know: what problem, what approach, what results.

**Pass 2: The structure (20 minutes)**

Read section headers and subheaders. Read the Related Work section — this tells you what the paper is NOT doing and why. Look at the tables — what metrics? What baselines? Do the numbers make sense?

**Pass 3: The deep read (1-2 hours)**

Now read front-to-back with focus on: the proposed method section, the proof or derivation if present, and the experiment setup (random seed? hardware? dataset split?). Red flags: experiments without error bars, baselines that seem cherry-picked, ablations missing.

**Tools I use**

Semantic Scholar for citation graphs. Arxiv Sanity for discovery. Zotero for reference management. Notion for notes.

**What to look for in ML papers**

Every paper should answer: (1) What is the central claim? (2) What evidence supports it? (3) What are the failure modes? If those three aren't addressed, the paper is incomplete.`,
    },
    {
        slug: 'docker-from-zero-to-production',
        num: '18',
        title: 'Docker: From Zero to Production in a Weekend',
        excerpt: 'Docker felt overwhelming until I understood the mental model. Here\'s the explanation I wish I\'d read first.',
        category: 'DevOps',
        tags: ['Docker', 'DevOps', 'Deployment'],
        date: '2025-07-12',
        readTime: 8,
        content: `I avoided Docker for too long because the tutorials all started in the wrong place. Here's the explanation that finally made it click for me.

**The mental model**

Docker is a box. Inside the box is your code AND everything it needs to run (OS libraries, runtime, dependencies). The box runs the same on your laptop, a teammate's laptop, and a production server.

**Key concepts**

- **Image**: the recipe (Dockerfile)
- **Container**: a running instance of an image
- **Registry**: a place to store and share images (Docker Hub, ECR)
- **Volume**: a way to persist data outside the container lifecycle
- **Network**: how containers talk to each other

**A basic Dockerfile for Next.js**

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
\`\`\`

**Docker Compose**

For local development with multiple services (app + database + redis), Docker Compose is essential. One \`docker-compose.yml\` file describes the entire stack. \`docker compose up\` spins everything up.

**Production workflow**

Build → Push to registry → Pull in production → Run. Use health checks. Use restart policies. Use named volumes for databases.`,
    },
    {
        slug: 'generative-ai-tools-for-developers',
        num: '19',
        title: 'Generative AI Tools That Have Actually Changed My Development Workflow',
        excerpt: 'Not a hype piece. Here\'s what AI tools I actually use daily, and more importantly, how I use them.',
        category: 'AI',
        tags: ['AI', 'Tools', 'Productivity'],
        date: '2025-06-28',
        readTime: 6,
        content: `There's a lot of noise about AI in development. Here's what I actually use, and the honest truth about what still needs a human.

**What I use every day**

GitHub Copilot for completing boilerplate — function signatures, interface implementations, React component structure. I don't accept suggestions blindly; I use them as autocomplete suggestions that I verify and edit.

**For complex problems**

I explain the problem to Claude or ChatGPT, not to get the code, but to get an outline of approach. "Here's my data model and what I need to do — what are the key considerations?" This is the same as rubber duck debugging but with a rubber duck that knows things.

**What AI is bad at**

Architecture decisions. AI doesn't know your codebase's constraints, team conventions, or business requirements. It gives you the textbook answer; you need to know when the textbook is wrong.

**Prompt engineering for developers**

The most useful pattern: show the AI an example of what you have, then describe what you need. "Here is my existing component [paste]. I need to add [feature] while maintaining [constraint]." Specificity is everything.

**The honest take**

AI has made me faster at implementation and slower at architecture — because I now spend more time thinking about design before writing code, rather than discovering problems through implementation. That's a net positive.`,
    },
    {
        slug: 'from-student-to-developer-what-i-wish-id-known',
        num: '20',
        title: 'From CS Student to Developer: What I Wish I\'d Known',
        excerpt: 'Everything I\'d tell my first-year self — the learning strategies, the mistakes to skip, and the mindset shifts that actually matter.',
        category: 'Career',
        tags: ['Career', 'Learning', 'CS'],
        date: '2025-06-10',
        readTime: 9,
        content: `I'm a CS graduate. Here's everything I wish someone had told me in first year — the real curriculum that universities don't teach.

**Build something real, immediately**

Your first real project teaches you more than twenty tutorial videos. It doesn't matter what you build — a personal website, a Discord bot, a command-line tool. Build. Ship. The moment you have a URL to share, the learning accelerates.

**Data structures and algorithms are not optional**

I know — it feels disconnected from "real" development. But it's the shared language of technical interviews, and more importantly, it's how you think about efficiency. You don't reach for a HashMap instead of a list because you memorized it — you do it because you understand why it's faster.

**Learn one thing deeply, then branch**

Choose your first language and commit to it. Don't chase every new framework. When you're fluent in one language — truly fluent, not just tutorial-complete — picking up the next one takes weeks instead of months.

**Open source is the best education**

Reading real codebases is humbling and excellent. Find a project you use, read contributions, understand the patterns. Submit a small PR and survive the review. Nothing else gives you this perspective.

**The soft skills are hard**

Communication, documentation, asking good questions, explaining technical ideas to non-technical people — these compound over a career. Start writing about what you learn. Even a private blog. The act of explaining something clarifies your own understanding.

**Final thought**

Your degree gives you the fundamentals. The rest — the craft, the judgment, the taste — you build yourself, through shipping things and being relentlessly curious.`,
    },
];

export const categories = [...new Set(blogPosts.map(p => p.category))];
