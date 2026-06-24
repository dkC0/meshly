import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Nunito, JetBrains_Mono } from 'next/font/google';
import AnalyticsProvider from '@/components/ui/AnalyticsProvider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

const SITE_NAME = 'Meshly';
const SITE_URL = 'https://meshly.pl';
const TITLE = 'Meshly — Web Design & Development Studio | Warsaw, Poland';
const DESCRIPTION =
  'Precision web design and development studio based in Warsaw, Poland. We build high-performance digital systems for companies that have outgrown generic websites.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Meshly',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: 'Next.js',
  keywords: [
    'web design',
    'web development',
    'Warsaw',
    'Poland',
    'web design studio',
    'website development',
    'UI/UX design',
    'custom websites',
    'premium web design',
    'digital agency Warsaw',
    'projektowanie stron internetowych',
    'tworzenie stron www',
    'agencja interaktywna Warszawa',
  ],
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    alternateLocale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@meshly_pl',
    site: '@meshly_pl',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
    { media: '(prefers-color-scheme: light)', color: '#0A0A0B' },
  ],
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    description: DESCRIPTION,
    email: 'hello@meshly.pl',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warsaw',
      addressRegion: 'Mazowieckie',
      addressCountry: 'PL',
    },
    sameAs: ['https://github.com/dkC0'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@meshly.pl',
      availableLanguage: ['English', 'Polish'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/android-chrome-512x512.png`,
    description: DESCRIPTION,
    email: 'hello@meshly.pl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warsaw',
      addressRegion: 'Mazowieckie',
      addressCountry: 'PL',
    },
    priceRange: '$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: [
      { '@type': 'Country', name: 'Poland' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    knowsAbout: [
      'Web Design',
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Next.js',
      'React',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'ReadAction',
      target: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
