
-- Add payment fields to registrations
ALTER TABLE public.registrations
  ADD COLUMN transaction_id text,
  ADD COLUMN screenshot_url text,
  ADD COLUMN payment_status text NOT NULL DEFAULT 'pending';

-- Add coordinator email to events
ALTER TABLE public.events
  ADD COLUMN coordinator_email text;

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Allow anyone to upload payment screenshots
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots');

-- Allow public read access to payment screenshots
CREATE POLICY "Payment screenshots are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-screenshots');

-- Allow admins to delete payment screenshots
CREATE POLICY "Admins can delete payment screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'payment-screenshots' AND public.has_role(auth.uid(), 'admin'));
