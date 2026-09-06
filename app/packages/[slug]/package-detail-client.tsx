'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PackageTour } from '@/lib/data';
import { EnquiryModal } from '@/components/enquiry-modal';
import {
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Calendar,
  Utensils,
  Hotel,
  MessageCircle,
  Phone,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface Props {
  pkg: PackageTour;
  relatedPackages: PackageTour[];
}

export function PackageDetailClient({ pkg, relatedPackages }: Props) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]); // default first 2 open
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const toggleAllDays = () => {
    if (expandedDays.length === pkg.itinerary.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(pkg.itinerary.map((d) => d.day));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content (Day-by-day Itinerary, Inclusions, FAQs) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Key Highlights Strip */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E0D3] shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#0A1428] mb-4">
              Signature Itinerary Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.highlightTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/70"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0A1428] text-[#E5C07B] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span className="font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Day-by-day Itinerary */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#C59B27] block mb-1">
                  Chronological Breakdown
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                  Detailed Day-by-Day Journey
                </h2>
              </div>

              <button
                type="button"
                onClick={toggleAllDays}
                className="text-xs font-semibold text-[#C59B27] hover:text-[#9A7817] transition-colors"
              >
                {expandedDays.length === pkg.itinerary.length ? 'Collapse All' : 'Expand All Days'}
              </button>
            </div>

            <div className="space-y-4">
              {pkg.itinerary.map((day) => {
                const isOpen = expandedDays.includes(day.day);
                return (
                  <div
                    key={day.day}
                    className="bg-white rounded-2xl border border-[#E7E0D3] overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleDay(day.day)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-xl bg-[#0A1428] text-[#E5C07B] flex items-center justify-center font-serif font-bold text-sm flex-shrink-0">
                          D{day.day}
                        </span>
                        <div>
                          <h3 className="text-base sm:text-lg font-serif font-bold text-[#0A1428]">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {day.description}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#C59B27]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 space-y-4 text-sm text-stone-700">
                        <p className="leading-relaxed text-xs sm:text-sm text-stone-600">
                          {day.description}
                        </p>

                        {day.activities && day.activities.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                              Day Highlights & Experiences:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((act, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-md bg-[#FAF8F5] text-stone-700 text-xs border border-stone-200"
                                >
                                  • {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-100 text-xs">
                          <div className="flex items-center gap-2 text-stone-600">
                            <Hotel className="w-4 h-4 text-[#C59B27]" />
                            <span>
                              <strong>Overnight:</strong> {day.overnight}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-stone-600">
                            <Utensils className="w-4 h-4 text-[#C59B27]" />
                            <span>
                              <strong>Meals:</strong> {day.meals}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#C59B27] block mb-1">
                Transparency First
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                Inclusions & Exclusions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DCE8D8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-lg pb-2 border-b border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>What’s Included</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F0DFD8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-rose-900 font-serif font-bold text-lg pb-2 border-b border-rose-100">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>What’s Not Included</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Accordion */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#C59B27] block mb-1">
                Common Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {pkg.faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E7E0D3] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-stone-900 hover:text-[#C59B27] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#C59B27]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Related Packages */}
          {relatedPackages.length > 0 && (
            <section className="pt-8 border-t border-stone-200 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-[#0A1428]">
                Other Journeys You May Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPackages.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/packages/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#C59B27] shadow-xs hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={rel.heroImage}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="300px"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[#F3E8C8] text-[10px] font-bold">
                        {rel.duration}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="font-serif font-bold text-sm text-[#0A1428] group-hover:text-[#C59B27] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#C59B27]">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#0A1428] text-white rounded-3xl p-6 sm:p-7 border border-[#233554] shadow-2xl space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                  Private Customization Desk
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[#E5C07B] mt-1 font-medium">
                  {pkg.duration} • {pkg.route}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-stone-300">
                <div className="flex items-center justify-between">
                  <span>Itinerary Style:</span>
                  <span className="font-semibold text-white">Private & Unhurried</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Vehicle:</span>
                  <span className="font-semibold text-white">Dedicated AC Chauffeur</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Stays:</span>
                  <span className="font-semibold text-white">Audited 4★ / Heritage</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Concierge:</span>
                  <span className="font-semibold text-white">24x7 Direct Active</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  id="package-customise-trip-btn"
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#DFB743] hover:from-[#b38a1f] hover:to-[#ceaa35] text-[#0A1428] font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  Customise & Get Itemised Quote
                </button>

                <a
                  href={`https://wa.me/919312640072?text=${encodeURIComponent(
                    `Hello Lobo Travels, I am interested in the ${pkg.title} (${pkg.duration}). Please send details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-semibold text-xs transition-colors border border-[#25D366]/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp Desk
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-center space-y-1">
                <p className="text-[11px] text-stone-400">
                  Speak directly to our trip designer:
                </p>
                <a
                  href="tel:9312640072"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E5C07B] hover:text-white font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 9312640072 (Bookings)
                </a>
              </div>
            </div>

            {/* Quality Commitment Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E7E0D3] shadow-xs space-y-3 text-xs text-stone-600">
              <h4 className="font-serif font-bold text-sm text-[#0A1428] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                Lobo Travels Promise
              </h4>
              <p className="leading-relaxed">
                We never sub-contract your private tour to faceless third-party aggregators. Every hotel is personally audited, and our drivers are seasoned professionals who know local terrain.
              </p>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultPackageName={pkg.title}
        defaultDestination={pkg.primaryDestinationTags[0]}
      />
    </div>
  );
}
