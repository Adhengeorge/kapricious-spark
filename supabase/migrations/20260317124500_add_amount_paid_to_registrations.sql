ALTER TABLE public.registrations
ADD COLUMN amount_paid numeric(10,2);

COMMENT ON COLUMN public.registrations.amount_paid IS 'Actual amount paid by the participant in INR.';
