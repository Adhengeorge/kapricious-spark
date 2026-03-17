ALTER TABLE public.registrations
ADD COLUMN razorpay_order_id text,
ADD COLUMN payment_currency text,
ADD COLUMN payment_gateway_status text;

COMMENT ON COLUMN public.registrations.razorpay_order_id IS 'Verified Razorpay order id associated with this registration.';
COMMENT ON COLUMN public.registrations.payment_currency IS 'Verified payment currency returned by Razorpay.';
COMMENT ON COLUMN public.registrations.payment_gateway_status IS 'Verified payment status returned by Razorpay.';
