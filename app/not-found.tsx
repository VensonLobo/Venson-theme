import React from 'react';
import Link from 'next/link';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { Compass, Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0A1428] text-[#E5C07B] mx-auto shadow-md">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
              Page Not Found • 404
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1428]">
              Off The Beaten Path
            </h1>
            <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              The itinerary or page you are looking for does not exist or has been moved. Return home to explore our curated Indian journeys.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0A1428] text-white text-xs font-semibold tracking-wide hover:bg-[#142340] transition-colors"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-800 text-xs font-semibold tracking-wide hover:bg-stone-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C59B27]" />
              Speak to Concierge
            </Link>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
