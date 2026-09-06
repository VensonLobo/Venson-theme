'use client';

import React, { useState, useMemo } from 'react';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { COMPANY_DETAILS } from '@/lib/data';
import {
  FORM_DESTINATION_GROUPS,
  ADULT_OPTIONS,
  CHILDREN_OPTIONS,
  getTodayDateString,
} from '@/lib/form-options';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Building2,
  Calendar,
  Users,
  ChevronDown,
} from 'lucide-react';

export default function ContactPage() {
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
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          source: 'contact_page',
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
    const text = encodeURIComponent(
      `Hello Lobo Travels! I would like to get in touch regarding a private India itinerary.\nName: ${formData.name || 'Guest'}\nPhone: ${formData.phone || ''}`
    );
    return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-[#0A1428] text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E5C07B] mb-2">
              Mandir Marg, New Delhi
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
              Connect With Our Travel Desk
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              We welcome prospective travelers to our New Delhi office or invite you to call directly for instant consultation on custom circuits across India.
            </p>
          </div>
        </section>

        {/* Contact Info & Lead Form */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Contact Details & Office Guide */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E0D3] shadow-xs space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] block mb-1">
                    Central Delhi Office
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#0A1428]">
                    Lobo Travels Desk
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-stone-700">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-[#0A1428] text-[#E5C07B] flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-stone-900 font-semibold mb-0.5">
                        Physical Office Address:
                      </strong>
                      <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">
                        {COMPANY_DETAILS.address}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        Landmark: Convenient parking available near CNG Pump & Mandir Marg Police Station.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-2 border-t border-stone-100">
                    <div className="p-2 rounded-xl bg-[#0A1428] text-[#E5C07B] flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 w-full">
                      <strong className="block text-stone-900 font-semibold mb-1">
                        Direct Lines:
                      </strong>
                      {COMPANY_DETAILS.phones.map((phone) => (
                        <div key={phone.number} className="flex items-center justify-between text-xs">
                          <span className="text-stone-500">{phone.label}:</span>
                          <a
                            href={`tel:${phone.number}`}
                            className="font-bold text-[#0A1428] hover:text-[#C59B27] transition-colors"
                          >
                            {phone.display}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-2 border-t border-stone-100">
                    <div className="p-2 rounded-xl bg-[#0A1428] text-[#E5C07B] flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-stone-900 font-semibold mb-0.5">
                        Official Correspondence:
                      </strong>
                      <a
                        href={`mailto:${COMPANY_DETAILS.email}`}
                        className="text-xs sm:text-sm text-[#0A1428] hover:text-[#C59B27] font-medium"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-2 border-t border-stone-100">
                    <div className="p-2 rounded-xl bg-[#0A1428] text-[#E5C07B] flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-stone-900 font-semibold mb-0.5">
                        Office & Guest Hours:
                      </strong>
                      <p className="text-xs text-stone-600">
                        {COMPANY_DETAILS.hours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1fbe58] transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Connect via WhatsApp Desk
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E0D3] shadow-lg">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                    Inquiry Form
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1428] mt-1">
                    Send Us Your Itinerary Requirements
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Tell us your preferred cities, dates, and family size. A senior travel planner will reach out with a detailed, private proposal.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#0A1428]">
                      Thank You! Your Request Has Been Logged
                    </h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                      Our Mandir Marg travel desk has received your note. We will call you back at <span className="font-semibold text-stone-900">{formData.phone}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-lg bg-[#0A1428] text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" id="contact-page-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          id="contact-form-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikramaditya Rathore"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          id="contact-form-phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9312640072"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          id="contact-form-email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Destination of Interest</span>
                          <span className="text-[10px] text-[#C59B27] font-normal lowercase">22+ circuits</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-form-destination"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all cursor-pointer appearance-none pr-8 [&>option]:bg-white [&>optgroup]:bg-white"
                          >
                            <option value="">Select Destination / Circuit</option>
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
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2.5 top-3.5 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Travel Dates: Calendar From & To */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Travel Month / Dates (Calendar)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] uppercase font-medium text-stone-500 mb-0.5">
                            From (Departure)
                          </span>
                          <input
                            type="date"
                            id="contact-form-from-date"
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
                            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all cursor-pointer"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-medium text-stone-500 mb-0.5">
                            To (Return)
                          </span>
                          <input
                            type="date"
                            id="contact-form-to-date"
                            min={formData.fromDate || today}
                            value={formData.toDate}
                            onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Travelers Count: Adults and Children */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Travelers Count</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <span className="block text-[10px] uppercase font-medium text-stone-500 mb-0.5">
                            Adults (12+ yrs)
                          </span>
                          <select
                            id="contact-form-adults"
                            value={formData.adults}
                            onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                            className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all cursor-pointer appearance-none pr-7"
                          >
                            {ADULT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-7 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <span className="block text-[10px] uppercase font-medium text-stone-500 mb-0.5">
                            Children (0-11 yrs)
                          </span>
                          <select
                            id="contact-form-children"
                            value={formData.children}
                            onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                            className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all cursor-pointer appearance-none pr-7"
                          >
                            {CHILDREN_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-2 top-7 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Your Message or Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        id="contact-form-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your travel style, preferred pace, vehicle requirements, or dietary needs..."
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C59B27] transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="contact-form-submit-btn"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0A1428] to-[#122242] text-[#F3E8C8] font-bold text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-75"
                      >
                        <Send className="w-4 h-4 text-[#C59B27]" />
                        {isSubmitting ? 'Transmitting...' : 'Request Custom Itinerary'}
                      </button>
                    </div>

                    <p className="text-center text-xs text-stone-500 pt-2">
                      🔒 No automated robocalls or spam. You speak directly to our travel designers.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
