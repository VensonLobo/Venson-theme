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

export const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbwkbuXeIWrgBeVEvCaYR9VWXIi0IdJjYljvqvgyhL77nImqhy2JzTY8FIHZnnbuNq0s/exec';

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

  // 2. Google Apps Script Webhook URL
  const webhookUrl = GOOGLE_SHEET_WEBHOOK_URL;

  if (webhookUrl && webhookUrl.trim() !== '') {
    try {
      const datesString =
        data.travelDates ||
        (data.fromDate && data.toDate
          ? `${data.fromDate} to ${data.toDate}`
          : data.fromDate
          ? `From ${data.fromDate}`
          : 'Flexible dates');

      const payload = {
        id: enquiryId,
        timestamp: formattedTime,
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        destination: data.destination || '',
        travelDates: datesString,
        fromDate: data.fromDate || '',
        toDate: data.toDate || '',
        adults: data.adults || '',
        children: data.children || '',
        travelers: data.travelers || '',
        requirements: data.requirements || '',
        source: data.source || 'Website Form',
      };

      // Construct URL with search parameters for scripts that read e.parameter directly
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
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
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
