import { NextResponse } from "next/server";

type CreateOrderBody = {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay keys are not configured." }, { status: 500 });
    }

    const body = (await req.json()) as CreateOrderBody;
    const amount = Number(body?.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency: body?.currency || "INR",
        receipt: body?.receipt || `kapricious-${Date.now()}`,
        notes: body?.notes || {},
      }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.description || data?.error?.reason || "Razorpay order creation failed.";
      return NextResponse.json({ error: message, raw: data }, { status: response.status });
    }

    return NextResponse.json({ order: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create Razorpay order." }, { status: 500 });
  }
}
