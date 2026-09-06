import React from 'react';
import type { Metadata } from 'next';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { COMPANY_DETAILS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lobo Travels',
  description: 'Privacy Policy and client data protection standards of Lobo Travels, New Delhi.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <GlobalHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#142033]">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E0D3] shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
              Legal & Trust
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#0A1428] mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Last updated: January 2026 • Lobo Travels (New Delhi)
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              1. Our Commitment to Discretion
            </h2>
            <p>
              At Lobo Travels, we treat your privacy with the same personal discretion we apply to our curated travel itineraries. We do not sell, rent, or trade your contact information, itinerary records, or passport details to any third-party marketing brokers.
            </p>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              2. Information We Collect
            </h2>
            <p>
              When you enquire about or book a journey with us, we collect only the necessary details to plan and execute your private trip:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, phone/WhatsApp number, email address, and billing address.</li>
              <li>Travel specifics: Destination choices, travel dates, passenger count, flight details, and special dietary/mobility needs.</li>
              <li>Government identification: Copies of Aadhaar, Passport, or Voter ID required for hotel check-ins, state entry permits, or national park safari permits (e.g. Jim Corbett).</li>
            </ul>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              3. Operational Sharing
            </h2>
            <p>
              Your details are shared solely with directly contracted service providers essential to your journey: our verified drivers, booked heritage hotels, and authorized monument or safari permit authorities.
            </p>

            <h2 className="text-base font-serif font-bold text-[#0A1428]">
              4. Contact Us
            </h2>
            <p>
              If you have any questions regarding your personal information, please contact our data controller at:
              <br />
              <strong>Lobo Travels</strong>
              <br />
              {COMPANY_DETAILS.address}
              <br />
              Email: {COMPANY_DETAILS.email}
              <br />
              Phone: {COMPANY_DETAILS.phones[0].display}
            </p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
