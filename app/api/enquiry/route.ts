import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw15ofZxXmGdQXAREZpCpcN_LXR9qqjEqMGR-D1Wf_bdlPA5eIwcsNx-dUBhEsHPXJe/exec';

function getValidWebhookUrl(): string {
  const envUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;
  if (envUrl && typeof envUrl === 'string' && (envUrl.startsWith('https://script.google.com') || envUrl.startsWith('https://'))) {
    return envUrl.trim();
  }
  return DEFAULT_WEBHOOK_URL;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const destination = body.destination || '';
    const fromDate = body.from_date || body.fromDate || '';
    const toDate = body.to_date || body.toDate || '';
    const adults = body.adults || '';
    const children = body.children || '';
    const fullName = body.full_name || body.fullName || body.name || '';
    const phone = body.phone || body.whatsapp || '';

    // Match exact keys expected by the Google Apps Script
    const payload = {
      destination,
      from_date: fromDate,
      fromDate,
      to_date: toDate,
      toDate,
      adults,
      children,
      full_name: fullName,
      fullName,
      name: fullName,
      phone,
      whatsapp: phone,
      email: body.email || '',
      requirements: body.requirements || '',
      source: body.source || 'Website Form',
    };

    // Forward to Google Apps Script Web App (server-side, avoiding CORS and ad-blockers)
    const targetUrl = getValidWebhookUrl();
    const scriptResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const responseText = await scriptResponse.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    return NextResponse.json({
      success: true,
      status: 'success',
      data,
    });
  } catch (error) {
    console.error('Failed to submit enquiry via server API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown submission error',
      },
      { status: 500 }
    );
  }
}
