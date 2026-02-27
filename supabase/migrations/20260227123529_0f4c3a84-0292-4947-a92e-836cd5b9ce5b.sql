
-- Allow admins to update registrations (for payment status)
CREATE POLICY "Admins can update registrations"
ON public.registrations FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));
