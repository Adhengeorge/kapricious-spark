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
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.entryCode)}&bgcolor=0a0a0a&color=ffffff`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:32px 0;">
<tr><td align="center">
<table width="480" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;border:1px solid #1a1a1a;border-radius:32px;overflow:hidden;">

<!-- Header -->
<tr><td style="padding:32px 40px 24px;text-align:center;">
  <div style="width:48px;height:48px;border-radius:50%;background:#ffffff;margin:0 auto 16px;line-height:48px;text-align:center;">
    <span style="font-size:16px;font-weight:900;color:#0a0a0a;font-family:monospace;">K</span>
  </div>
  <p style="margin:0 0 4px;font-size:10px;letter-spacing:5px;color:#666;text-transform:uppercase;font-weight:700;">Kapricious 2026</p>
  <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:700;letter-spacing:-0.5px;">EVENT PASS</h1>
</td></tr>

<!-- ADMIT ONE -->
<tr><td style="padding:0 40px;">
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="background:#ffffff;padding:8px 0;text-align:center;border-radius:12px;">
    <span style="font-size:10px;letter-spacing:6px;color:#0a0a0a;font-weight:700;text-transform:uppercase;">★ ADMIT ONE ★</span>
  </td></tr>
  </table>
</td></tr>

<!-- Event Info -->
<tr><td style="padding:24px 40px 16px;">
  <p style="margin:0 0 4px;font-size:10px;letter-spacing:4px;color:#666;text-transform:uppercase;font-weight:600;">Event</p>
  <h2 style="margin:0 0 20px;font-size:20px;color:#ffffff;font-weight:700;letter-spacing:-0.3px;">${data.eventName}</h2>
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden;">
  <tr>
    <td width="50%" style="padding:16px 20px;border-right:1px solid #1a1a1a;border-bottom:1px solid #1a1a1a;">
      <p style="margin:0;font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;font-weight:600;">Participant</p>
      <p style="margin:6px 0 0;font-size:14px;color:#fff;font-weight:600;">${data.participantName}</p>
    </td>
    <td width="50%" style="padding:16px 20px;border-bottom:1px solid #1a1a1a;">
      <p style="margin:0;font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;font-weight:600;">Date</p>
      <p style="margin:6px 0 0;font-size:14px;color:#fff;font-weight:600;">${data.eventDate}</p>
    </td>
  </tr>
  <tr>
    <td width="50%" style="padding:16px 20px;border-right:1px solid #1a1a1a;">
      <p style="margin:0;font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;font-weight:600;">Venue</p>
      <p style="margin:6px 0 0;font-size:14px;color:#fff;font-weight:600;">${data.venue}</p>
    </td>
    <td width="50%" style="padding:16px 20px;">
      <p style="margin:0;font-size:9px;letter-spacing:3px;color:#555;text-transform:uppercase;font-weight:600;">Registration ID</p>
      <p style="margin:6px 0 0;font-size:13px;color:#fff;font-family:monospace;font-weight:600;">${data.registrationId.substring(0, 8).toUpperCase()}</p>
    </td>
  </tr>
  </table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:8px 40px;">
  <div style="border-top:1px dashed #222;"></div>
</td></tr>

<!-- QR + Entry Code -->
<tr><td style="padding:16px 40px 28px;text-align:center;">
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="45%" style="text-align:center;vertical-align:middle;">
      <div style="background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:16px;display:inline-block;">
        <img src="${qrUrl}" width="110" height="110" alt="QR Code" style="border-radius:8px;display:block;" />
      </div>
    </td>
    <td width="55%" style="text-align:center;vertical-align:middle;">
      <p style="margin:0 0 8px;font-size:9px;letter-spacing:4px;color:#555;text-transform:uppercase;font-weight:600;">Entry Code</p>
      <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;font-family:monospace;letter-spacing:4px;">${data.entryCode}</p>
      <p style="margin:12px 0 0;font-size:10px;color:#444;">Show this at entry gate</p>
    </td>
  </tr>
  </table>
</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 40px;text-align:center;border-top:1px solid #1a1a1a;">
  <p style="margin:0;font-size:11px;color:#444;">This is your official event pass. Present at venue.</p>
  <p style="margin:8px 0 0;font-size:9px;color:#333;letter-spacing:2px;text-transform:uppercase;">© 2026 Kapricious · KMEA Engineering College</p>
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
        from: 'Kapricious 2026 <noreply@kapricious.in>',
        to: [participantEmail],
        subject: `🎫 Your Event Pass — ${eventName} | Kapricious 2026`,
        html,
        text: plainText,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Resend error:', result);
      const isRateLimit = res.status === 429;
      return new Response(
        JSON.stringify({ success: false, rateLimited: isRateLimit, error: result }),
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
