import './globals.css';

import type { Metadata } from 'next';
import { Poppins as Font } from 'next/font/google';
import Script from 'next/script';

import { env } from '@/env.mjs';

const font = Font({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default:
      'Regarder des Films et Séries en Streaming Gratuitement | DavStream',
    template: '%s - DavStream',
  },
  description:
    "Regardez des films et séries en streaming gratuit en français. Profitez d'une vaste sélection de contenus, y compris des films d'action, des comédies, des documentaires et des animés, le tout sans abonnement.",
  twitter: {
    card: 'summary_large_image',
    site: '@DavStream',
    title: 'Films et Séries en Streaming Gratuit | DavStream',
    description:
      'Découvrez des films et séries en streaming gratuit en français.',
    images: ['/og-image.png'],
  },
  keywords: [
    'streaming gratuit',
    'films en streaming',
    'séries en streaming',
    'regarder films en ligne',
    'site de streaming français',
    'films d’action',
    'séries comédie',
    'documentaires',
    'anime',
    'streaming HD',
    'streaming sans abonnement',
    'meilleur site de streaming',
    // New keywords added
    'site de streaming en français',
    'site de streaming gratuit en français',
    'site de film et série français en streaming',
    'site de film et série français gratuit en streaming',
    'site de streaming',
    'site de streaming gratuit',
    'site gratuit de streaming',
    'regarder film en ligne',
    'regarder film en ligne gratuitement',
    'regarder série en ligne',
    'regarder série en ligne gratuitement',
    'regarder des films et séries en ligne',
    'regarder des films et séries en ligne gratuitement',
    'film complet',
    'film complet en VF',
    'film complet en français',
    'film complet en français gratuit sans inscription',
    'voir film streaming gratuit sans inscription',
    'films en streaming en VF',
    'cinéma adresse 2024',
    'film VF',
    'film VF gratuit',
    'film VF en streaming',
    'film VF en streaming gratuit',
    'film en français',
    'film en français gratuit',
    'site de film en français',
    'site de film',
    'site de film gratuit',
    'site de film en français gratuit',
    'série VF',
    'série VF gratuit',
    'série VF en streaming',
    'série VF en streaming gratuit',
    'série en français',
    'série en français gratuit',
    'site de série en français',
    'site de série',
    'site de série gratuit',
    'site de série en français gratuit',
    'film et série VF',
    'film et série VF gratuit',
    'film et série VF en streaming gratuit',
    'film et série en français',
    'film et série en français gratuit',
    'site de film et série en français',
    'site de film et série',
    'site de film et série gratuit',
    'site de film et série en français gratuit',
    'site de film et série en streaming',
    'site de film et série en streaming gratuit',
  ],

  applicationName: 'DavStream - Films et Séries Gratuits',
  appleWebApp: {
    title: 'DavStream - Films et Séries Gratuits',
    statusBarStyle: 'default',
    capable: true,
  },
  openGraph: {
    title: 'DavStream - Films et Séries en Streaming Gratuit',
    description:
      "Regardez des films et séries en streaming gratuit en français. Profitez d'une vaste sélection de contenus, y compris des classiques et des nouveautés.",
    siteName: 'DavStream',
    type: 'website',
    locale: 'fr_FR',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/logo-bg.jpg',
        sizes: '16x16',
        type: 'image/jpg',
      },
    ],
  },
  authors: [
    {
      name: 'Lamine Diamoutene',
      url: 'https://github.com/Nemila/',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${font.variable} flex min-h-screen flex-col overflow-x-hidden antialiased`}
      >
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="c3298cbb-4ec9-4091-9c0d-53df7a5b2e06"
        ></Script>
        {children}
      </body>
    </html>
  );
}
