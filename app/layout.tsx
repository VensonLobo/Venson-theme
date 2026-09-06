import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { COMPANY_DETAILS } from '@/lib/data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lobo Travels | Curated Journeys & Bespoke Tours Across India',
  description:
    'Lobo Travels designs bespoke private journeys across India. Tailored luxury and heritage itineraries in Delhi, Agra, Rajasthan, Himachal, Kashmir, and Sacred Garhwal.',
  keywords: [
    'Lobo Travels',
    'best travel agency in Delhi',
    'custom holiday packages India',
    'curated tour itineraries India',
    'luxury tour operator Delhi',
    'Golden Triangle tour package',
    'Shimla Manali tour package',
    'travel agency Mandir Marg Delhi',
    '110001',
  ],
  authors: [{ name: 'Lobo Travels' }],
  openGraph: {
    title: 'Lobo Travels | Curated Journeys Around You',
    description:
      'Experience India through handcrafted, private itineraries. Verified stays, personal chauffeurs, and 24x7 on-trip concierge by Lobo Travels.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Lobo Travels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lobo Travels | Bespoke India Tours',
    description:
      'Curated journeys crafted around you. From the Golden Triangle to high Himalayan passes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-[#F7F5F2] text-[#0A1128] antialiased selection:bg-[#C5A059] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

