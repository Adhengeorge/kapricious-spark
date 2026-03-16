import crypto from "crypto";
import { NextResponse } from "next/server";

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: Request) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
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

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Payment verification failed." }, { status: 500 });
  }
}
