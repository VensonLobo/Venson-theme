export interface EnquiryData {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  fromDate?: string;
  toDate?: string;
  travelDates?: string;
  adults?: string;
  children?: string;
  travelers?: string;
  requirements?: string;
  source?: string;
  submittedAt?: string;
}

export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw15ofZxXmGdQXAREZpCpcN_LXR9qqjEqMGR-D1Wf_bdlPA5eIwcsNx-dUBhEsHPXJe/exec';

export function getEffectiveWebhookUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;
  if (envUrl && typeof envUrl === 'string' && (envUrl.startsWith('https://script.google.com') || envUrl.startsWith('https://'))) {
    return envUrl.trim();
  }
  return DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
}

export const GOOGLE_SHEET_WEBHOOK_URL = getEffectiveWebhookUrl();

/**
 * Submits enquiry responses to Google Sheets via Google Apps Script Web App / Webhook,
 * while maintaining a local backup in localStorage so inquiries are never lost.
 */
export async function submitEnquiryToSheet(data: EnquiryData): Promise<{ success: boolean; error?: string }> {
  const enquiryId = data.id || 'LT-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = data.submittedAt || new Date().toISOString();
  const formattedTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Always save a local copy in browser storage as a safe backup
  try {
    const stored = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('lobo_enquiries') || '[]' : '[]');
    stored.push({
      ...data,
      id: enquiryId,
      submittedAt: timestamp,
      formattedTime,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lobo_enquiries', JSON.stringify(stored));
    }
  } catch (err) {
    console.warn('LocalStorage backup warning:', err);
  }

  const datesString =
    data.travelDates ||
    (data.fromDate && data.toDate
      ? `${data.fromDate} to ${data.toDate}`
      : data.fromDate
      ? `From ${data.fromDate}`
      : 'Flexible dates');

  // Payload matching the Google Apps Script parameter names:
  // destination, from_date / fromDate, to_date / toDate, adults, children, full_name / fullName / name, phone / whatsapp
  const payload = {
    id: enquiryId,
    timestamp: formattedTime,
    destination: data.destination || '',
    from_date: data.fromDate || '',
    fromDate: data.fromDate || '',
    to_date: data.toDate || '',
    toDate: data.toDate || '',
    adults: data.adults || '',
    children: data.children || '',
    full_name: data.name || '',
    fullName: data.name || '',
    name: data.name || '',
    phone: data.phone || '',
    whatsapp: data.phone || '',
    email: data.email || '',
    travelDates: datesString,
    travel_dates: datesString,
    travelers: data.travelers || '',
    requirements: data.requirements || '',
    source: data.source || 'Website Form',
  };

  // 2. Primary: Submit via server-side API proxy (/api/enquiry) to avoid browser CORS/adblocker drops
  let serverSubmitted = false;
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        serverSubmitted = true;
        return { success: true };
      }
    } catch (serverErr) {
      console.warn('Server-side sheet proxy failed, attempting direct webhook submission:', serverErr);
    }
  }

  // 3. Fallback: Direct submission to Google Apps Script Webhook
  const webhookUrl = getEffectiveWebhookUrl();
  if (!serverSubmitted && webhookUrl && webhookUrl.trim() !== '') {
    try {
      let targetUrl = webhookUrl.trim();
      try {
        const parsedUrl = new URL(targetUrl);
        Object.entries(payload).forEach(([key, val]) => {
          parsedUrl.searchParams.set(key, String(val));
        });
        targetUrl = parsedUrl.toString();
      } catch {
        // keep original targetUrl if URL parsing fails
      }

      await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      return { success: true };
    } catch (err: unknown) {
      console.error('Error sending enquiry to Google Sheet webhook:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  return { success: true };
}
