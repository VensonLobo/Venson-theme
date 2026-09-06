'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Destination, PackageTour } from '@/lib/data';
import { EnquiryModal } from '@/components/enquiry-modal';
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Check,
  MapPin,
  ShieldCheck,
  Sun,
  Users,
  MessageCircle,
} from 'lucide-react';

interface Props {
  destination: Destination;
  matchedPackages: PackageTour[];
  relatedDestinations: Destination[];
}

export function DestinationDetailClient({
  destination,
  matchedPackages,
  relatedDestinations,
}: Props) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPackageTitle, setSelectedPackageTitle] = useState('');

  const openEnquiryForPackage = (pkgTitle: string) => {
    setSelectedPackageTitle(pkgTitle);
    setEnquiryOpen(true);
  };

  const openEnquiryForDestination = () => {
    setSelectedPackageTitle('');
    setEnquiryOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left / Main Column */}
        <div className="lg:col-span-8 space-y-12">
          {/* Destination Description & Highlights */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E0D3] shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                About {destination.name}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Travel Essentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70">
                <div className="p-2 rounded-lg bg-[#C59B27]/15 text-[#C59B27] flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                    Ideal Visiting Season
                  </span>
                  <span className="text-sm font-semibold text-stone-800">
                    {destination.bestTime}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70">
                <div className="p-2 rounded-lg bg-[#C59B27]/15 text-[#C59B27] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                    Recommended Duration
                  </span>
                  <span className="text-sm font-semibold text-stone-800">
                    {destination.idealDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* Curated Highlights */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-base font-serif font-bold text-[#0A1428] mb-3">
                Signature Experiences in {destination.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700 bg-stone-50/70 p-2.5 rounded-lg border border-stone-200/50"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0A1428] text-[#E5C07B] flex items-center justify-center flex-shrink-0 text-[10px]">
                      ✓
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Curated Packages Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#C59B27] block mb-1">
                  Ready-To-Book Itineraries
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                  Handcrafted Packages Featuring {destination.name}
                </h2>
              </div>
            </div>

            {matchedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                        <Image
                          src={pkg.heroImage}
                          alt={pkg.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1428]/90 backdrop-blur-xs text-[#F3E8C8] text-xs font-bold border border-[#C59B27]/40">
                            <Clock className="w-3 h-3 text-[#C59B27]" />
                            {pkg.duration}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3 text-stone-300 text-xs truncate">
                          Route: {pkg.route}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-lg font-serif font-bold text-[#0A1428] group-hover:text-[#C59B27] transition-colors leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {pkg.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pkg.highlightTags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-[#FAF8F5] text-stone-700 text-[11px] border border-stone-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => openEnquiryForPackage(pkg.title)}
                        className="text-xs font-semibold text-stone-600 hover:text-[#0A1428] transition-colors py-1.5"
                      >
                        Customise
                      </button>
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0A1428] text-[#F3E8C8] text-xs font-semibold hover:bg-[#16274B] transition-colors"
                      >
                        <span>Full Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C59B27]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-[#C59B27] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#0A1428]">
                  Design a Tailor-Made {destination.name} Journey
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  While we don’t list off-the-shelf fixed tours for {destination.name}, our private travel desk designs completely bespoke itineraries tailored to your dates, choice of accommodation, and vehicle preferences.
                </p>
                <button
                  type="button"
                  onClick={openEnquiryForDestination}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1428] text-[#F3E8C8] text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  Request Bespoke Itinerary
                </button>
              </div>
            )}
          </section>

          {/* Related Destinations */}
          {relatedDestinations.length > 0 && (
            <section className="pt-6 border-t border-stone-200 space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#0A1428]">
                Explore Nearby & Complementary Gateways
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedDestinations.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/destinations/${rel.slug}`}
                    className="group rounded-xl overflow-hidden bg-white border border-stone-200 hover:border-[#C59B27] transition-all shadow-xs"
                  >
                    <div className="relative h-28 w-full overflow-hidden">
                      <Image
                        src={rel.heroImage}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                        <span className="font-serif font-bold text-sm block">
                          {rel.name}
                        </span>
                        <span className="text-[10px] text-stone-300">
                          {rel.region}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Sticky Trip Planning Consultation Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#0A1428] text-white rounded-3xl p-6 sm:p-7 border border-[#233554] shadow-xl space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                  Private Concierge
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Plan a Custom {destination.name} Trip
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  Connect directly with our travel designers at Mandir Marg, New Delhi. Every detail arranged according to your wishes.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-stone-300 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                  <span>Dedicated Private Chauffeur</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                  <span>Audited Heritage & Luxury Hotels</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                  <span>24x7 Direct Guest Assistance</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={openEnquiryForDestination}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#DFB743] text-[#0A1428] font-bold text-xs tracking-wider uppercase hover:scale-[1.02] transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Custom Quote
                </button>

                <a
                  href={`https://wa.me/919312640072?text=${encodeURIComponent(
                    `Hello Lobo Travels, I would like to plan a custom trip to ${destination.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-semibold text-xs transition-colors border border-[#25D366]/40"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp Desk
                </a>
              </div>

              <div className="pt-2 text-center text-[11px] text-stone-400">
                Direct Call: <a href="tel:9312640072" className="text-white hover:text-[#C59B27] font-semibold">9312640072</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultDestination={destination.name}
        defaultPackageName={selectedPackageTitle}
      />
    </div>
  );
}
