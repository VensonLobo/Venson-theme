'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-[#F7F5F2] text-[#0A1128] border-b border-gray-200" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059] mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            Verified Traveler Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0A1128]">
            Stories From Curated Journeys
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Read what travelers say about our personalized itineraries, private chauffeurs, and responsive on-trip care.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 border border-gray-200 shadow-xs relative">
          <div className="absolute top-6 right-8 text-[#C5A059]/15 pointer-events-none">
            <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-2 border-[#C5A059] flex-shrink-0">
              <Image
                src={current.avatar}
                alt={current.author}
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>

            {/* Quote and Author */}
            <div className="flex-1 text-center md:text-left space-y-4">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#C5A059]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg font-serif italic text-[#0A1128] leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-gray-100">
                <div className="font-serif italic font-bold text-[#0A1128] text-base">
                  {current.author}
                </div>
                <div className="text-xs text-stone-500">
                  {current.location} • <span className="text-[#C5A059] font-medium uppercase tracking-wider text-[11px]">{current.trip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#0A1128]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                id="prev-testimonial-btn"
                className="p-2.5 border border-gray-300 hover:border-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all text-stone-700"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                id="next-testimonial-btn"
                className="p-2.5 border border-gray-300 hover:border-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all text-stone-700"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
