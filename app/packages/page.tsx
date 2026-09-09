import type { Metadata } from 'next';
import { PackagesClient } from './packages-client';

export const metadata: Metadata = {
  title: 'Curated India Tour Packages & Bespoke Private Holidays | Lobo Travels',
  description:
    'Explore luxury private journeys and chauffeured holiday packages across Delhi, Agra, Rajasthan, Himachal, Kashmir, and Sacred Garhwal with Lobo Travels.',
  alternates: {
    canonical: 'https://lobotravels.com/packages/',
  },
  openGraph: {
    title: 'Curated India Tour Packages | Lobo Travels',
    description:
      'Explore luxury private journeys and chauffeured holiday packages across Delhi, Agra, Rajasthan, Himachal, Kashmir, and Sacred Garhwal with Lobo Travels.',
    url: 'https://lobotravels.com/packages/',
    type: 'website',
  },
};

export default function PackagesPage() {
  return <PackagesClient />;
}
