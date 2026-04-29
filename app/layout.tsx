import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import GlobalShell from '@/components/layout/GlobalShell';



export const metadata: Metadata = {
  title: 'Mehedi Hasan | Web Developer & Competitive Programmer',
  description:
    'Portfolio of Mehedi Hasan – CSE graduate from AIUB, competitive programmer (ICPC x4, NCPC x2), full-stack developer (Next.js, NestJS, ASP.NET), and ML researcher specializing in healthcare AI.',
  keywords: [
    'Mehedi Hasan',
    'Web Developer',
    'Competitive Programmer',
    'ICPC',
    'Next.js',
    'NestJS',
    'Machine Learning',
    'AIUB',
    'Bangladesh',
    'Portfolio',
  ],
  authors: [{ name: 'Mehedi Hasan', url: 'https://github.com/Lord-Mehedi-Hasan' }],
  creator: 'Mehedi Hasan',
  metadataBase: new URL('https://mehedi-hasan.dev'),
  openGraph: {
    title: 'Mehedi Hasan | Web Developer & Competitive Programmer',
    description:
      'Full-stack developer, competitive programmer, and ML researcher building impactful solutions.',
    url: 'https://mehedi-hasan.dev',
    siteName: 'Mehedi Hasan Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mehedi Hasan Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mehedi Hasan | Web Developer & Competitive Programmer',
    description: 'Full-stack developer, competitive programmer, and ML researcher.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mehedi Hasan',
  jobTitle: 'Web Developer',
  description:
    'CSE graduate from AIUB, competitive programmer, full-stack developer, and ML researcher.',
  url: 'https://mehedi-hasan.dev',
  email: 'mh2822299@gmail.com',
  telephone: '+8801580741077',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mirpur, Dhaka',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://www.linkedin.com/in/mehedi-hasan-50b2ba2b2/',
    'https://github.com/Lord-Mehedi-Hasan',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'American International University – Bangladesh',
  },
  knowsAbout: [
    'Web Development',
    'Competitive Programming',
    'Machine Learning',
    'Next.js',
    'NestJS',
    'C++',
    'Python',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics – replace G-XXXXXXXXXX with your Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
