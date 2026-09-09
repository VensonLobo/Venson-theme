import React from 'react';
import type { Metadata } from 'next';
import { GlobalHeader } from '@/components/global-header';
import { HeroSection } from '@/components/hero-section';
import { TopDestinationsStrip } from '@/components/top-destinations-strip';
import { FeaturedPackagesSection } from '@/components/featured-packages-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { TestimonialsSection } from '@/components/testimonials-carousel';
import { HomeEnquirySection } from '@/components/home-enquiry-section';
import { GlobalFooter } from '@/components/global-footer';

export const metadata: Metadata = {
  title: 'Lobo Travels | Curated Journeys & Bespoke Tours Across India',
  description:
    'Lobo Travels designs bespoke private journeys across India. Tailored luxury and heritage itineraries in Delhi, Agra, Rajasthan, Himachal, Kashmir, and Sacred Garhwal.',
  alternates: {
    canonical: 'https://lobotravels.com/',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2]">
      <GlobalHeader />
      <main className="flex-1">
        <HeroSection />
        <TopDestinationsStrip />
        <FeaturedPackagesSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <HomeEnquirySection />
      </main>
      <GlobalFooter />
    </div>
  );
}
