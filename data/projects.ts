export interface Project {
    id: string;
    num: string;
    cat: 'Web' | 'Desktop' | 'App';
    title: string;
    desc: string;
    longDesc: string;
    tech: string[];
    highlights: string[];
    link?: string;
    github?: string;
    year: string;
}

export const projects: Project[] = [
    {
        id: 'healthinfo',
        num: '01', cat: 'Web',
        title: 'HealthInfo – Hospital Management',
        year: '2024',
        desc: 'Web system streamlining hospital operations: patient records, doctor scheduling, service management, and digitized workflows.',
        longDesc: 'HealthInfo is a comprehensive hospital management platform built to digitize and streamline clinical operations. It handles patient registration, appointment scheduling, doctor timetabling, service billing, and role-based access for staff. The system replaces paper-based workflows with a fast, intuitive web interface.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        highlights: [
            'Role-based access control (admin, doctor, receptionist)',
            'Patient appointment booking & calendar scheduling',
            'Service billing & payment tracking',
            'Doctor availability management',
            'Fully responsive across all devices',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'ecommerce',
        num: '02', cat: 'Web',
        title: 'E-Commerce Management System',
        year: '2024',
        desc: 'Full-stack platform for managing online sales, inventory, and customer orders with NestJS REST API and PostgreSQL.',
        longDesc: 'A production-grade e-commerce backend built on NestJS with a TypeScript codebase. Features a fully RESTful API powering product catalog management, customer authentication (JWT), order lifecycle tracking, and an admin dashboard. PostgreSQL handles relational data with efficient query patterns.',
        tech: ['TypeScript', 'NestJS', 'Node.js', 'PostgreSQL'],
        highlights: [
            'JWT authentication with refresh token rotation',
            'Product catalog with categories, filters, variants',
            'Order lifecycle management (pending→shipped→delivered)',
            'Inventory tracking & low-stock alerts',
            'Admin REST API with Swagger documentation',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'online-store',
        num: '03', cat: 'Web',
        title: 'Online Store Management',
        year: '2023',
        desc: 'Scalable store app with Next.js frontend, Node.js backend, and PostgreSQL — fast, modern, and production-ready.',
        longDesc: 'Full-stack online store with a Next.js 14 (App Router) frontend and a Node.js + Express backend. Features SSR product pages for SEO, a client-side cart, and a PostgreSQL database. Designed for performance with server-side rendering and image optimization.',
        tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
        highlights: [
            'SSR product pages with Next.js App Router',
            'Client-side cart with persistent state',
            'Next/Image optimization for fast loading',
            'PostgreSQL with Prisma ORM',
            'Deployed on Vercel + Railway',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'bank',
        num: '04', cat: 'Desktop',
        title: 'Bank Management System',
        year: '2023',
        desc: 'Java application managing customer banking accounts, transactions, and services with a clean UI.',
        longDesc: 'A Java Swing desktop application simulating a bank management system. Users can open accounts, deposit/withdraw funds, check balances, and view transaction history. The system uses MySQL for persistent storage and features a clean tabbed interface.',
        tech: ['Java', 'MySQL', 'Java Swing'],
        highlights: [
            'Account opening, closing, and editing',
            'Deposit, withdrawal, and fund transfer',
            'Transaction history with date filters',
            'Admin panel for employee management',
            'MySQL persistence with JDBC',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'dabble',
        num: '05', cat: 'App',
        title: 'Dabble – Word Puzzle Game',
        year: '2023',
        desc: 'Python word game with 3 difficulty levels, word validation, and score tracking.',
        longDesc: 'Dabble is a terminal-based word puzzle game written in Python. Players are given scrambled letters and must form valid English words within a time limit. Three difficulty modes adjust word length and time pressure. Words are validated against a built-in dictionary.',
        tech: ['Python'],
        highlights: [
            '3 difficulty levels (Easy / Medium / Hard)',
            'Real-time score tracking and leaderboard',
            'Dictionary-based word validation',
            'Timer with countdown display',
            'Clean terminal UI with colorama',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'parcel',
        num: '06', cat: 'Desktop',
        title: 'Parcel Delivery System',
        year: '2022',
        desc: 'C# Windows app for managing parcel delivery, tracking numbers, sender/receiver info, and delivery records.',
        longDesc: 'A Windows Forms application built with C# for managing a parcel delivery service. Dispatchers can register parcels with sender/receiver details, assign tracking numbers, and update delivery statuses. Records are stored in a MySQL database with a full search and filter UI.',
        tech: ['C#', 'MySQL', 'Visual Studio', 'WinForms'],
        highlights: [
            'Parcel registration with auto-generated tracking IDs',
            'Delivery status updates (Pending / In Transit / Delivered)',
            'Search by tracking number or sender name',
            'Delivery history reports',
            'MySQL backend with ADO.NET',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
    {
        id: 'utility-suite',
        num: '07', cat: 'App',
        title: 'Utility Programs Suite',
        year: '2022',
        desc: 'C++ collection: Phone Book, Clock, To-Do List, and Calendar — demonstrating core logic and UI handling.',
        longDesc: 'A suite of C++ console utility programs demonstrating fundamental programming concepts. Includes a phonebook with CRUD operations, a real-time clock using system time, a to-do list with file persistence, and a calendar display. Showcases file I/O, data structures, and time handling in C++.',
        tech: ['C++'],
        highlights: [
            'Phonebook: add, search, edit, delete contacts',
            'Real-time digital clock using system time',
            'To-do list with file-based persistence (CRUD)',
            'Calendar display for any month/year',
            'All programs share a unified console menu',
        ],
        github: 'https://github.com/Lord-Mehedi-Hasan',
    },
];
