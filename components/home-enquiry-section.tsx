'use client';

import React, { useState, useMemo } from 'react';
import { COMPANY_DETAILS } from '@/lib/data';
import {
  FORM_DESTINATION_GROUPS,
  ADULT_OPTIONS,
  CHILDREN_OPTIONS,
  getTodayDateString,
} from '@/lib/form-options';
import {
  Send,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Phone,
  Calendar,
  Users,
  ChevronDown,
} from 'lucide-react';

export function HomeEnquirySection() {
  const today = useMemo(() => getTodayDateString(), []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    fromDate: '',
    toDate: '',
    adults: '2 Adults',
    children: '0 Children',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const datesString =
      formData.fromDate && formData.toDate
        ? `${formData.fromDate} to ${formData.toDate}`
        : formData.fromDate
        ? `From ${formData.fromDate}`
        : 'Flexible dates';

    const travelersString = `${formData.adults}${
      formData.children !== '0 Children' ? `, ${formData.children}` : ''
    }`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        const stored = JSON.parse(localStorage.getItem('lobo_enquiries') || '[]');
        stored.push({
          ...formData,
          travelDates: datesString,
          travelers: travelersString,
          source: 'home_lead_form',
          submittedAt: new Date().toISOString(),
          id: 'LT-' + Math.floor(100000 + Math.random() * 900000),
        });
        localStorage.setItem('lobo_enquiries', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }
    }, 600);
  };

  const getWhatsAppUrl = () => {
    const datesString =
      formData.fromDate && formData.toDate
        ? `${formData.fromDate} to ${formData.toDate}`
        : formData.fromDate
        ? `From ${formData.fromDate}`
        : 'Flexible';

    const travelersString = `${formData.adults}${
      formData.children !== '0 Children' ? `, ${formData.children}` : ''
    }`;

    const text = encodeURIComponent(
      `Hello Lobo Travels! I would like to plan a custom trip.\n` +
      `• Name: ${formData.name || 'Traveler'}\n` +
      `• Destination: ${formData.destination || 'India'}\n` +
      `• Travelers: ${travelersString}\n` +
      `• Dates: ${datesString}\n` +
      (formData.requirements ? `• Notes: ${formData.requirements}` : '')
    );
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`;
  };

  return (
    <section className="py-24 bg-[#0A1128] text-white relative overflow-hidden border-t border-white/10" id="home-enquiry-section">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Tailored Itinerary Request
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white leading-tight">
              Let’s Plan <br />
              <span className="text-[#C5A059]">
                Your Journey
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              Every route is drawn around your preferences. Whether you seek a leisurely heritage exploration in Rajasthan, an alpine retreat in Manali, or a sacred pilgrimage through Garhwal, our senior trip planners craft every day around you.
            </p>

            <div className="pt-4 border-t border-white/10 space-y-3.5 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Itemized private quote with transparent inclusions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Audited 4-5 star heritage hotels & verified chauffeur</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] flex-shrink-0 text-xs font-bold">
                  ✓
                </div>
                <span>Direct on-trip concierge desk active 24/7</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 font-bold">Need immediate consultation?</p>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Connect on WhatsApp Desk Now
              </a>
            </div>
          </div>

          {/* Right Column: High-Converting Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 text-[#0A1128] border border-gray-200 shadow-2xl">
              {submitted ? (
                <div className="py-10 text-center space-y-4 bg-[#F7F5F2] p-8 border border-stone-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C5A059]/20 text-[#C5A059] mb-2 font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-serif italic text-[#0A1128]">
                    Your Itinerary Consultation Is Underway
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-[#0A1128]">{formData.name}</span>. A senior travel specialist from our New Delhi office has received your details and will call you with a tailored itinerary within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-[#0A1128] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#0A1128] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="home-lead-capture-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        id="home-form-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Singhania"
                        className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        id="home-form-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9312640072"
                        className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        id="home-form-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="radhika@example.com"
                        className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center justify-between">
                        <span>Destination *</span>
                        <span className="text-[9px] text-[#C5A059] font-normal lowercase">22+ circuits</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          id="home-form-destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="w-full border-b border-gray-200 py-2 pr-6 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128] [&>optgroup]:bg-white [&>optgroup]:text-stone-500 [&>optgroup]:font-bold"
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
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Travel Dates: Calendar From & To */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C5A059]" />
                      <span>Travel Dates (Calendar)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                          From (Departure) *
                        </span>
                        <input
                          type="date"
                          required
                          id="home-form-from-date"
                          min={today}
                          value={formData.fromDate}
                          onChange={(e) => {
                            const newFrom = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              fromDate: newFrom,
                              toDate: prev.toDate && prev.toDate < newFrom ? newFrom : prev.toDate,
                            }));
                          }}
                          className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                          To (Return)
                        </span>
                        <input
                          type="date"
                          id="home-form-to-date"
                          min={formData.fromDate || today}
                          value={formData.toDate}
                          onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                          className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travelers: Adults and Children dropdowns */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#C5A059]" />
                      <span>Travelers *</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                          Adults (12+ yrs)
                        </span>
                        <select
                          id="home-form-adults"
                          value={formData.adults}
                          onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                          className="w-full border-b border-gray-200 py-2 pr-6 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                        >
                          {ADULT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-7 pointer-events-none" />
                      </div>

                      <div className="relative">
                        <span className="block text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-0.5">
                          Children (0-11 yrs)
                        </span>
                        <select
                          id="home-form-children"
                          value={formData.children}
                          onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                          className="w-full border-b border-gray-200 py-2 pr-6 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent cursor-pointer appearance-none [&>option]:bg-white [&>option]:text-[#0A1128]"
                        >
                          {CHILDREN_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-1 top-7 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
                      Preferences or Special Requirements
                    </label>
                    <textarea
                      rows={2}
                      id="home-form-requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="e.g. Want a sunrise Taj Mahal guide, heritage haveli in Jaipur, wheelchair assistance for parents..."
                      className="w-full border-b border-gray-200 py-2 text-sm text-[#0A1128] focus:border-[#C5A059] outline-none transition-all bg-transparent"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="home-form-submit-btn"
                      className="w-full py-4 bg-[#0A1128] text-white hover:bg-[#C5A059] hover:text-[#0A1128] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-md disabled:opacity-75"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        {isSubmitting ? 'Transmitting Request...' : 'Get a Custom Itinerary'}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
