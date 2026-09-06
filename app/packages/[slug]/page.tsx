import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PACKAGES, PackageTour } from '@/lib/data';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import {
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { PackageDetailClient } from './package-detail-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    return {
      title: 'Tour Itinerary Not Found | Lobo Travels',
    };
  }

  return {
    title: `${pkg.title} (${pkg.duration}) | Lobo Travels`,
    description: `${pkg.summary} Route: ${pkg.route}. Private chauffeured tour with audited 4-5 star hotels and 24x7 support by Lobo Travels.`,
    openGraph: {
      title: `${pkg.title} | Lobo Travels Curated Itinerary`,
      description: pkg.summary,
      images: [{ url: pkg.heroImage }],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  // Related tours
  const relatedPackages = PACKAGES.filter(
    (p) => p.slug !== pkg.slug && p.categories.some((c) => pkg.categories.includes(c))
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-[#0A1428] text-stone-400 text-xs py-3 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <Link href="/packages" className="hover:text-white transition-colors">
              Packages
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <span className="text-[#E5C07B] font-medium truncate max-w-xs sm:max-w-md">
              {pkg.title}
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="relative h-[420px] sm:h-[480px] w-full overflow-hidden bg-[#0A1428] text-white">
          <Image
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1428]/85 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59B27] text-[#0A1428] text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  {pkg.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  <MapPin className="w-3 h-3 text-[#C59B27]" />
                  {pkg.route}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {pkg.title}
              </h1>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                {pkg.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Client Interactive Area (Itinerary Accordion, Inclusions, FAQs, Sidebar) */}
        <PackageDetailClient pkg={pkg} relatedPackages={relatedPackages} />
      </main>

      <GlobalFooter />
    </div>
  );
}
