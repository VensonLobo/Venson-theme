'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './brand-logo';
import { COMPANY_DETAILS, CATEGORIES } from '@/lib/data';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export function GlobalFooter() {
  return (
    <footer className="bg-[#0A1128] text-stone-300 border-t border-white/10 pt-16 pb-12" id="global-site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="Lobo Travels Home">
              <BrandLogo variant="white" size="lg" />
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Lobo Travels is a premier, trust-driven Indian travel atelier based at Mandir Marg, New Delhi. We design private, bespoke itineraries tailored around each traveler’s unique tempo and curiosity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A1128] flex items-center justify-center transition-colors text-stone-300"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A1128] flex items-center justify-center transition-colors text-stone-300"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/15 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A1128] flex items-center justify-center transition-colors text-stone-300"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="pt-2 text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Verified Tour Operator • Delhi NCR</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold border-b border-white/10 pb-2">
              Explore & Plan
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  All 22 Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  Featured Itineraries
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  Our Bespoke Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
                  Travel Desk & Maps
                </Link>
              </li>
              <li>
                <Link href="/destinations/delhi" className="hover:text-[#C5A059] transition-colors text-[11px] text-stone-400">
                  • Golden Triangle Circuits
                </Link>
              </li>
              <li>
                <Link href="/destinations/shimla" className="hover:text-[#C5A059] transition-colors text-[11px] text-stone-400">
                  • Himachal Mountain Passes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Journey Themes (SEO internal linking) */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold border-b border-white/10 pb-2">
              Curated Themes
            </p>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/destinations?category=${cat.id}`}
                    className="hover:text-[#C5A059] transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059]" />
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-stone-400">
                Popular routes:
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Link href="/packages/golden-triangle-tour" className="px-2 py-0.5 border border-white/10 hover:border-[#C5A059] text-[10px] text-stone-300 hover:text-white">
                    Golden Triangle
                  </Link>
                  <Link href="/packages/delhi-shimla-manali-tour" className="px-2 py-0.5 border border-white/10 hover:border-[#C5A059] text-[10px] text-stone-300 hover:text-white">
                    Shimla Manali
                  </Link>
                  <Link href="/packages/delhi-agra-haridwar-rishikesh-tour" className="px-2 py-0.5 border border-white/10 hover:border-[#C5A059] text-[10px] text-stone-300 hover:text-white">
                    Haridwar Rishikesh
                  </Link>
                  <Link href="/destinations/kashmir" className="px-2 py-0.5 border border-white/10 hover:border-[#C5A059] text-[10px] text-stone-300 hover:text-white">
                    Kashmir Dal Lake
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold border-b border-white/10 pb-2">
              Mandir Marg Travel Desk
            </p>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DETAILS.address}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-stone-400 font-semibold uppercase tracking-widest text-[10px]">Direct Phone Lines:</p>
                {COMPANY_DETAILS.phones.map((phone) => (
                  <div key={phone.number} className="flex items-center justify-between">
                    <span className="text-stone-400">{phone.label}:</span>
                    <a
                      href={`tel:${phone.number}`}
                      className="font-medium text-white hover:text-[#C5A059] transition-colors"
                    >
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-white hover:text-[#C5A059] transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-[10px] uppercase tracking-[0.25em]">© {new Date().getFullYear()} Lobo Travels. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest">
            <Link href="/privacy-policy" className="hover:text-[#C5A059] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C5A059] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
              Office Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
