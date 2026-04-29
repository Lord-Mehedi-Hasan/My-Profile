'use client';

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import Magnetic from '@/components/ui/Magnetic';

const FloatingShape = lazy(() => import('./FloatingShape'));


const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'YOUR_SERVICE_ID';
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID';
const EJS_PUBLIC = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? 'YOUR_PUBLIC_KEY';

const socials = [
    { label: 'GitHub', href: 'https://github.com/Lord-Mehedi-Hasan', short: 'Lord-Mehedi-Hasan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehedi-hasan-50b2ba2b2/', short: 'mehedi-hasan-50b2ba2b2' },
    { label: 'Email', href: 'mailto:mh2822299@gmail.com', short: 'mh2822299@gmail.com' },
];

/* ── Country dial codes — all ~195 countries ─────────────────────────── */
const COUNTRIES = [
    // Bangladesh first (default)
    { code: 'BD', dial: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    // Rest alphabetically
    { code: 'AF', dial: '+93', flag: '🇦🇫', name: 'Afghanistan' },
    { code: 'AL', dial: '+355', flag: '🇦🇱', name: 'Albania' },
    { code: 'DZ', dial: '+213', flag: '🇩🇿', name: 'Algeria' },
    { code: 'AD', dial: '+376', flag: '🇦🇩', name: 'Andorra' },
    { code: 'AO', dial: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: 'AG', dial: '+1268', flag: '🇦🇬', name: 'Antigua & Barbuda' },
    { code: 'AR', dial: '+54', flag: '🇦🇷', name: 'Argentina' },
    { code: 'AM', dial: '+374', flag: '🇦🇲', name: 'Armenia' },
    { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'AT', dial: '+43', flag: '🇦🇹', name: 'Austria' },
    { code: 'AZ', dial: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
    { code: 'BS', dial: '+1242', flag: '🇧🇸', name: 'Bahamas' },
    { code: 'BH', dial: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: 'BB', dial: '+1246', flag: '🇧🇧', name: 'Barbados' },
    { code: 'BY', dial: '+375', flag: '🇧🇾', name: 'Belarus' },
    { code: 'BE', dial: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: 'BZ', dial: '+501', flag: '🇧🇿', name: 'Belize' },
    { code: 'BJ', dial: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: 'BT', dial: '+975', flag: '🇧🇹', name: 'Bhutan' },
    { code: 'BO', dial: '+591', flag: '🇧🇴', name: 'Bolivia' },
    { code: 'BA', dial: '+387', flag: '🇧🇦', name: 'Bosnia & Herzegovina' },
    { code: 'BW', dial: '+267', flag: '🇧🇼', name: 'Botswana' },
    { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: 'BN', dial: '+673', flag: '🇧🇳', name: 'Brunei' },
    { code: 'BG', dial: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: 'BF', dial: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: 'BI', dial: '+257', flag: '🇧🇮', name: 'Burundi' },
    { code: 'CV', dial: '+238', flag: '🇨🇻', name: 'Cape Verde' },
    { code: 'KH', dial: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: 'CM', dial: '+237', flag: '🇨🇲', name: 'Cameroon' },
    { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: 'CF', dial: '+236', flag: '🇨🇫', name: 'Central African Republic' },
    { code: 'TD', dial: '+235', flag: '🇹🇩', name: 'Chad' },
    { code: 'CL', dial: '+56', flag: '🇨🇱', name: 'Chile' },
    { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'CO', dial: '+57', flag: '🇨🇴', name: 'Colombia' },
    { code: 'KM', dial: '+269', flag: '🇰🇲', name: 'Comoros' },
    { code: 'CG', dial: '+242', flag: '🇨🇬', name: 'Congo' },
    { code: 'CD', dial: '+243', flag: '🇨🇩', name: 'Congo (DRC)' },
    { code: 'CR', dial: '+506', flag: '🇨🇷', name: 'Costa Rica' },
    { code: 'CI', dial: '+225', flag: '🇨🇮', name: "Côte d'Ivoire" },
    { code: 'HR', dial: '+385', flag: '🇭🇷', name: 'Croatia' },
    { code: 'CU', dial: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: 'CY', dial: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: 'CZ', dial: '+420', flag: '🇨🇿', name: 'Czech Republic' },
    { code: 'DK', dial: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: 'DJ', dial: '+253', flag: '🇩🇯', name: 'Djibouti' },
    { code: 'DM', dial: '+1767', flag: '🇩🇲', name: 'Dominica' },
    { code: 'DO', dial: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
    { code: 'EC', dial: '+593', flag: '🇪🇨', name: 'Ecuador' },
    { code: 'EG', dial: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: 'SV', dial: '+503', flag: '🇸🇻', name: 'El Salvador' },
    { code: 'GQ', dial: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
    { code: 'ER', dial: '+291', flag: '🇪🇷', name: 'Eritrea' },
    { code: 'EE', dial: '+372', flag: '🇪🇪', name: 'Estonia' },
    { code: 'SZ', dial: '+268', flag: '🇸🇿', name: 'Eswatini' },
    { code: 'ET', dial: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: 'FJ', dial: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: 'FI', dial: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France' },
    { code: 'GA', dial: '+241', flag: '🇬🇦', name: 'Gabon' },
    { code: 'GM', dial: '+220', flag: '🇬🇲', name: 'Gambia' },
    { code: 'GE', dial: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: 'GH', dial: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: 'GR', dial: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: 'GD', dial: '+1473', flag: '🇬🇩', name: 'Grenada' },
    { code: 'GT', dial: '+502', flag: '🇬🇹', name: 'Guatemala' },
    { code: 'GN', dial: '+224', flag: '🇬🇳', name: 'Guinea' },
    { code: 'GW', dial: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
    { code: 'GY', dial: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: 'HT', dial: '+509', flag: '🇭🇹', name: 'Haiti' },
    { code: 'HN', dial: '+504', flag: '🇭🇳', name: 'Honduras' },
    { code: 'HU', dial: '+36', flag: '🇭🇺', name: 'Hungary' },
    { code: 'IS', dial: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'ID', dial: '+62', flag: '🇮🇩', name: 'Indonesia' },
    { code: 'IR', dial: '+98', flag: '🇮🇷', name: 'Iran' },
    { code: 'IQ', dial: '+964', flag: '🇮🇶', name: 'Iraq' },
    { code: 'IE', dial: '+353', flag: '🇮🇪', name: 'Ireland' },
    { code: 'IL', dial: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: 'JM', dial: '+1876', flag: '🇯🇲', name: 'Jamaica' },
    { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'JO', dial: '+962', flag: '🇯🇴', name: 'Jordan' },
    { code: 'KZ', dial: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
    { code: 'KE', dial: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: 'KI', dial: '+686', flag: '🇰🇮', name: 'Kiribati' },
    { code: 'KP', dial: '+850', flag: '🇰🇵', name: 'North Korea' },
    { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: 'KW', dial: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: 'KG', dial: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
    { code: 'LA', dial: '+856', flag: '🇱🇦', name: 'Laos' },
    { code: 'LV', dial: '+371', flag: '🇱🇻', name: 'Latvia' },
    { code: 'LB', dial: '+961', flag: '🇱🇧', name: 'Lebanon' },
    { code: 'LS', dial: '+266', flag: '🇱🇸', name: 'Lesotho' },
    { code: 'LR', dial: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: 'LY', dial: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: 'LI', dial: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
    { code: 'LT', dial: '+370', flag: '🇱🇹', name: 'Lithuania' },
    { code: 'LU', dial: '+352', flag: '🇱🇺', name: 'Luxembourg' },
    { code: 'MG', dial: '+261', flag: '🇲🇬', name: 'Madagascar' },
    { code: 'MW', dial: '+265', flag: '🇲🇼', name: 'Malawi' },
    { code: 'MY', dial: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: 'MV', dial: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: 'ML', dial: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: 'MT', dial: '+356', flag: '🇲🇹', name: 'Malta' },
    { code: 'MH', dial: '+692', flag: '🇲🇭', name: 'Marshall Islands' },
    { code: 'MR', dial: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: 'MU', dial: '+230', flag: '🇲🇺', name: 'Mauritius' },
    { code: 'MX', dial: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: 'FM', dial: '+691', flag: '🇫🇲', name: 'Micronesia' },
    { code: 'MD', dial: '+373', flag: '🇲🇩', name: 'Moldova' },
    { code: 'MC', dial: '+377', flag: '🇲🇨', name: 'Monaco' },
    { code: 'MN', dial: '+976', flag: '🇲🇳', name: 'Mongolia' },
    { code: 'ME', dial: '+382', flag: '🇲🇪', name: 'Montenegro' },
    { code: 'MA', dial: '+212', flag: '🇲🇦', name: 'Morocco' },
    { code: 'MZ', dial: '+258', flag: '🇲🇿', name: 'Mozambique' },
    { code: 'MM', dial: '+95', flag: '🇲🇲', name: 'Myanmar' },
    { code: 'NA', dial: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: 'NR', dial: '+674', flag: '🇳🇷', name: 'Nauru' },
    { code: 'NP', dial: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: 'NL', dial: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: 'NZ', dial: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: 'NI', dial: '+505', flag: '🇳🇮', name: 'Nicaragua' },
    { code: 'NE', dial: '+227', flag: '🇳🇪', name: 'Niger' },
    { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: 'MK', dial: '+389', flag: '🇲🇰', name: 'North Macedonia' },
    { code: 'NO', dial: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: 'OM', dial: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: 'PK', dial: '+92', flag: '🇵🇰', name: 'Pakistan' },
    { code: 'PW', dial: '+680', flag: '🇵🇼', name: 'Palau' },
    { code: 'PA', dial: '+507', flag: '🇵🇦', name: 'Panama' },
    { code: 'PG', dial: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
    { code: 'PY', dial: '+595', flag: '🇵🇾', name: 'Paraguay' },
    { code: 'PE', dial: '+51', flag: '🇵🇪', name: 'Peru' },
    { code: 'PH', dial: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: 'PL', dial: '+48', flag: '🇵🇱', name: 'Poland' },
    { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'QA', dial: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: 'RO', dial: '+40', flag: '🇷🇴', name: 'Romania' },
    { code: 'RU', dial: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: 'RW', dial: '+250', flag: '🇷🇼', name: 'Rwanda' },
    { code: 'KN', dial: '+1869', flag: '🇰🇳', name: 'Saint Kitts & Nevis' },
    { code: 'LC', dial: '+1758', flag: '🇱🇨', name: 'Saint Lucia' },
    { code: 'VC', dial: '+1784', flag: '🇻🇨', name: 'Saint Vincent & Grenadines' },
    { code: 'WS', dial: '+685', flag: '🇼🇸', name: 'Samoa' },
    { code: 'SM', dial: '+378', flag: '🇸🇲', name: 'San Marino' },
    { code: 'ST', dial: '+239', flag: '🇸🇹', name: 'São Tomé & Príncipe' },
    { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: 'SN', dial: '+221', flag: '🇸🇳', name: 'Senegal' },
    { code: 'RS', dial: '+381', flag: '🇷🇸', name: 'Serbia' },
    { code: 'SC', dial: '+248', flag: '🇸🇨', name: 'Seychelles' },
    { code: 'SL', dial: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
    { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: 'SK', dial: '+421', flag: '🇸🇰', name: 'Slovakia' },
    { code: 'SI', dial: '+386', flag: '🇸🇮', name: 'Slovenia' },
    { code: 'SB', dial: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
    { code: 'SO', dial: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: 'SS', dial: '+211', flag: '🇸🇸', name: 'South Sudan' },
    { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: 'LK', dial: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: 'SD', dial: '+249', flag: '🇸🇩', name: 'Sudan' },
    { code: 'SR', dial: '+597', flag: '🇸🇷', name: 'Suriname' },
    { code: 'SE', dial: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: 'CH', dial: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: 'SY', dial: '+963', flag: '🇸🇾', name: 'Syria' },
    { code: 'TW', dial: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: 'TJ', dial: '+992', flag: '🇹🇯', name: 'Tajikistan' },
    { code: 'TZ', dial: '+255', flag: '🇹🇿', name: 'Tanzania' },
    { code: 'TH', dial: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: 'TL', dial: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
    { code: 'TG', dial: '+228', flag: '🇹🇬', name: 'Togo' },
    { code: 'TO', dial: '+676', flag: '🇹🇴', name: 'Tonga' },
    { code: 'TT', dial: '+1868', flag: '🇹🇹', name: 'Trinidad & Tobago' },
    { code: 'TN', dial: '+216', flag: '🇹🇳', name: 'Tunisia' },
    { code: 'TR', dial: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: 'TM', dial: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
    { code: 'TV', dial: '+688', flag: '🇹🇻', name: 'Tuvalu' },
    { code: 'UG', dial: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: 'UA', dial: '+380', flag: '🇺🇦', name: 'Ukraine' },
    { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
    { code: 'UY', dial: '+598', flag: '🇺🇾', name: 'Uruguay' },
    { code: 'UZ', dial: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
    { code: 'VU', dial: '+678', flag: '🇻🇺', name: 'Vanuatu' },
    { code: 'VE', dial: '+58', flag: '🇻🇪', name: 'Venezuela' },
    { code: 'VN', dial: '+84', flag: '🇻🇳', name: 'Vietnam' },
    { code: 'YE', dial: '+967', flag: '🇾🇪', name: 'Yemen' },
    { code: 'ZM', dial: '+260', flag: '🇿🇲', name: 'Zambia' },
    { code: 'ZW', dial: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
];

/* ── Email regex ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const formBoxRef = useRef<HTMLDivElement>(null);

    const [vis, setVis] = useState(false);
    const [status, setStatus] = useState<Status>('idle');
    const [dialCode, setDialCode] = useState('+880');   // default BD
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [emailErr, setEmailErr] = useState('');
    const [glowing, setGlowing] = useState(false);

    /* ── Intersection observer ── */
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    /* ── GSAP 3D field entrance ── */
    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);
            const sec = sectionRef.current;
            if (!sec) return;

            const fields = sec.querySelectorAll<HTMLElement>('[data-contact-field]');
            const leftItems = sec.querySelectorAll<HTMLElement>('[data-contact-left-item]');

            if (leftItems.length) {
                gsap.fromTo(leftItems,
                    { x: -50, rotateY: 15, opacity: 0, transformOrigin: 'left center' },
                    {
                        x: 0, rotateY: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.12,
                        scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' }
                    }
                );
            }
            if (fields.length) {
                gsap.fromTo(fields,
                    { z: -60, rotateX: -12, opacity: 0, y: 20, transformOrigin: 'top center' },
                    {
                        z: 0, rotateX: 0, opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
                        scrollTrigger: { trigger: formRef.current, start: 'top 82%', toggleActions: 'play none none reverse' }
                    }
                );
            }
        };
        init();
    }, []);

    /* ── Canvas2D particle network ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let animId: number;
        const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
        const ctx = canvas.getContext('2d')!;
        const COUNT = 60, MAX_DIST = 130;

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < COUNT; i++) {
            dots.push({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
                r: Math.random() * 2 + 1
            });
        }

        const draw = () => {
            animId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const d of dots) {
                d.x += d.vx; d.y += d.vy;
                if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
                if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
            }
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(74,144,217,${0.22 * (1 - dist / MAX_DIST)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            for (const d of dots) {
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(74,144,217,0.5)';
                ctx.fill();
            }
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    /* ── Handlers ── */
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === 'email') {
            setEmailErr(value && !EMAIL_RE.test(value) ? 'Please enter a valid email address.' : '');
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'sending') return;

        /* Strict validation */
        if (!form.name.trim()) return;
        if (!EMAIL_RE.test(form.email)) {
            setEmailErr('Please enter a valid email address.');
            return;
        }
        if (!form.message.trim()) return;

        setStatus('sending');
        try {
            const fullPhone = form.phone.trim() ? `${dialCode} ${form.phone}` : 'Not provided';
            await emailjs.send(EJS_SERVICE, EJS_TEMPLATE,
                { name: form.name, email: form.email, number: fullPhone, message: form.message },
                EJS_PUBLIC,
            );
            setStatus('success');
            setForm({ name: '', email: '', phone: '', message: '' });
            setEmailErr('');
            /* Trigger form-box glow/success effect */
            setGlowing(true);
            setTimeout(() => setGlowing(false), 3500);
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className={`section ${styles.contact}`} ref={sectionRef} aria-labelledby="contact-h">
            {/* Particle network background */}
            <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />

            {/* FloatingShape icosahedron — bottom-left accent */}
            <Suspense fallback={null}>
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        bottom: '-80px',
                        left: '-80px',
                        width: '360px',
                        height: '360px',
                        pointerEvents: 'none',
                        opacity: 0.45,
                        zIndex: 0,
                    }}
                >
                    <FloatingShape variant="ico" cameraZ={4} />
                </div>
            </Suspense>

            <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

                <div className={`s-label ${vis ? 'reveal in' : 'reveal'}`}>
                    <span>06</span>Contact
                </div>

                <div className={styles.grid} style={{ perspective: '1000px' }}>

                    {/* ── Left ── */}
                    <div className={styles.left}>
                        <h2 className={styles.headline} id="contact-h" data-contact-left-item>
                            Let&apos;s Work<br />
                            <span className={styles.outline}>Together</span>

                        </h2>

                        <a href="mailto:mh2822299@gmail.com" className={styles.emailLink} data-contact-left-item aria-label="Send email">
                            mh2822299@gmail.com
                            <svg className={styles.arrow} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </a>

                        <ul className={styles.socials} data-contact-left-item>
                            {socials.map(s => (
                                <li key={s.label}>
                                    <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={styles.social}>
                                        <span className={styles.socialLabel}>{s.label}</span>
                                        <span className={styles.socialShort}>{s.short} ↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <p className={styles.avail} data-contact-left-item>
                            <span className={styles.dot} aria-hidden="true" />
                            Available for full-time roles, freelance projects &amp; research collaborations.
                        </p>
                    </div>

                    {/* ── Right: form box ── */}
                    <div className={styles.right} style={{ transformStyle: 'preserve-3d' }}>
                        <div
                            ref={formBoxRef}
                            className={`${styles.formBox} ${glowing ? styles.formBoxSuccess : ''}`}
                        >
                            {/* Inner wrapper clips content to rounded corners */}
                            <div className={styles.formBoxInner}>
                                {/* ── Success overlay ── */}
                                {status === 'success' && (
                                    <div className={styles.successOverlay} aria-live="polite">
                                        <div className={styles.successIcon}>
                                            <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="26" cy="26" r="24" className={styles.checkCircle} />
                                                <path d="M14 26l8 8 16-16" className={styles.checkMark} />
                                            </svg>
                                        </div>
                                        <p className={styles.successTitle}>Message Sent!</p>
                                        <p className={styles.successSub}>Thank you — I&apos;ll get back to you soon.</p>
                                    </div>
                                )}

                                <form ref={formRef} onSubmit={onSubmit} className={styles.form} noValidate>
                                    <div className={styles.formHeader} data-contact-field>
                                        <span className={styles.formLabel}>Send a message</span>
                                    </div>

                                    {/* Name + Email */}
                                    <div className={styles.row}>
                                        <div className={styles.field} data-contact-field>
                                            <label htmlFor="contact-name" className={styles.label}>Name</label>
                                            <input id="contact-name" type="text" name="name" value={form.name} onChange={onChange}
                                                placeholder="Your name" required className={styles.input} autoComplete="name" />
                                        </div>
                                        <div className={styles.field} data-contact-field>
                                            <label htmlFor="contact-email" className={styles.label}>Email</label>
                                            <input id="contact-email" type="email" name="email" value={form.email} onChange={onChange}
                                                placeholder="your@email.com" required
                                                className={`${styles.input} ${emailErr ? styles.inputError : ''}`}
                                                autoComplete="email" aria-describedby={emailErr ? 'email-err' : undefined} />
                                            {emailErr && <span id="email-err" className={styles.errorMsg} role="alert">{emailErr}</span>}
                                        </div>
                                    </div>

                                    {/* Phone with country code */}
                                    <div className={styles.field} data-contact-field>
                                        <label htmlFor="contact-phone" className={styles.label}>
                                            Phone <span style={{ opacity: 0.4 }}>(optional)</span>
                                        </label>
                                        <div className={styles.phoneRow}>
                                            <select
                                                className={styles.dialSelect}
                                                value={dialCode}
                                                onChange={e => setDialCode(e.target.value)}
                                                aria-label="Country dial code"
                                            >
                                                {COUNTRIES.map(c => (
                                                    <option key={c.code} value={c.dial}>
                                                        {c.flag} {c.name} ({c.dial})
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                id="contact-phone"
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={onChange}
                                                placeholder="1XXX-XXXXXX"
                                                className={styles.phoneInput}
                                                autoComplete="tel-national"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className={styles.field} data-contact-field>
                                        <label htmlFor="contact-message" className={styles.label}>Message</label>
                                        <textarea id="contact-message" name="message" value={form.message} onChange={onChange}
                                            placeholder="Tell me about your project, opportunity, or just say hi…"
                                            required rows={6} className={styles.textarea} />
                                    </div>

                                    {/* Submit */}
                                    <Magnetic strength={0.25}>
                                        <button
                                            type="submit"
                                            data-contact-field
                                            className={`${styles.submit} ${status === 'sending' ? styles.sending : ''} ${status === 'error' ? styles.errorBtn : ''}`}
                                            disabled={status === 'sending' || status === 'success'}
                                        >
                                            {status === 'idle' && <><span>Send Message</span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></>}
                                            {status === 'sending' && <><span>Sending…</span><span className={styles.spinner} /></>}
                                            {status === 'success' && <span>✓ Sent!</span>}
                                            {status === 'error' && <span>✗ Failed — try email</span>}
                                        </button>
                                    </Magnetic>

                                </form>
                            </div>{/* /formBoxInner */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
