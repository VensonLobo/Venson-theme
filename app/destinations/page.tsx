import type { Metadata } from 'next';
import { DestinationsClient } from './destinations-client';

export const metadata: Metadata = {
  title: 'India Tour Destinations & Handcrafted Holiday Spots | Lobo Travels',
  description:
    'Explore 22 handpicked travel destinations across North India, Rajasthan, Himachal Pradesh, Kashmir, and Sacred Garhwal with Lobo Travels.',
  alternates: {
    canonical: 'https://lobotravels.com/destinations/',
  },
  openGraph: {
    title: 'India Tour Destinations | Lobo Travels',
    description:
      'Explore 22 handpicked travel destinations across North India, Rajasthan, Himachal Pradesh, Kashmir, and Sacred Garhwal with Lobo Travels.',
    url: 'https://lobotravels.com/destinations/',
    type: 'website',
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
