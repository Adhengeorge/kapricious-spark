ALTER TABLE public.registrations
ADD COLUMN entry_code text;

UPDATE public.registrations
SET entry_code = 'KAP-' || UPPER(SUBSTRING(REPLACE(id::text, '-', '') FROM 1 FOR 8))
WHERE entry_code IS NULL;

ALTER TABLE public.registrations
ALTER COLUMN entry_code SET NOT NULL;

ALTER TABLE public.registrations
ADD COLUMN checked_in boolean NOT NULL DEFAULT false;

ALTER TABLE public.registrations
ADD COLUMN checked_in_at timestamptz;

CREATE UNIQUE INDEX registrations_entry_code_key
ON public.registrations (entry_code);

COMMENT ON COLUMN public.registrations.entry_code IS 'Unique event entry code used in email coupons and QR verification.';
COMMENT ON COLUMN public.registrations.checked_in IS 'Whether the participant has been verified at venue entry.';
COMMENT ON COLUMN public.registrations.checked_in_at IS 'Timestamp when the participant was checked in.';
