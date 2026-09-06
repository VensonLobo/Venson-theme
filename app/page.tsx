import React from 'react';
import { GlobalHeader } from '@/components/global-header';
import { HeroSection } from '@/components/hero-section';
import { TopDestinationsStrip } from '@/components/top-destinations-strip';
import { FeaturedPackagesSection } from '@/components/featured-packages-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { TestimonialsSection } from '@/components/testimonials-carousel';
import { HomeEnquirySection } from '@/components/home-enquiry-section';
import { GlobalFooter } from '@/components/global-footer';

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
