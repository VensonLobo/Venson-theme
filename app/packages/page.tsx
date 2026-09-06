'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { PACKAGES, CATEGORIES, PackageTour } from '@/lib/data';
import { Clock, MapPin, Search, ArrowRight, Sparkles, Check, Filter } from 'lucide-react';
import { EnquiryModal } from '@/components/enquiry-modal';

function PackagesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeDuration, setActiveDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageTour | null>(null);

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesCategory =
        activeCategory === 'all' || pkg.categories.includes(activeCategory as any);

      const days = parseInt(pkg.duration.split('D')[0], 10) || 5;
      let matchesDuration = true;
      if (activeDuration === 'short') matchesDuration = days <= 4;
      if (activeDuration === 'medium') matchesDuration = days >= 5 && days <= 7;
      if (activeDuration === 'long') matchesDuration = days >= 8;

      const matchesQuery =
        searchQuery === '' ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDuration && matchesQuery;
    });
  }, [activeCategory, activeDuration, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative bg-[#0A1428] text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=80"
              alt="Packages banner"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#0A1428]/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Private & Handcrafted
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Curated Tour Packages & Circuits
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              Tested routes, refined over 30+ years of on-ground experience. Private cars, vetted drivers, handpicked properties, and total flexibility to adjust.
            </p>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="sticky top-20 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8] py-4 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#0A1428] text-[#F3E8C8] shadow-sm'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  All Tours ({PACKAGES.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = PACKAGES.filter((p) => p.categories.includes(cat.id)).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        activeCategory === cat.id
                          ? 'bg-[#0A1428] text-[#F3E8C8] shadow-sm'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {cat.title} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Duration and Search */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
                <select
                  value={activeDuration}
                  onChange={(e) => setActiveDuration(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-stone-300 rounded-full text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Short (1 - 4 Days)</option>
                  <option value="medium">Classic (5 - 7 Days)</option>
                  <option value="long">Grand Circuit (8+ Days)</option>
                </select>

                <div className="relative flex-1 sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search route or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-stone-300 rounded-full text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-900">{filteredPackages.length}</strong> of{' '}
              {PACKAGES.length} curated itineraries
            </span>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
              <Clock className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-stone-800">
                No matching itineraries found
              </h3>
              <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
                All Lobo Travels itineraries can be adjusted or created from scratch according to your specific dates and duration.
              </p>
              <button
                onClick={() => {
                  setSelectedPkg(null);
                  setEnquiryOpen(true);
                }}
                className="mt-4 px-5 py-2.5 rounded-lg bg-[#0A1428] text-[#F3E8C8] text-xs font-semibold"
              >
                Inquire With Travel Desk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1428]/90 backdrop-blur-md text-[#F3E8C8] text-xs font-bold border border-[#C59B27]/40">
                          <Clock className="w-3 h-3 text-[#C59B27]" />
                          {pkg.duration}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs text-stone-300 font-medium line-clamp-1">
                          Route: {pkg.route}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-[#0A1428] group-hover:text-[#C59B27] transition-colors leading-snug">
                        {pkg.title}
                      </h3>

                      <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                        {pkg.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {pkg.highlightTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 text-[11px] font-medium border border-stone-200"
                          >
                            <Check className="w-3 h-3 text-[#C59B27]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPkg(pkg);
                        setEnquiryOpen(true);
                      }}
                      className="text-xs font-semibold text-stone-500 hover:text-[#0A1428] transition-colors py-2"
                    >
                      Customise
                    </button>

                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A1428] hover:bg-[#15274D] text-[#F3E8C8] text-xs font-semibold tracking-wide transition-all group/btn"
                    >
                      <span>View Itinerary</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C59B27] group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <GlobalFooter />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultPackageName={selectedPkg?.title}
        defaultDestination={selectedPkg?.primaryDestinationTags[0]}
      />
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
