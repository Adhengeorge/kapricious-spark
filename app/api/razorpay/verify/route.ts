import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) {
      return NextResponse.json({ error: "Razorpay secret is not configured." }, { status: 500 });
    }

    const body = (await req.json()) as VerifyBody;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
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
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Payment verification failed." }, { status: 500 });
  }
}
