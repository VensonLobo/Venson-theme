'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_DETAILS, CATEGORIES } from '@/lib/data';
import {
  FORM_DESTINATION_GROUPS,
  ADULT_OPTIONS,
  CHILDREN_OPTIONS,
  getTodayDateString,
} from '@/lib/form-options';
import {
  ArrowRight,
  Compass,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Star,
  Shield,
  Award,
  Phone,
  MessageCircle,
  Users,
  MapPin,
} from 'lucide-react';
import { EnquiryModal } from './enquiry-modal';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=90',
    title: 'The Timeless Wonder of Agra',
    category: 'Heritage & History',
    caption: 'Private sunrise access to the Taj Mahal away from crowds',
  },
  {
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=90',
    title: 'Serene Waters of Kashmir',
    category: 'Nature & Honeymoon',
    caption: 'Carved cedar wood houseboats drifting on misty Dal Lake',
  },
  {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=90',
    title: 'Golden Hour in Rajasthan',
    category: 'Heritage & Royalty',
    caption: 'Amber Fort glowing atop rugged Aravalli ridges',
  },
  {
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=90',
    title: 'High Passes of Himachal',
    category: 'Nature & Mountains',
    caption: 'Pine-scented mountain air and roaring rivers in Solang Valley',
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const today = useMemo(() => getTodayDateString(), []);

  const [formState, setFormState] = useState({
    destination: '',
    fromDate: '',
    toDate: '',
    adults: '2 Adults',
    children: '0 Children',
    name: '',
    phone: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const datesString =
      formState.fromDate && formState.toDate
        ? `${formState.fromDate} to ${formState.toDate}`
        : formState.fromDate
        ? `From ${formState.fromDate}`
        : 'Flexible dates';

    const travelersString = `${formState.adults}${
      formState.children !== '0 Children' ? `, ${formState.children}` : ''
    }`;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      try {
        const stored = JSON.parse(localStorage.getItem('lobo_enquiries') || '[]');
        stored.push({
          ...formState,
          travelDates: datesString,
          travelers: travelersString,
          source: 'hero_plan_your_escape',
          submittedAt: new Date().toISOString(),
          id: 'LT-' + Math.floor(100000 + Math.random() * 900000),
        });
        localStorage.setItem('lobo_enquiries', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0A1128] border-b border-gray-200" id="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-5rem)]">
        {/* Left Column (Span 8): Atmospheric Visual & Editorial Showcase */}
        <div className="lg:col-span-8 relative group overflow-hidden flex flex-col justify-between min-h-[580px] lg:min-h-[720px] p-6 sm:p-10 lg:p-16">
          {/* Background Image Carousel */}
          <div className="absolute inset-0 z-0">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                } transition-transform duration-10000 ease-out`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* Geometric Balance dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128]/90 via-[#0A1128]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Top Status & Tag */}
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A059] block">
              Bespoke Itineraries
            </span>
          </div>

          {/* Middle Editorial Typography & Actions */}
          <div className="relative z-10 my-auto py-8 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white leading-tight mb-4 tracking-tight">
              Journeys Crafted <br />
              Around You
            </h1>

            <p className="text-stone-300 max-w-lg text-sm sm:text-base leading-relaxed mb-8 font-normal">
              Experience India at your own rhythm. Zero fixed templates. Purely personalized pacing, chauffeur transfers, and hand-picked heritage suites.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/destinations"
                id="hero-explore-destinations-btn"
                className="bg-[#C5A059] text-[#0A1128] px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white transition-all shadow-md active:scale-95 text-center whitespace-nowrap"
              >
                Explore Circuits
              </Link>

              <a
                href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                id="hero-call-experts-btn"
                className="border border-white/30 hover:border-[#C5A059] bg-white/5 hover:bg-white/15 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-center space-x-2 sm:space-x-3 text-white backdrop-blur-xs transition-all active:scale-95 group whitespace-nowrap flex-nowrap"
                title={`Call Lobo Travels Concierge: ${COMPANY_DETAILS.phones[0].display}`}
              >
                <Phone className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-xs uppercase tracking-wider sm:tracking-widest font-semibold group-hover:text-[#C5A059] transition-colors whitespace-nowrap">
                  Call Experts: {COMPANY_DETAILS.phones[0].display}
                </span>
              </a>
            </div>

            {/* Slide Navigation Ticks */}
            <div className="pt-8 flex items-center gap-3">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.title}
                  onClick={() => setActiveSlide(idx)}
                  className={`group flex items-center gap-2 text-xs transition-all ${
                    activeSlide === idx ? 'text-white' : 'text-stone-400 hover:text-stone-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`h-1 transition-all duration-300 ${
                      activeSlide === idx ? 'w-8 bg-[#C5A059]' : 'w-3 bg-white/30 group-hover:bg-white/60'
                    }`}
                  />
                  <span className="hidden sm:inline font-mono text-[10px]">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Filter Strip for Categories */}
          <div className="relative z-10 pt-4 border-t border-white/10" id="hero-quick-filter-bar">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/destinations?category=${cat.id}`}
                  className="group p-2.5 border border-white/15 bg-[#0A1128]/60 hover:bg-white/10 text-white transition-all flex items-center justify-between"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-[#C5A059] transition-colors">
                    {cat.title}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Span 4): Architectural White Planning Panel */}
        <div className="lg:col-span-4 bg-white p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200 text-[#0A1128]">
          <div>
            <h2 className="font-serif italic text-2xl sm:text-3xl text-[#0A1128] mb-2">
              Plan Your Escape
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              Fill in the details below for a custom-curated itinerary delivered to you within 24 hours.
            </p>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3 bg-[#F7F5F2] p-6 border border-stone-200">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="font-serif italic text-lg text-[#0A1128]">
                  Request Received
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Thank you, <span className="font-bold text-[#0A1128]">{formState.name || 'Traveler'}</span>. Our senior itinerary designer will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs text-[#0A1128] font-bold uppercase tracking-widest underline underline-offset-4"
                >
                  New Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-3.5" id="hero-quick-plan-form">
                {/* Destination Dropdown */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center justify-between">
                    <span>Destination of Interest *</span>
                    <span className="text-[9px] text-[#C5A059] font-normal lowercase">22+ circuits</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      id="hero-form-destination"
                      value={formState.destination}
                      onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                      className="w-full border-b border-gray-200 py-1.5 pr-6 focus:border-[#C5A059] outline-none text-sm bg-transparent text-[#0A1128] cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128] [&>optgroup]:bg-white [&>optgroup]:text-stone-500 [&>optgroup]:font-bold"
                    >
                      <option value="">Select Destination / Circuit *</option>
                      {FORM_DESTINATION_GROUPS.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-2 pointer-events-none" />
                  </div>
                </div>

                {/* Calendar Travel Dates: From & To */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>Travel Dates (Calendar)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                        From *
                      </span>
                      <input
                        type="date"
                        required
                        id="hero-form-from-date"
                        min={today}
                        value={formState.fromDate}
                        onChange={(e) => {
                          const newFrom = e.target.value;
                          setFormState((prev) => ({
                            ...prev,
                            fromDate: newFrom,
                            toDate: prev.toDate && prev.toDate < newFrom ? newFrom : prev.toDate,
                          }));
                        }}
                        className="w-full border-b border-gray-200 py-1 focus:border-[#C5A059] outline-none text-xs bg-transparent text-[#0A1128] cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                        To
                      </span>
                      <input
                        type="date"
                        id="hero-form-to-date"
                        min={formState.fromDate || today}
                        value={formState.toDate}
                        onChange={(e) => setFormState({ ...formState, toDate: e.target.value })}
                        className="w-full border-b border-gray-200 py-1 focus:border-[#C5A059] outline-none text-xs bg-transparent text-[#0A1128] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Travelers Dropdowns (Adults & Children) */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#C5A059]" />
                    <span>Travelers *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <select
                        id="hero-form-adults"
                        value={formState.adults}
                        onChange={(e) => setFormState({ ...formState, adults: e.target.value })}
                        className="w-full border-b border-gray-200 py-1.5 pr-5 focus:border-[#C5A059] outline-none text-xs bg-transparent text-[#0A1128] cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                      >
                        {ADULT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1 top-2 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select
                        id="hero-form-children"
                        value={formState.children}
                        onChange={(e) => setFormState({ ...formState, children: e.target.value })}
                        className="w-full border-b border-gray-200 py-1.5 pr-5 focus:border-[#C5A059] outline-none text-xs bg-transparent text-[#0A1128] cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                      >
                        {CHILDREN_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-stone-400 absolute right-1 top-2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Contact: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      id="hero-form-name"
                      placeholder="e.g. Vikram Verma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full border-b border-gray-200 py-1.5 focus:border-[#C5A059] outline-none text-sm bg-transparent text-[#0A1128] placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      id="hero-form-phone"
                      placeholder="e.g. 9312640072"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full border-b border-gray-200 py-1.5 focus:border-[#C5A059] outline-none text-sm bg-transparent text-[#0A1128] placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="hero-form-submit-btn"
                    className="w-full bg-[#0A1128] text-white py-3.5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#C5A059] hover:text-[#0A1128] transition-colors disabled:opacity-75 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Get a Custom Itinerary'}
                  </button>
                </div>

                {/* Quick Call & WhatsApp links at bottom of card */}
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                    className="inline-flex items-center gap-1 hover:text-[#C5A059] font-medium"
                    title="Call Lobo Travels desk directly"
                  >
                    <Phone className="w-3 h-3 text-[#C5A059]" />
                    <span>Call Concierge</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hello Lobo Travels! I would like to plan a custom trip in India.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-emerald-600 font-medium"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Triple Metric Counter at Panel Bottom */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-serif italic text-xl text-[#0A1128] leading-none">
                  30+
                </div>
                <div className="text-[8px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
                  Years Active
                </div>
              </div>
              <div className="border-x border-gray-100">
                <div className="font-serif italic text-xl text-[#0A1128] leading-none">
                  28k+
                </div>
                <div className="text-[8px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
                  Curated Guests
                </div>
              </div>
              <div>
                <div className="font-serif italic text-xl text-[#0A1128] leading-none">
                  4.9 / 5
                </div>
                <div className="text-[8px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </section>
  );
}
