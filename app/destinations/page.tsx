'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { DESTINATIONS, CATEGORIES, Destination } from '@/lib/data';
import { Search, MapPin, Calendar, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { EnquiryModal } from '@/components/enquiry-modal';

function DestinationsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedDestForEnquiry, setSelectedDestForEnquiry] = useState<string>('');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesCategory =
        activeCategory === 'all' || dest.categoryTags.includes(activeCategory as any);
      const matchesQuery =
        searchQuery === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Page Banner */}
        <section className="relative bg-[#0A1428] text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=80"
              alt="Destinations background"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0A1428]/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Curated Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              22 Handpicked Destinations
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              From alpine pine valleys in Himachal to golden desert citadels in Rajasthan and ancient spiritual sanctums along the Ganges.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8] py-4 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#0A1428] text-[#F3E8C8] shadow-sm'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  All ({DESTINATIONS.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = DESTINATIONS.filter((d) => d.categoryTags.includes(cat.id)).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                        activeCategory === cat.id
                          ? 'bg-[#0A1428] text-[#F3E8C8] shadow-sm'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      <span>{cat.title}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search destination, state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-stone-300 rounded-full text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-900">{filteredDestinations.length}</strong> of{' '}
              {DESTINATIONS.length} destinations
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#C59B27] font-semibold hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
              <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-stone-800">
                No matching destinations found
              </h3>
              <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
                We craft bespoke journeys anywhere across India. Speak to our Mandir Marg desk to plan a completely custom itinerary.
              </p>
              <button
                onClick={() => {
                  setSelectedDestForEnquiry('');
                  setEnquiryOpen(true);
                }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A1428] text-[#F3E8C8] text-xs font-semibold"
              >
                Inquire About a Custom Route
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E7E0D3] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Destination Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/80 via-black/20 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        {dest.categoryTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-[#0A1428]/80 backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Region */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h2 className="text-lg font-serif font-bold tracking-wide">
                          {dest.name}
                        </h2>
                        <p className="text-[11px] text-stone-300 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C59B27]" />
                          {dest.region}
                        </p>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="p-4 space-y-2.5">
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.tagline}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Best: {dest.bestTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDestForEnquiry(dest.name);
                        setEnquiryOpen(true);
                      }}
                      className="text-[11px] font-semibold text-stone-500 hover:text-[#0A1428] transition-colors"
                    >
                      Enquire
                    </button>

                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A1428] hover:text-[#C59B27] group/link transition-colors"
                    >
                      <span>Explore Packages</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Route Consultation Strip */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0A1428] via-[#101F3B] to-[#0A1428] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5C07B]">
                Bespoke Route Planning
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Looking to combine multiple states into one unhurried journey?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Our Mandir Marg travel team crafts custom multi-city journeys with dedicated chauffeurs, luggage assistance, and audited heritage stays.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedDestForEnquiry('Multi-State Custom Journey');
                setEnquiryOpen(true);
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C59B27] to-[#DFB743] text-[#0A1428] font-bold text-xs tracking-wider uppercase hover:scale-105 transition-all shadow-lg flex-shrink-0"
            >
              Plan With Our Senior Designer
            </button>
          </div>
        </section>
      </main>

      <GlobalFooter />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultDestination={selectedDestForEnquiry}
      />
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500">Loading destinations...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}
