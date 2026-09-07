'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { COMPANY_DETAILS } from '@/lib/data';
import { submitEnquiryToSheet } from '@/lib/sheets';
import {
  FORM_DESTINATION_GROUPS,
  ADULT_OPTIONS,
  CHILDREN_OPTIONS,
  getTodayDateString,
} from '@/lib/form-options';
import {
  X,
  Phone,
  Calendar,
  Users,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultPackageName?: string;
  initialTab?: 'instant' | 'form';
}

export function EnquiryModal({
  isOpen,
  onClose,
  defaultDestination = '',
  defaultPackageName = '',
  initialTab = 'instant',
}: EnquiryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      id="enquiry-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <EnquiryModalForm
        key={`${defaultDestination}-${defaultPackageName}-${initialTab}`}
        onClose={onClose}
        defaultDestination={defaultDestination}
        defaultPackageName={defaultPackageName}
        initialTab={initialTab}
      />
    </div>
  );
}

function EnquiryModalForm({
  onClose,
  defaultDestination,
  defaultPackageName,
  initialTab,
}: {
  onClose: () => void;
  defaultDestination: string;
  defaultPackageName: string;
  initialTab: 'instant' | 'form';
}) {
  const today = useMemo(() => getTodayDateString(), []);

  // Compute initial destination selection
  const initialDestination = useMemo(() => {
    if (!defaultDestination) return '';
    const flatOptions = FORM_DESTINATION_GROUPS.flatMap((g) => g.options);
    const exactMatch = flatOptions.find(
      (opt) => opt.toLowerCase() === defaultDestination.toLowerCase()
    );
    if (exactMatch) return exactMatch;
    const partialMatch = flatOptions.find((opt) =>
      opt.toLowerCase().includes(defaultDestination.toLowerCase())
    );
    return partialMatch || defaultDestination;
  }, [defaultDestination]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: initialDestination,
    fromDate: '',
    toDate: '',
    adults: '2 Adults',
    children: '0 Children',
    requirements: defaultPackageName ? `Enquiring regarding: ${defaultPackageName}` : '',
  });

  const [activeTab, setActiveTab] = useState<'instant' | 'form'>(initialTab);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate day count between fromDate and toDate
  const tripDurationDays = useMemo(() => {
    if (!formData.fromDate || !formData.toDate) return null;
    const start = new Date(formData.fromDate);
    const end = new Date(formData.toDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return null;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }, [formData.fromDate, formData.toDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const travelersString = `${formData.adults}${
      formData.children !== '0 Children' ? `, ${formData.children}` : ''
    }`;
    const datesString =
      formData.fromDate && formData.toDate
        ? `${formData.fromDate} to ${formData.toDate}${tripDurationDays ? ` (${tripDurationDays} Days)` : ''}`
        : formData.fromDate
        ? `From ${formData.fromDate}`
        : 'Flexible dates';

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        const storedLeads = JSON.parse(localStorage.getItem('lobo_enquiries') || '[]');
        storedLeads.push({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          travelDates: datesString,
          adults: formData.adults,
          children: formData.children,
          travelers: travelersString,
          requirements: formData.requirements,
          submittedAt: new Date().toISOString(),
          id: 'LT-' + Math.floor(100000 + Math.random() * 900000),
        });
        localStorage.setItem('lobo_enquiries', JSON.stringify(storedLeads));
      } catch (err) {
        console.error('Storage error', err);
      }
    }, 500);
  };

  const generateWhatsAppUrl = (includeFormData = true) => {
    let text = 'Hello Lobo Travels! I would like to plan a custom trip in India.';
    if (includeFormData && (formData.destination || formData.name)) {
      const travelersString = `${formData.adults}${
        formData.children !== '0 Children' ? `, ${formData.children}` : ''
      }`;
      const datesString =
        formData.fromDate && formData.toDate
          ? `${formData.fromDate} to ${formData.toDate}`
          : formData.fromDate
          ? `From ${formData.fromDate}`
          : 'Flexible dates';

      text =
        `Hello Lobo Travels! I would like to enquire about a curated journey.\n` +
        `• Name: ${formData.name || 'Traveler'}\n` +
        `• Destination: ${formData.destination || 'Custom Selection'}\n` +
        `• Travel Dates: ${datesString}\n` +
        `• Travelers: ${travelersString}\n` +
        (formData.phone ? `• Phone: ${formData.phone}\n` : '') +
        (formData.requirements ? `• Notes: ${formData.requirements}` : '');
    }
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border border-stone-200 p-5 sm:p-7 text-[#0A1128] shadow-2xl rounded-none font-sans"
      id="enquiry-modal-content"
    >
      <button
        onClick={onClose}
        id="close-enquiry-modal-btn"
        className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#0A1128] transition-colors rounded-full hover:bg-stone-100"
        aria-label="Close dialog"
      >
        <X className="w-5 h-5" />
      </button>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C5A059]/20 text-[#C5A059] font-bold text-xl">
            ✓
          </div>
          <h3 className="text-2xl font-serif italic text-[#0A1128]">
            Itinerary Request Received
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-[#0A1128]">{formData.name}</span>. A senior travel designer from our Mandir Marg, New Delhi desk is reviewing your requirements and will reach out to you within 24 hours.
          </p>
          <div className="p-4 bg-[#F7F5F2] border border-stone-200 text-left text-xs text-stone-700 space-y-1.5">
            <p className="font-serif italic font-bold text-[#0A1128]">Your Trip Highlights:</p>
            <p>• Destination: <strong className="text-stone-900">{formData.destination || 'Custom Selection'}</strong></p>
            <p>• Dates: <strong className="text-stone-900">{formData.fromDate && formData.toDate ? `${formData.fromDate} to ${formData.toDate} (${tripDurationDays || ''} days)` : 'Flexible'}</strong></p>
            <p>• Travelers: <strong className="text-stone-900">{formData.adults}{formData.children !== '0 Children' ? `, ${formData.children}` : ''}</strong></p>
            <p>• Contact: {formData.phone} | {formData.email}</p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={generateWhatsAppUrl(true)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Instantly on WhatsApp
            </a>
            <a
              href={`tel:${COMPANY_DETAILS.phones[0].number}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0A1128] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A1128] transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Call Concierge Now
            </a>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="pt-2 text-xs text-stone-500 hover:text-stone-800 underline uppercase tracking-wider"
          >
            Close Window
          </button>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="mb-4 pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059]">
                Lobo Travels Concierge
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-700 font-semibold tracking-wide">
                Live Support
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif italic text-[#0A1128] leading-snug">
              {defaultPackageName ? `Enquire: ${defaultPackageName}` : 'Plan Your Bespoke Journey'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Connect directly via Call or WhatsApp, or fill out the form below for a tailored itinerary.
            </p>
          </div>

          {/* Segmented Mode Selector: Call or WhatsApp VS Fill a Form */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 border border-stone-200 mb-5">
            <button
              type="button"
              id="modal-tab-instant"
              onClick={() => setActiveTab('instant')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'instant'
                  ? 'bg-[#0A1128] text-[#C5A059] shadow-md border-b-2 border-[#C5A059]'
                  : 'text-stone-600 hover:text-[#0A1128] bg-white border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>Call or WhatsApp</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <button
              type="button"
              id="modal-tab-form"
              onClick={() => setActiveTab('form')}
              className={`py-2.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#0A1128] text-[#C5A059] shadow-md border-b-2 border-[#C5A059]'
                  : 'text-stone-600 hover:text-[#0A1128] bg-white border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
              <span>Fill a Form</span>
            </button>
          </div>

          {activeTab === 'instant' ? (
            /* ========================================================
               OPTION 1: CALL & WHATSAPP INSTANT REACH
               ======================================================== */
            <div className="space-y-4">
              <div className="bg-[#FAF7F2] border border-[#C5A059]/30 p-3.5 flex items-start gap-3">
                <div className="p-2 bg-[#0A1128] text-[#C5A059] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0A1128]">
                    Direct Travel Desk • Zero Wait Time
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Connect directly with our senior travel designer in New Delhi for instant quotes, route recommendations, hotel availability, and transparent pricing.
                  </p>
                </div>
              </div>

              {/* Call Option Card */}
              <div className="border border-stone-200 p-4 bg-white hover:border-[#C5A059] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#C5A059]" />
                    Option A: Direct Telephone Call
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live Support
                  </span>
                </div>
                <p className="text-sm font-bold text-[#0A1128] mb-0.5">
                  Lobo Travels Senior Concierge Desk
                </p>
                <p className="text-xs text-stone-500 mb-3">
                  Mandir Marg, New Delhi • 9:00 AM – 9:00 PM IST (Mon – Sun)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                    id="modal-call-primary-btn"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0A1128] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#0A1128] transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Call {COMPANY_DETAILS.phones[0].display}</span>
                  </a>
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[1].number}`}
                    id="modal-call-secondary-btn"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 border border-stone-300 text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-stone-200 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-600" />
                    <span>Alt: {COMPANY_DETAILS.phones[1].display}</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Option Card */}
              <div className="border border-emerald-200 p-4 bg-emerald-50/20 hover:border-emerald-500 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-800 flex items-center gap-1.5">
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    Option B: WhatsApp Chat
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    Replies in ~3 mins
                  </span>
                </div>
                <p className="text-sm font-bold text-[#0A1128] mb-0.5">
                  Instant WhatsApp Travel Concierge
                </p>
                <p className="text-xs text-stone-600 mb-3">
                  Get custom day-by-day itineraries, hotel photos, pricing breakdown, and vehicle options directly on WhatsApp.
                </p>

                <a
                  href={generateWhatsAppUrl(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-whatsapp-primary-btn"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Chat (+91 93126 40072)</span>
                </a>

                {/* Quick topic chips for WhatsApp */}
                <div className="mt-3 pt-3 border-t border-emerald-100">
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-stone-500 mb-1.5">
                    Or tap a topic to launch pre-filled chat:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      defaultPackageName ? `Enquire about ${defaultPackageName}` : 'Golden Triangle Tour',
                      'Rajasthan Heritage Circuit',
                      'Kashmir Valley Holiday',
                      'Luxury Chauffeur & Cab Hire',
                      'Chardham Yatra Pilgrimage',
                    ].map((topic) => (
                      <a
                        key={topic}
                        href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                          `Hello Lobo Travels! I would like to enquire about: ${topic}. Please share details and pricing.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] px-2.5 py-1 bg-white border border-stone-200 hover:border-emerald-500 hover:text-emerald-700 text-stone-700 rounded-full transition-colors flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 text-[#25D366]" />
                        <span>{topic}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Option C: Switch to Form CTA */}
              <div className="p-3.5 bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <p className="text-xs font-bold text-[#0A1128]">
                    Prefer a written custom itinerary proposal?
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Provide your dates, guest count, and preferences in our form.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  id="modal-switch-to-form-btn"
                  className="shrink-0 px-4 py-2 bg-white border border-stone-300 hover:border-[#0A1128] text-xs font-bold text-[#0A1128] uppercase tracking-wider hover:bg-[#0A1128] hover:text-white transition-all cursor-pointer"
                >
                  Fill Enquiry Form →
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================
               OPTION 2: COMPLETE ENQUIRY FORM
               ======================================================== */
            <div className="space-y-3.5">
              {/* Quick top reminder inside form */}
              <div className="p-2.5 bg-[#FAF7F2] border border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-600">
                  Prefer instant answers?
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0].number}`}
                    className="inline-flex items-center gap-1 font-bold text-[#0A1128] hover:text-[#C5A059] uppercase tracking-wider text-[10px]"
                  >
                    <Phone className="w-3 h-3 text-[#C5A059]" />
                    Call Us
                  </a>
                  <span className="text-stone-300">|</span>
                  <a
                    href={generateWhatsAppUrl(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider text-[10px]"
                  >
                    <MessageCircle className="w-3 h-3 text-[#25D366]" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5" id="consultation-enquiry-form">
            {/* 1. Destination of Interest Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  Destination of Interest *
                </span>
                <span className="text-[9px] text-stone-400 font-normal lowercase">choose from 22+ circuits</span>
              </label>
              <div className="relative">
                <select
                  required
                  id="enquiry-destination-select"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full border-b border-stone-300 py-2 pr-7 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128] [&>optgroup]:bg-white [&>optgroup]:text-stone-500 [&>optgroup]:font-bold"
                >
                  <option value="">Select Destination / Circuit *</option>
                  {/* If custom destination is pre-selected and not in groups, show it */}
                  {formData.destination &&
                    !FORM_DESTINATION_GROUPS.some((g) => g.options.includes(formData.destination)) && (
                      <option value={formData.destination}>{formData.destination}</option>
                    )}
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
                <ChevronDown className="w-4 h-4 text-stone-400 absolute right-1 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* 2. Travel Month / Dates (Calendar with From and To options) */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C5A059]" />
                  Travel Month / Dates (Calendar)
                </span>
                {tripDurationDays && (
                  <span className="text-[10px] text-[#C5A059] font-bold tracking-wide">
                    {tripDurationDays} Days Journey
                  </span>
                )}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                    From (Departure) *
                  </span>
                  <input
                    type="date"
                    required
                    id="enquiry-from-date"
                    min={today}
                    value={formData.fromDate}
                    onChange={(e) => {
                      const newFrom = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        fromDate: newFrom,
                        // If toDate is before new fromDate, clear or adjust it
                        toDate: prev.toDate && prev.toDate < newFrom ? newFrom : prev.toDate,
                      }));
                    }}
                    className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer font-sans"
                  />
                </div>
                <div className="relative">
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                    To (Return)
                  </span>
                  <input
                    type="date"
                    id="enquiry-to-date"
                    min={formData.fromDate || today}
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer font-sans"
                  />
                </div>
              </div>
            </div>

            {/* 3. Travelers (Dropdown with Adults and Children options) */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#C5A059]" />
                Travelers Count *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                    Adults (12+ yrs)
                  </span>
                  <select
                    id="enquiry-adults-select"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full border-b border-stone-300 py-1.5 pr-6 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                  >
                    {ADULT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-6 pointer-events-none" />
                </div>

                <div className="relative">
                  <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                    Children (0-11 yrs)
                  </span>
                  <select
                    id="enquiry-children-select"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="w-full border-b border-stone-300 py-1.5 pr-6 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                  >
                    {CHILDREN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-6 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 4. Contact Details: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  id="enquiry-name-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent placeholder:text-stone-400"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  id="enquiry-phone-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9312640072"
                  className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* 5. Email Address */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                id="enquiry-email-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent placeholder:text-stone-400"
              />
            </div>

            {/* 6. Special Requests */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                id="enquiry-notes-input"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="e.g. Luxury heritage stays, chauffeured sedan, senior-friendly pacing..."
                className="w-full border-b border-stone-300 py-1.5 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent placeholder:text-stone-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                id="enquiry-submit-btn"
                className="w-full py-3.5 bg-[#0A1128] text-white hover:bg-[#C5A059] hover:text-[#0A1128] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md disabled:opacity-75 cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting Request...' : 'Get Custom Itinerary'}
                </span>
              </button>
            </div>

            {/* Footer Assurance */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 pt-1 text-[11px] text-stone-500 border-t border-stone-100">
              <span>🔒 100% Private. No spam, only direct concierge planning.</span>
              <a
                href={generateWhatsAppUrl(false)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#0A1128] hover:text-[#C5A059] font-bold uppercase tracking-wider text-[10px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp us directly
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  )}
</div>
  );
}
