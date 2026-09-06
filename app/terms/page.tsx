import React from 'react';
import type { Metadata } from 'next';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { COMPANY_DETAILS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Lobo Travels',
  description: 'Booking terms, payment milestones, and cancellation policies of Lobo Travels, New Delhi.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#142033]">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E0D3] shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
              Legal & Booking
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#0A1428] mt-1">
              Terms & Conditions
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Operating Guidelines • Lobo Travels, Mandir Marg, New Delhi
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              1. Custom Itinerary Confirmation
            </h2>
            <p>
              A custom tour itinerary is confirmed upon receipt of the agreed deposit and the issuance of an official Lobo Travels Booking Confirmation Voucher detailing all included accommodations, private vehicle allocation, and meal plans.
            </p>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              2. Transparent Pricing & Inclusions
            </h2>
            <p>
              All prices quoted by Lobo Travels are itemized. Our packages include the specified private AC vehicle, state permits, toll taxes, parking charges, driver allowances, and hotel room charges with indicated meal plans. Personal expenses (laundry, alcoholic beverages, camera fees) and optional tips are excluded unless explicitly noted.
            </p>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              3. Flexible Amendments & Force Majeure
            </h2>
            <p>
              In the event of unforeseen weather conditions, highway landslides in Himalayan passes, or government VIP closures in Delhi/Agra, our 24x7 travel desk will rearrange alternative safe routes and equivalent standard accommodations in prompt consultation with the traveler.
            </p>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              4. Direct Travel Desk Contact
            </h2>
            <p>
              For any clarification regarding vouchers, deposits, or date modifications, please contact:
              <br />
              <strong>Lobo Travels</strong>
              <br />
              {COMPANY_DETAILS.address}
              <br />
              Phone: {COMPANY_DETAILS.phones[0].display} / {COMPANY_DETAILS.phones[1].display}
              <br />
              Email: {COMPANY_DETAILS.email}
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
