import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type EmailPayload = {
  participantName: string;
  participantEmail: string;
  eventName: string;
  registrationId: string;
  entryCode: string;
  eventDate: string;
  venue: string;
  teamCount: number;
  eventImage?: string;
  eventCategory?: string;
};

function buildEntryCodeFromRegistrationId(registrationId: string): string {
  return `KAP-${registrationId.replaceAll("-", "").substring(0, 8).toUpperCase()}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeFileName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function base64Encode(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function fetchAsDataUrl(url: string | undefined, fallbackContentType = "image/png"): Promise<string | null> {
  if (!url) return null;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || fallbackContentType;
    const bytes = new Uint8Array(await res.arrayBuffer());
    return `data:${contentType};base64,${base64Encode(bytes)}`;
  } catch (error) {
    console.error("Asset fetch failed:", url, error);
    return null;
  }
}

function buildCouponEmail(data: EmailPayload): string {
  const entryCode = data.entryCode?.trim() || buildEntryCodeFromRegistrationId(data.registrationId);
  const safeName = escapeHtml(data.participantName);
  const safeEventName = escapeHtml(data.eventName);
  const safeVenue = escapeHtml(data.venue || "TBA");
  const safeCategory = escapeHtml(data.eventCategory || "Event");
  const teamLabel = data.teamCount > 1 ? `${data.teamCount} members` : "Individual";
  const safeRegistrationId = escapeHtml(data.registrationId);
  const safeEntryCode = escapeHtml(entryCode);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,sans-serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:linear-gradient(180deg,#f4f1ea 0%,#ece5da 100%);">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#fffdf8;border:1px solid #e7dcc8;border-radius:28px;overflow:hidden;">
          <tr>
            <td style="padding:36px 36px 24px;background:#111827;color:#f9fafb;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#d1d5db;">Kapricious 2026</p>
              <h1 style="margin:0;font-size:30px;line-height:1.1;">Thank you for registering</h1>
              <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#d1d5db;">
                Hi ${safeName}, your registration for <strong>${safeEventName}</strong> is confirmed. Your event coupon is attached to this mail. Keep it safe and present it at the venue during check-in.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ec;border:1px solid #eadfcd;border-radius:20px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a6a35;">Event Summary</p>
                    <h2 style="margin:0 0 8px;font-size:22px;line-height:1.2;color:#111827;">${safeEventName}</h2>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;">
                      ${safeCategory} • ${escapeHtml(data.eventDate)} • ${safeVenue}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:0 8px 16px 0;">
                    <div style="border:1px solid #eadfcd;border-radius:18px;padding:18px;background:#ffffff;">
                      <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;">Registration ID</p>
                      <p style="margin:10px 0 0;font-size:16px;font-weight:700;color:#111827;font-family:monospace;">${safeRegistrationId}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding:0 0 16px 8px;">
                    <div style="border:1px solid #eadfcd;border-radius:18px;padding:18px;background:#ffffff;">
                      <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;">Entry Code</p>
                      <p style="margin:10px 0 0;font-size:16px;font-weight:700;color:#111827;font-family:monospace;">${safeEntryCode}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px 8px;">
              <div style="border:1px solid #eadfcd;border-radius:18px;padding:18px;background:#ffffff;">
                <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;">Team Size</p>
                <p style="margin:10px 0 0;font-size:16px;font-weight:700;color:#111827;">${escapeHtml(teamLabel)}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 36px 8px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;">
                The attached coupon includes your Kapricious branding, QR code, event details, event image, and team information. Please carry it on your phone or as a printout.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 36px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:20px;">
                <tr>
                  <td style="padding:20px 24px;color:#f9fafb;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#d1d5db;">Before You Arrive</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#e5e7eb;">
                      Reach the venue on time, keep this email handy, and coordinate with your teammates if this is a team event. See you at Kapricious.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCouponSvg(data: EmailPayload, qrDataUrl: string, eventImageDataUrl: string | null): string {
  const entryCode = data.entryCode?.trim() || buildEntryCodeFromRegistrationId(data.registrationId);
  const safeName = escapeHtml(data.participantName);
  const safeEventName = escapeHtml(data.eventName);
  const safeVenue = escapeHtml(data.venue || "TBA");
  const safeDate = escapeHtml(data.eventDate || "TBA");
  const safeCategory = escapeHtml(data.eventCategory || "Event");
  const teamLabel = escapeHtml(data.teamCount > 1 ? `${data.teamCount} members` : "Individual");
  const regLabel = escapeHtml(data.registrationId);
  const codeLabel = escapeHtml(entryCode);
  const eventImage = eventImageDataUrl ||
    "data:image/svg+xml;base64," +
      base64Encode(
        new TextEncoder().encode(
          `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="#1f2937"/><text x="50%" y="50%" fill="#f9fafb" font-family="Arial" font-size="20" text-anchor="middle">Kapricious 2026</text></svg>`,
        ),
      );

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="60" y1="60" x2="1140" y2="615" gradientUnits="userSpaceOnUse">
      <stop stop-color="#111827"/>
      <stop offset="1" stop-color="#1F2937"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#F6D28A"/>
      <stop offset="1" stop-color="#E7A93E"/>
    </linearGradient>
    <clipPath id="posterClip">
      <rect x="720" y="122" width="390" height="220" rx="28"/>
    </clipPath>
  </defs>

  <rect width="1200" height="675" rx="38" fill="#EDE4D6"/>
  <rect x="18" y="18" width="1164" height="639" rx="30" fill="url(#bg)"/>
  <rect x="60" y="60" width="1080" height="555" rx="28" fill="#0F172A" stroke="#334155"/>
  <rect x="60" y="60" width="1080" height="92" rx="28" fill="url(#accent)"/>

  <text x="96" y="110" fill="#111827" font-family="Arial" font-size="20" font-weight="700" letter-spacing="4">KAPRICIOUS 2026</text>
  <text x="96" y="136" fill="#3F2E0F" font-family="Arial" font-size="38" font-weight="700">EVENT COUPON</text>
  <text x="865" y="115" fill="#3F2E0F" font-family="Arial" font-size="16" font-weight="700" letter-spacing="3">ENTRY CODE</text>
  <text x="865" y="142" fill="#111827" font-family="monospace" font-size="28" font-weight="700">${codeLabel}</text>

  <text x="96" y="210" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="700" letter-spacing="3">REGISTERED PARTICIPANT</text>
  <text x="96" y="248" fill="#F8FAFC" font-family="Arial" font-size="34" font-weight="700">${safeName}</text>

  <text x="96" y="302" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="700" letter-spacing="3">EVENT</text>
  <text x="96" y="340" fill="#F8FAFC" font-family="Arial" font-size="30" font-weight="700">${safeEventName}</text>
  <text x="96" y="374" fill="#CBD5E1" font-family="Arial" font-size="18">${safeCategory}</text>

  <rect x="96" y="420" width="250" height="90" rx="20" fill="#111827" stroke="#334155"/>
  <text x="120" y="455" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">EVENT DATE</text>
  <text x="120" y="487" fill="#F8FAFC" font-family="Arial" font-size="22" font-weight="700">${safeDate}</text>

  <rect x="368" y="420" width="300" height="90" rx="20" fill="#111827" stroke="#334155"/>
  <text x="392" y="455" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">VENUE</text>
  <text x="392" y="487" fill="#F8FAFC" font-family="Arial" font-size="22" font-weight="700">${safeVenue}</text>

  <rect x="96" y="530" width="250" height="52" rx="18" fill="#111827" stroke="#334155"/>
  <text x="120" y="562" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">TEAM SIZE</text>
  <text x="244" y="562" fill="#F8FAFC" font-family="Arial" font-size="18" font-weight="700">${teamLabel}</text>

  <rect x="368" y="530" width="300" height="52" rx="18" fill="#111827" stroke="#334155"/>
  <text x="392" y="562" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">REG ID</text>
  <text x="480" y="562" fill="#F8FAFC" font-family="monospace" font-size="14" font-weight="700">${regLabel}</text>

  <rect x="720" y="122" width="390" height="220" rx="28" fill="#0B1220" stroke="#334155"/>
  <image href="${eventImage}" x="720" y="122" width="390" height="220" preserveAspectRatio="xMidYMid slice" clip-path="url(#posterClip)"/>

  <rect x="720" y="374" width="170" height="170" rx="24" fill="#F8FAFC"/>
  <image href="${qrDataUrl}" x="737" y="391" width="136" height="136"/>
  <text x="912" y="430" fill="#94A3B8" font-family="Arial" font-size="13" font-weight="700" letter-spacing="2">SCAN AT ENTRY</text>
  <text x="912" y="466" fill="#F8FAFC" font-family="Arial" font-size="24" font-weight="700">Kapricious Pass</text>
  <text x="912" y="500" fill="#CBD5E1" font-family="Arial" font-size="16">Use this QR and code at check-in.</text>
  <text x="912" y="540" fill="#EAB308" font-family="Arial" font-size="14" font-weight="700">Carry this coupon with you.</text>

  <text x="96" y="615" fill="#64748B" font-family="Arial" font-size="14">KMEA Engineering College • Official event coupon for venue verification</text>
</svg>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const requestData = await req.json();
    const {
      participantName,
      participantEmail,
      eventName,
      registrationId,
      entryCode,
      eventDate,
      venue,
      teamCount,
      eventImage,
      eventCategory,
    } = requestData;

    if (!participantEmail || !participantName || !eventName || !registrationId || !entryCode) {
      throw new Error("Missing required fields");
    }

    const parsedDate = eventDate ? new Date(eventDate) : null;
    const formattedDate = parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      : eventDate || "TBA";

    const emailPayload: EmailPayload = {
      participantName,
      participantEmail,
      eventName,
      registrationId,
      entryCode,
      eventDate: formattedDate,
      venue: venue || "TBA",
      teamCount: Number(teamCount) > 0 ? Number(teamCount) : 1,
      eventImage,
      eventCategory,
    };

    const canonicalEntryCode = entryCode?.trim() || buildEntryCodeFromRegistrationId(registrationId);
    const qrUrl =
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(canonicalEntryCode)}&bgcolor=ffffff&color=111827`;
    const [qrDataUrl, eventImageDataUrl] = await Promise.all([
      fetchAsDataUrl(qrUrl, "image/png"),
      fetchAsDataUrl(eventImage, "image/jpeg"),
    ]);

    if (!qrDataUrl) {
      throw new Error("Failed to generate QR code for coupon");
    }

    const html = buildCouponEmail(emailPayload);
    const plainText =
      `Thank you for registering for Kapricious 2026.\n\n` +
      `Participant: ${participantName}\n` +
      `Event: ${eventName}\n` +
      `Category: ${eventCategory || "Event"}\n` +
      `Date: ${formattedDate}\n` +
      `Venue: ${venue || "TBA"}\n` +
      `Team Size: ${emailPayload.teamCount > 1 ? `${emailPayload.teamCount} members` : "Individual"}\n` +
      `Registration ID: ${registrationId}\n` +
      `Entry Code: ${canonicalEntryCode}\n\n` +
      `Your Kapricious coupon is attached to this email. Please keep it ready at the venue.`;

    const couponSvg = buildCouponSvg(emailPayload, qrDataUrl, eventImageDataUrl);
    const attachmentName = `kapricious-coupon-${sanitizeFileName(eventName || "event")}.svg`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kapricious 2026 <noreply@kapricious.in>",
        to: [participantEmail],
        subject: `Your Kapricious coupon for ${eventName}`,
        html,
        text: plainText,
        attachments: [
          {
            filename: attachmentName,
            content: base64Encode(new TextEncoder().encode(couponSvg)),
          },
        ],
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      const isRateLimit = res.status === 429;
      return new Response(
        JSON.stringify({ success: false, rateLimited: isRateLimit, error: result }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, entryCode: canonicalEntryCode, emailId: result.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Email send error:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
