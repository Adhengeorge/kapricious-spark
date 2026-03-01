import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function generateEntryCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'KAP-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function buildCouponEmail(data: {
  participantName: string;
  eventName: string;
  registrationId: string;
  entryCode: string;
  eventDate: string;
  venue: string;
}): string {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.entryCode)}&bgcolor=0a0a0a&color=14b8a6`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:20px 0;">
<tr><td align="center">
<table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#0a0f1a 0%,#0d1117 100%);border:1px solid #1e293b;border-radius:16px;overflow:hidden;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#0f172a,#064e3b);padding:28px 32px;text-align:center;border-bottom:2px solid #14b8a6;">
  <p style="margin:0 0 4px;font-size:11px;letter-spacing:4px;color:#5eead4;text-transform:uppercase;">Kapricious 2026</p>
  <h1 style="margin:0;font-size:26px;color:#f0fdfa;font-weight:800;">EVENT PASS</h1>
</td></tr>

<!-- ADMIT ONE -->
<tr><td style="padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="background:#14b8a6;padding:6px 0;text-align:center;">
      <span style="font-size:10px;letter-spacing:6px;color:#022c22;font-weight:700;text-transform:uppercase;">★ ADMIT ONE ★</span>
    </td>
  </tr>
  </table>
</td></tr>

<!-- Event Info -->
<tr><td style="padding:24px 32px 16px;">
  <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:#5eead4;text-transform:uppercase;">Event</p>
  <h2 style="margin:0 0 16px;font-size:20px;color:#f0fdfa;font-weight:700;">${data.eventName}</h2>
  
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="50%" style="padding:8px 0;">
      <p style="margin:0;font-size:10px;letter-spacing:2px;color:#5eead4;text-transform:uppercase;">Participant</p>
      <p style="margin:4px 0 0;font-size:14px;color:#e2e8f0;font-weight:600;">${data.participantName}</p>
    </td>
    <td width="50%" style="padding:8px 0;">
      <p style="margin:0;font-size:10px;letter-spacing:2px;color:#5eead4;text-transform:uppercase;">Date</p>
      <p style="margin:4px 0 0;font-size:14px;color:#e2e8f0;font-weight:600;">${data.eventDate}</p>
    </td>
  </tr>
  <tr>
    <td width="50%" style="padding:8px 0;">
      <p style="margin:0;font-size:10px;letter-spacing:2px;color:#5eead4;text-transform:uppercase;">Venue</p>
      <p style="margin:4px 0 0;font-size:14px;color:#e2e8f0;font-weight:600;">${data.venue}</p>
    </td>
    <td width="50%" style="padding:8px 0;">
      <p style="margin:0;font-size:10px;letter-spacing:2px;color:#5eead4;text-transform:uppercase;">Registration ID</p>
      <p style="margin:4px 0 0;font-size:13px;color:#e2e8f0;font-family:monospace;font-weight:600;">${data.registrationId.substring(0, 8).toUpperCase()}</p>
    </td>
  </tr>
  </table>
</td></tr>

<!-- Dashed divider -->
<tr><td style="padding:0 32px;">
  <div style="border-top:2px dashed #1e293b;"></div>
</td></tr>

<!-- QR + Entry Code -->
<tr><td style="padding:20px 32px 24px;text-align:center;">
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="50%" style="text-align:center;vertical-align:middle;">
      <img src="${qrUrl}" width="120" height="120" alt="QR Code" style="border-radius:8px;border:2px solid #1e293b;" />
    </td>
    <td width="50%" style="text-align:center;vertical-align:middle;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;color:#5eead4;text-transform:uppercase;">Entry Code</p>
      <p style="margin:0;font-size:24px;font-weight:800;color:#14b8a6;font-family:monospace;letter-spacing:3px;">${data.entryCode}</p>
      <p style="margin:8px 0 0;font-size:11px;color:#64748b;">Show this at entry</p>
    </td>
  </tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="background:#0f172a;padding:16px 32px;text-align:center;border-top:1px solid #1e293b;">
  <p style="margin:0;font-size:11px;color:#64748b;">This is your official event pass. Please present it at the venue.</p>
  <p style="margin:6px 0 0;font-size:10px;color:#475569;">© 2026 Kapricious TechFest. All rights reserved.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const { participantName, participantEmail, eventName, registrationId, eventDate, venue } = await req.json();

    if (!participantEmail || !participantName || !eventName || !registrationId) {
      throw new Error('Missing required fields');
    }

    const entryCode = generateEntryCode();
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'TBA';

    const html = buildCouponEmail({
      participantName,
      eventName,
      registrationId,
      entryCode,
      eventDate: formattedDate,
      venue: venue || 'TBA',
    });

    const plainText = `KAPRICIOUS 2026 - EVENT PASS\n\nEvent: ${eventName}\nParticipant: ${participantName}\nRegistration ID: ${registrationId.substring(0, 8).toUpperCase()}\nEntry Code: ${entryCode}\nDate: ${formattedDate}\nVenue: ${venue || 'TBA'}\n\nPresent this pass at the venue. See you there!`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Kapricious 2026 <onboarding@resend.dev>',
        to: [participantEmail],
        subject: `🎫 Your Event Pass — ${eventName} | Kapricious 2026`,
        html,
        text: plainText,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend error:', result);
      return new Response(
        JSON.stringify({ success: false, error: result }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, entryCode, emailId: result.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Email send error:', err.message);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
