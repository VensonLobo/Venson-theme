'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogoLink } from './brand-logo';
import { COMPANY_DETAILS, CATEGORIES, DESTINATIONS } from '@/lib/data';
import {
  Phone,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  Calendar,
} from 'lucide-react';
import { EnquiryModal } from './enquiry-modal';

export function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
  }

  // Group destinations by category
  const getDestinationsForCategory = (catId: 'nature' | 'heritage' | 'spiritual' | 'honeymoon') => {
    return DESTINATIONS.filter((d) => d.categoryTags.includes(catId));
  };

  const headerBgClass = isScrolled || !isHomePage
    ? 'bg-[#0A1128] text-white shadow-md border-b border-[#1A2540]'
    : 'bg-[#0A1128]/95 backdrop-blur-md border-b border-white/10 text-white';

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-colors duration-300">
        {/* Top Utility Bar (Desktop only) */}
        <div
          id="desktop-top-utility-bar"
          className="hidden lg:block border-b border-white/10 bg-[#070D1F] text-stone-300 transition-colors duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between text-xs tracking-wide">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                {COMPANY_DETAILS.address}
              </span>
              <span className="hidden xl:inline text-stone-600">|</span>
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="hidden xl:flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                {COMPANY_DETAILS.email}
              </a>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-stone-400 uppercase tracking-widest text-[10px] font-bold">Desk:</span>
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                  className="hover:text-[#C5A059] font-medium tracking-wider transition-colors"
                  title="Bookings & Enquiries"
                >
                  {COMPANY_DETAILS.phones[0].display}
                </a>
                <span className="text-stone-600">•</span>
                <a
                  href={`tel:${COMPANY_DETAILS.phones[1].number}`}
                  className="hover:text-[#C5A059] font-medium tracking-wider transition-colors"
                  title="Customer Support"
                >
                  {COMPANY_DETAILS.phones[1].display}
                </a>
              </div>
              <span className="text-stone-600">|</span>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hello Lobo Travels, I would like to plan a curated journey in India.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-emerald-300 font-semibold tracking-wider text-[11px] uppercase transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav
          className={`w-full transition-all duration-300 ${headerBgClass}`}
          aria-label="Main Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <LogoLink variant="white" size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest">
              <Link
                href="/"
                className={`transition-colors py-2 ${
                  pathname === '/'
                    ? 'text-[#C5A059]'
                    : 'text-stone-200 hover:text-[#C5A059]'
                }`}
              >
                Home
              </Link>

              {/* Destinations with Mega Menu */}
              <div
                className="relative group"
                onMouseEnter={() => setDestinationsOpen(true)}
                onMouseLeave={() => setDestinationsOpen(false)}
              >
                <button
                  type="button"
                  id="mega-menu-trigger-btn"
                  onClick={() => setDestinationsOpen(!destinationsOpen)}
                  className={`inline-flex items-center gap-1.5 py-2 uppercase tracking-widest transition-colors focus:outline-none ${
                    pathname.startsWith('/destinations')
                      ? 'text-[#C5A059]'
                      : 'text-stone-200 hover:text-[#C5A059]'
                  }`}
                  aria-expanded={destinationsOpen}
                >
                  Destinations
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      destinationsOpen ? 'rotate-180 text-[#C5A059]' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[920px] transition-all duration-200 ${
                    destinationsOpen
                      ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-[#0A1128] border border-[#1A2540] shadow-2xl p-6 text-stone-200">
                    <div className="grid grid-cols-4 gap-6">
                      {CATEGORIES.map((category) => {
                        const dests = getDestinationsForCategory(category.id);
                        return (
                          <div key={category.id} className="space-y-3">
                            <div className="relative h-24 w-full overflow-hidden border border-white/10 group/thumb">
                              <Image
                                src={category.thumbnail}
                                alt={category.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                                sizes="200px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/40 to-transparent" />
                              <div className="absolute bottom-2 left-2.5 right-2.5">
                                <span className="text-xs font-serif italic text-white tracking-wide block">
                                  {category.title}
                                </span>
                              </div>
                            </div>

                            <ul className="space-y-1.5 text-xs">
                              {dests.map((dest) => (
                                <li key={dest.id + category.id}>
                                  <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="block text-stone-300 hover:text-[#C5A059] hover:translate-x-1 transition-all py-0.5 normal-case font-normal"
                                  >
                                    {dest.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom persistent bar */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <p className="text-stone-400 normal-case font-normal">
                        Can’t find your desired route? We curate completely custom multi-state journeys.
                      </p>
                      <Link
                        href="/destinations"
                        className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors"
                      >
                        View All 22 Destinations
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/packages"
                className={`transition-colors py-2 ${
                  pathname.startsWith('/packages')
                    ? 'text-[#C5A059]'
                    : 'text-stone-200 hover:text-[#C5A059]'
                }`}
              >
                Packages
              </Link>

              <Link
                href="/about"
                className={`transition-colors py-2 ${
                  pathname === '/about'
                    ? 'text-[#C5A059]'
                    : 'text-stone-200 hover:text-[#C5A059]'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`transition-colors py-2 ${
                  pathname === '/contact'
                    ? 'text-[#C5A059]'
                    : 'text-stone-200 hover:text-[#C5A059]'
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-300 hover:text-[#C5A059] transition-colors"
                title="Call Lobo Travels Desk"
                aria-label="Call Us"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-semibold">{COMPANY_DETAILS.phones[0].display}</span>
              </a>

              <button
                type="button"
                id="header-enquire-now-btn"
                onClick={() => setEnquiryModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-[#0A1128] hover:bg-white hover:text-[#0A1128] font-bold text-xs tracking-widest uppercase transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Enquire Now
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                id="mobile-enquire-btn"
                onClick={() => setEnquiryModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#C5A059] text-[#0A1128] font-bold text-xs uppercase tracking-wider"
              >
                Enquire
              </button>

              <button
                type="button"
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-200 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Accordion Drawer */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden bg-[#0A1428] border-t border-white/10 px-4 py-5 max-h-[85vh] overflow-y-auto space-y-4"
              id="mobile-navigation-drawer"
            >
              <div className="flex flex-col space-y-2 text-base font-medium">
                <Link
                  href="/"
                  className="py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
                >
                  Home
                </Link>

                {/* Mobile Destinations Accordion */}
                <div className="border-y border-white/10 py-2">
                  <button
                    type="button"
                    onClick={() => setDestinationsOpen(!destinationsOpen)}
                    className="w-full flex items-center justify-between py-2 px-3 text-stone-200 hover:bg-white/5 rounded-lg"
                  >
                    <span>Destinations</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        destinationsOpen ? 'rotate-180 text-[#C59B27]' : ''
                      }`}
                    />
                  </button>

                  {destinationsOpen && (
                    <div className="pl-3 pr-1 pt-2 space-y-3">
                      {CATEGORIES.map((cat) => {
                        const isCatExpanded = mobileExpandedCat === cat.id;
                        const dests = getDestinationsForCategory(cat.id);
                        return (
                          <div key={cat.id} className="bg-white/5 rounded-xl p-3">
                            <button
                              type="button"
                              onClick={() =>
                                setMobileExpandedCat(isCatExpanded ? null : cat.id)
                              }
                              className="w-full flex items-center justify-between text-sm font-semibold text-[#E5C07B]"
                            >
                              <span>{cat.title}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isCatExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {isCatExpanded && (
                              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10 text-xs text-stone-300">
                                {dests.map((dest) => (
                                  <Link
                                    key={dest.id}
                                    href={`/destinations/${dest.slug}`}
                                    className="py-1 px-1.5 hover:text-[#C59B27]"
                                  >
                                    {dest.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <Link
                        href="/destinations"
                        className="block text-center py-2 text-xs font-semibold text-[#C59B27] bg-[#C59B27]/10 rounded-lg hover:bg-[#C59B27]/20 transition-colors"
                      >
                        View All 22 Destinations →
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/packages"
                  className="py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
                >
                  Packages & Itineraries
                </Link>
                <Link
                  href="/about"
                  className="py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="py-2 px-3 rounded-lg hover:bg-white/5 text-stone-200"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Quick Contact Bar */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                  Direct Mandir Marg Concierge
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                    className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg text-stone-200"
                  >
                    <Phone className="w-4 h-4 text-[#C59B27]" />
                    <span>Bookings: {COMPANY_DETAILS.phones[0].display}</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hello Lobo Travels, I would like to enquire on WhatsApp.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 bg-[#25D366]/10 text-[#25D366] rounded-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Travel Desk</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global Consultation Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
}
