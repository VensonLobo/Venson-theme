'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DESTINATIONS } from '@/lib/data';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

export function TopDestinationsStrip() {
  // Exactly 5 top destinations as requested: Delhi, Jaipur, Manali, Shimla, Agra
  const topSlugs = ['delhi', 'jaipur', 'manali', 'shimla', 'agra'];
  const topDestinations = topSlugs
    .map((slug) => DESTINATIONS.find((d) => d.slug === slug))
    .filter(Boolean);

  const getCategoryLabel = (tag: string) => {
    switch (tag) {
      case 'nature':
        return 'Mountains';
      case 'heritage':
        return 'Heritage';
      case 'spiritual':
        return 'Spiritual';
      case 'honeymoon':
        return 'Romantic';
      default:
        return tag;
    }
  };

  return (
    <section className="py-20 bg-[#F7F5F2] text-[#0A1128] border-b border-gray-200" id="top-destinations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059] mb-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Highest Converting Circuits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0A1128]">
              Top Destinations
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Our five most requested gateways, forming the backbone of the Golden Triangle and Himachal circuits.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0A1128] hover:text-[#C5A059] group transition-colors"
            >
              <span>Explore All 22 Destinations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
            </Link>
          </div>
        </div>

        {/* Cards: 5-column grid on desktop, horizontal swipeable strip on mobile */}
        <div
          className="flex lg:grid lg:grid-cols-5 gap-5 overflow-x-auto pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory"
          id="top-destinations-grid"
        >
          {topDestinations.map((dest) => {
            if (!dest) return null;
            return (
              <div
                key={dest.id}
                className="flex-shrink-0 w-[280px] lg:w-auto snap-center group bg-white border border-gray-200 hover:border-[#C5A059] transition-all duration-300 flex flex-col shadow-xs hover:shadow-md"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 280px, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/30 to-transparent" />

                  {/* Pills */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {dest.categoryTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#0A1128]/85 text-white text-[9px] font-bold tracking-widest uppercase border border-white/10"
                      >
                        {getCategoryLabel(tag)}
                      </span>
                    ))}
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-xl font-serif italic text-white tracking-wide">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      {dest.region}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      {dest.bestTime.split('&')[0].trim()}
                    </span>
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#0A1128] hover:text-[#C5A059] transition-colors"
                      aria-label={`Explore curated packages for ${dest.name}`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
