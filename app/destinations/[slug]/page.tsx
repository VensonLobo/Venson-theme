import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { DESTINATIONS, PACKAGES, Destination, PackageTour } from '@/lib/data';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Check,
  Compass,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { DestinationDetailClient } from './destination-detail-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);

  if (!dest) {
    return {
      title: 'Destination Not Found | Lobo Travels',
    };
  }

  return {
    title: `${dest.name} Tour Packages & Bespoke Private Itineraries | Lobo Travels`,
    description: `Discover curated journeys to ${dest.name}, ${dest.region}. ${dest.tagline} Private chauffeur, audited stays, and 24x7 concierge support by Lobo Travels.`,
    openGraph: {
      title: `${dest.name} Private Tour Packages | Lobo Travels`,
      description: dest.tagline,
      images: [{ url: dest.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Find all packages that feature this destination
  const matchedPackages = PACKAGES.filter((pkg) =>
    pkg.primaryDestinationTags.includes(destination.slug) ||
    pkg.route.toLowerCase().includes(destination.name.toLowerCase())
  );

  // Related destinations
  const relatedDestinations = DESTINATIONS.filter(
    (d) =>
      d.slug !== destination.slug &&
      (d.region === destination.region ||
        d.categoryTags.some((cat) => destination.categoryTags.includes(cat)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Breadcrumb Bar */}
        <div className="bg-[#0A1428] text-stone-400 text-xs py-3 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <Link href="/destinations" className="hover:text-white transition-colors">
              Destinations
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <span className="text-[#E5C07B] font-medium">{destination.name}</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative h-[420px] sm:h-[500px] w-full overflow-hidden bg-[#0A1428] text-white">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428]/80 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B27] text-[#0A1428] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  {destination.region}
                </span>
                {destination.categoryTags.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium uppercase tracking-wider border border-white/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                {destination.name}
              </h1>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                {destination.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Client Interactive Section */}
        <DestinationDetailClient
          destination={destination}
          matchedPackages={matchedPackages}
          relatedDestinations={relatedDestinations}
        />
      </main>

      <GlobalFooter />
    </div>
  );
}
