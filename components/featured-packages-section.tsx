'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PACKAGES, PackageTour } from '@/lib/data';
import { Clock, MapPin, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { EnquiryModal } from './enquiry-modal';

export function FeaturedPackagesSection() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nature' | 'heritage' | 'spiritual' | 'honeymoon'>('all');
  const [selectedPackageForEnquiry, setSelectedPackageForEnquiry] = useState<PackageTour | null>(null);

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (selectedFilter === 'all') return true;
    return pkg.categories.includes(selectedFilter);
  });

  return (
    <section className="py-20 bg-[#F7F5F2] text-[#0A1128] border-b border-gray-200" id="featured-experiences-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Curated Itineraries
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0A1128]">
            Featured Experiences
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Comprehensive journeys crafted to be experienced at unhurried, private ease. Every itinerary can be modified to your exact schedule.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Curated Tours' },
              { id: 'heritage', label: 'Heritage & History' },
              { id: 'nature', label: 'Nature & Mountains' },
              { id: 'spiritual', label: 'Spiritual Circuits' },
              { id: 'honeymoon', label: 'Romantic & Honeymoon' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#0A1128] text-[#C5A059] border border-[#0A1128] shadow-sm'
                    : 'bg-white hover:bg-stone-50 text-stone-600 border border-gray-200 hover:border-[#C5A059]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.slice(0, 6).map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white border border-gray-200 hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/85 via-transparent to-[#0A1128]/20" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A1128] text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-xs">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Route overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] text-stone-300 font-medium line-clamp-1">
                      Route: {pkg.route}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif italic text-[#0A1128] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {pkg.summary}
                  </p>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {pkg.highlightTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#F7F5F2] text-stone-700 text-[10px] font-medium border border-stone-200"
                      >
                        <Check className="w-3 h-3 text-[#C5A059]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPackageForEnquiry(pkg)}
                  className="text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-[#0A1128] transition-colors py-2"
                >
                  Customise Trip
                </button>

                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A1128] hover:bg-[#C5A059] text-white hover:text-[#0A1128] text-[11px] font-bold uppercase tracking-widest transition-all group/btn"
                >
                  <span>View Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:text-[#0A1128] group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Packages CTA */}
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 border border-gray-300 hover:border-[#0A1128] text-[#0A1128] text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:shadow-sm"
          >
            <span>View All Handcrafted Packages</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
        </div>
      </div>

      {/* Quick Enquiry Modal */}
      {selectedPackageForEnquiry && (
        <EnquiryModal
          isOpen={!!selectedPackageForEnquiry}
          onClose={() => setSelectedPackageForEnquiry(null)}
          defaultPackageName={selectedPackageForEnquiry.title}
          defaultDestination={selectedPackageForEnquiry.primaryDestinationTags[0]}
        />
      )}
    </section>
  );
}
