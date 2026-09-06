import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { COMPANY_DETAILS, WHY_CHOOSE_US } from '@/lib/data';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  MapPin,
  Phone,
  ArrowRight,
  HeartHandshake,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Lobo Travels | Bespoke Journey Designers in Mandir Marg, New Delhi',
  description:
    'Learn about Lobo Travels: a 30-year legacy of private, curated travel across India. Based at Mandir Marg, New Delhi. Unhurried itineraries, handpicked stays, and dedicated personal chauffeurs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative bg-[#0A1428] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=80"
              alt="About Lobo Travels"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428] via-[#0A1428]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5" />
              30+ Years of Curated Craftsmanship
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Curated Journeys, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6C8] to-[#C59B27]">
                Never Off The Shelf
              </span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed">
              Based in the historic heart of Mandir Marg, New Delhi, Lobo Travels was founded with a singular conviction: travel through India should feel intimate, dignified, and crafted around the individual traveler.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] block">
                Our Origin & Conviction
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1428] leading-tight">
                Rejecting The Cookie-Cutter Tour Bus Model
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Most Indian travel agencies run on identical formulas: cramped group coaches, hurried 20-minute monument stops, commissioned souvenir traps, and generic hotel chains.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                At <strong>Lobo Travels</strong>, we set out to build something noticeably different. Every journey we plan begins with a blank sheet of paper and an honest conversation about how you like to wake up, what you enjoy eating, and which sights truly inspire you.
              </p>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E0D3] shadow-xs space-y-2">
                <p className="text-xs font-serif italic text-stone-800 leading-relaxed">
                  &ldquo;Our clients do not want a tour guide reciting dates through a megaphone. They want a quiet morning at the Taj Mahal before the crowds arrive, an immaculate private car waiting with a smiling driver, and an authentic boutique haveli that feels like a home.&rdquo;
                </p>
                <span className="block text-xs font-bold text-[#0A1428] pt-1">
                  — The Travel Desk, Lobo Travels, Mandir Marg
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80"
                  alt="Curated travel experiences"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#E5C07B] font-semibold">
                    Mandir Marg, New Delhi
                  </span>
                  <h3 className="text-xl font-serif font-bold mt-1">
                    Serving Discerning Indian & Global Travelers
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Four Pillars */}
        <section className="py-16 bg-[#F4EFE6] border-y border-[#E8DFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] block mb-2">
                Our Standards
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#0A1428]">
                The Four Pillars of Lobo Travels
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1428] text-[#E5C07B] flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A1428]">
                  Direct Accountability
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We are a licensed, permanent Delhi tour operator. No faceless call centers or automated ticket bots. You speak directly to our directors and coordinators.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1428] text-[#E5C07B] flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A1428]">
                  Verified Executive Chauffeurs
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our drivers are career professionals trained in courteous navigation, mountain highway safety, and prompt luggage assistance with sanitized, modern fleet vehicles.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1428] text-[#E5C07B] flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A1428]">
                  Personally Audited Stays
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We verify properties for cleanliness, heritage character, culinary quality, and peaceful acoustics before adding them to any Lobo Travels itinerary.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1428] text-[#E5C07B] flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A1428]">
                  Itemized Financial Transparency
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  No surprise parking surcharges, fuel levies, or mandatory shopping stop traps. Every single inclusion is documented clearly in your written voucher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-16 bg-[#0A1428] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {COMPANY_DETAILS.stats.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#E5C07B]">
                    {s.value}
                  </div>
                  <div className="text-xs text-stone-300 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Invitation Banner */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E0D3] shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                Visit Our Delhi Travel Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428]">
                Join Us For Coffee & Trip Planning
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you live in Delhi NCR or are arriving from abroad, drop by our NDMC Market office at Mandir Marg to review route maps, discuss hotel tiers, and meet the team.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-stone-700">
                <span className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-[#C59B27]" />
                  Mandir Marg, New Delhi – 110001
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Phone className="w-4 h-4 text-[#C59B27]" />
                  9312640072
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#0A1428] hover:bg-[#16294D] text-[#F3E8C8] text-xs font-bold uppercase tracking-wider transition-all text-center"
              >
                View Location & Maps
              </Link>
              <Link
                href="/destinations"
                className="px-6 py-3 rounded-full bg-[#FAF8F5] border border-stone-300 text-stone-800 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-all text-center"
              >
                Browse Destinations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
