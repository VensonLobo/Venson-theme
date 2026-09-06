'use client';

import React from 'react';
import { WHY_CHOOSE_US } from '@/lib/data';
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Users,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  PhoneCall: PhoneCall,
  ShieldCheck: ShieldCheck,
  Users: Users,
  CreditCard: CreditCard,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#F7F5F2] text-[#0A1128] border-b border-gray-200" id="why-choose-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059] mb-2">
            The Lobo Travels Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic text-[#0A1128]">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Designed for those who value personal care, authentic pacing, and zero operational friction.
          </p>
        </div>

        {/* 5-Item Grid with Clean Line Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
            return (
              <div
                key={item.title}
                className="flex flex-col items-start p-6 bg-white border border-gray-200 hover:border-[#C5A059] transition-all duration-300 group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 bg-[#0A1128] text-[#C5A059] flex items-center justify-center mb-5 group-hover:bg-[#C5A059] group-hover:text-[#0A1128] transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-serif italic font-bold text-[#0A1128] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 p-6 bg-[#0A1128] border border-white/10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center flex-shrink-0 text-[#C5A059]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-serif italic text-white">
                Direct Travel Desk in Mandir Marg, New Delhi
              </p>
              <p className="text-xs text-stone-400 mt-0.5 font-light">
                Visit our office or call anytime for personal itinerary consultation with our senior directors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <a
              href="tel:9312640072"
              className="px-4 py-2 border border-white/20 hover:border-[#C5A059] hover:text-[#C5A059] text-white transition-colors"
            >
              Call +91 9312640072
            </a>
            <a
              href="https://wa.me/919312640072"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#C5A059] text-[#0A1128] hover:bg-white transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
