import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

const DESCRIPTION =
  'Web design and development studio based in Warsaw, Poland. We build websites for restaurants, law firms, and service businesses across four countries. Measured outcomes, not just beautiful work.';

export const metadata: Metadata = {
  title: 'Meshly — Web Design & Development Studio, Warsaw',
  description: DESCRIPTION,
  authors: [{ name: 'Meshly', url: 'https://meshly.pl' }],
  creator: 'Meshly',
  metadataBase: new URL('https://meshly.pl'),
  alternates: { canonical: 'https://meshly.pl' },
  openGraph: {
    title: 'Meshly — Web Design & Development Studio',
    description: DESCRIPTION,
    url: 'https://meshly.pl',
    siteName: 'Meshly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meshly — Web Design & Development Studio',
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090E1C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/JetBrainsMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Meshly',
              url: 'https://meshly.pl',
              description: DESCRIPTION,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Warsaw',
                addressCountry: 'PL',
              },
              foundingDate: '2024',
              areaServed: ['Poland', 'Czech Republic', 'Romania', 'Germany'],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
