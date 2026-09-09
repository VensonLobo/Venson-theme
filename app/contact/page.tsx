import type { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Lobo Travels | Mandir Marg, New Delhi Travel Desk',
  description:
    'Reach Lobo Travels at Mandir Marg, New Delhi. Call +91 93126 40072 or request a tailored private itinerary consultation with our travel directors.',
  alternates: {
    canonical: 'https://lobotravels.com/contact/',
  },
  openGraph: {
    title: 'Contact Lobo Travels | Mandir Marg, New Delhi Travel Desk',
    description:
      'Reach Lobo Travels at Mandir Marg, New Delhi. Call +91 93126 40072 or request a tailored private itinerary consultation with our travel directors.',
    url: 'https://lobotravels.com/contact/',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
