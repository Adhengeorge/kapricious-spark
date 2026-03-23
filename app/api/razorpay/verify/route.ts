import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { Database } from "@/integrations/supabase/types";

export const runtime = "nodejs";

type VerifyBody = {
  registration_id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  event_image?: string;
  event_category?: string;
};

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!keyId || !secret) {
      return NextResponse.json({ error: "Razorpay secret is not configured." }, { status: 500 });
    }
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase client keys are not configured." }, { status: 500 });
    }

    const body = (await req.json()) as VerifyBody;
    const { registration_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, event_image, event_category } = body || {};

    if (!registration_id || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification fields." }, { status: 400 });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ verified: false, error: "Invalid payment signature." }, { status: 400 });
    }

    const auth = Buffer.from(`${keyId}:${secret}`).toString("base64");
    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const paymentData = await paymentResponse.json();
    if (!paymentResponse.ok) {
      const message =
        paymentData?.error?.description ||
        paymentData?.error?.reason ||
        "Failed to fetch payment details from Razorpay.";
      return NextResponse.json({ verified: false, error: message }, { status: paymentResponse.status });
    }

    if (paymentData.order_id !== razorpay_order_id) {
      return NextResponse.json({ verified: false, error: "Payment order mismatch." }, { status: 400 });
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const amountInRupees = Number(paymentData.amount || 0) / 100;
    const { data: finalizedRows, error: finalizeError } = await supabase.rpc("finalize_registration_payment", {
      p_registration_id: registration_id,
      p_razorpay_order_id: paymentData.order_id,
      p_transaction_id: paymentData.id,
      p_amount_paid: amountInRupees,
      p_payment_currency: paymentData.currency || "INR",
      p_payment_gateway_status: paymentData.status || "captured",
    });

    if (finalizeError) {
      return NextResponse.json({ verified: false, error: finalizeError.message || "Registration finalization failed." }, { status: 500 });
    }

    const finalized = finalizedRows?.[0];
    if (!finalized?.id) {
      return NextResponse.json({ verified: false, error: "Registration finalization returned no record." }, { status: 500 });
    }

    const { data: eventRecord, error: eventError } = await supabase
      .from("events")
      .select("title, event_date, venue")
      .eq("id", finalized.event_id)
      .single();

    if (eventError) {
      return NextResponse.json({ verified: false, error: eventError.message || "Unable to load event details." }, { status: 500 });
    }

    let emailResult: { success?: boolean; rateLimited?: boolean } = { success: true, rateLimited: false };

    if (finalized.status_was_pending) {
      try {
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-registration-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            participantName: finalized.name,
            participantEmail: finalized.email,
            eventName: eventRecord?.title || "",
            registrationId: finalized.id,
            entryCode: finalized.entry_code,
            eventDate: eventRecord?.event_date || "",
            venue: eventRecord?.venue || "",
            teamCount: finalized.team_size ?? 1,
            eventImage: event_image || "",
            eventCategory: event_category || "Department Event",
          }),
        });

        const emailPayload = await emailResponse.json().catch(() => ({}));
        emailResult = {
          success: Boolean(emailResponse.ok && emailPayload?.success !== false),
          rateLimited: emailPayload?.rateLimited === true,
        };
      } catch {
        emailResult = { success: false, rateLimited: false };
      }
    }

    return NextResponse.json(
      {
        verified: true,
        payment: {
          orderId: paymentData.order_id,
          paymentId: paymentData.id,
          amount: Number(paymentData.amount || 0),
          currency: paymentData.currency || "INR",
          status: paymentData.status || "unknown",
        },
        coupon: {
          registrationId: finalized.id,
          participantName: finalized.name,
          participantEmail: finalized.email,
          eventName: eventRecord?.title || "",
          eventDate: eventRecord?.event_date || "",
          venue: eventRecord?.venue || "",
          issuedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          entryCode: finalized.entry_code,
          teamCount: finalized.team_size ?? 1,
          eventCategory: event_category || "Department Event",
          eventImage: event_image || "",
        },
        email: emailResult,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Payment verification failed." }, { status: 500 });
  }
}
