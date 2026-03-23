CREATE OR REPLACE FUNCTION public.create_or_refresh_pending_registration(
  p_name text,
  p_email text,
  p_phone text,
  p_college text,
  p_event_id uuid,
  p_department_id uuid,
  p_entry_code text,
  p_amount_paid numeric,
  p_team_size integer,
  p_team_members jsonb
)
RETURNS TABLE (
  id uuid,
  entry_code text,
  payment_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_registration public.registrations%ROWTYPE;
  normalized_email text := lower(trim(p_email));
  next_id uuid := gen_random_uuid();
BEGIN
  SELECT *
  INTO existing_registration
  FROM public.registrations
  WHERE email = normalized_email
    AND event_id = p_event_id
  LIMIT 1;

  IF FOUND THEN
    IF existing_registration.payment_status = 'verified' THEN
      RAISE EXCEPTION 'You have already registered for this event.';
    END IF;

    UPDATE public.registrations
    SET
      name = p_name,
      email = normalized_email,
      phone = p_phone,
      college = p_college,
      department_id = p_department_id,
      entry_code = p_entry_code,
      amount_paid = p_amount_paid,
      team_size = p_team_size,
      team_members = p_team_members,
      razorpay_order_id = NULL,
      payment_currency = NULL,
      payment_gateway_status = NULL,
      transaction_id = NULL,
      payment_status = 'pending'
    WHERE public.registrations.id = existing_registration.id
    RETURNING
      public.registrations.id,
      public.registrations.entry_code,
      public.registrations.payment_status
    INTO id, entry_code, payment_status;

    RETURN NEXT;
    RETURN;
  END IF;

  INSERT INTO public.registrations (
    id,
    name,
    email,
    phone,
    college,
    event_id,
    department_id,
    entry_code,
    amount_paid,
    team_size,
    team_members,
    payment_status
  )
  VALUES (
    next_id,
    p_name,
    normalized_email,
    p_phone,
    p_college,
    p_event_id,
    p_department_id,
    p_entry_code,
    p_amount_paid,
    p_team_size,
    p_team_members,
    'pending'
  )
  RETURNING
    public.registrations.id,
    public.registrations.entry_code,
    public.registrations.payment_status
  INTO id, entry_code, payment_status;

  RETURN NEXT;
END;
$$;

CREATE OR REPLACE FUNCTION public.finalize_registration_payment(
  p_registration_id uuid,
  p_razorpay_order_id text,
  p_transaction_id text,
  p_amount_paid numeric,
  p_payment_currency text,
  p_payment_gateway_status text
)
RETURNS TABLE (
  id uuid,
  entry_code text,
  payment_status text,
  name text,
  email text,
  event_id uuid,
  department_id uuid,
  team_size integer,
  status_was_pending boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_registration public.registrations%ROWTYPE;
BEGIN
  SELECT *
  INTO existing_registration
  FROM public.registrations
  WHERE public.registrations.id = p_registration_id
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pending registration not found.';
  END IF;

  IF existing_registration.payment_status = 'verified' THEN
    id := existing_registration.id;
    entry_code := existing_registration.entry_code;
    payment_status := existing_registration.payment_status;
    name := existing_registration.name;
    email := existing_registration.email;
    event_id := existing_registration.event_id;
    department_id := existing_registration.department_id;
    team_size := existing_registration.team_size;
    status_was_pending := false;
    RETURN NEXT;
    RETURN;
  END IF;

  UPDATE public.registrations
  SET
    razorpay_order_id = p_razorpay_order_id,
    transaction_id = p_transaction_id,
    amount_paid = p_amount_paid,
    payment_currency = p_payment_currency,
    payment_gateway_status = p_payment_gateway_status,
    payment_status = 'verified'
  WHERE public.registrations.id = p_registration_id
  RETURNING
    public.registrations.id,
    public.registrations.entry_code,
    public.registrations.payment_status,
    public.registrations.name,
    public.registrations.email,
    public.registrations.event_id,
    public.registrations.department_id,
    public.registrations.team_size
  INTO
    id,
    entry_code,
    payment_status,
    name,
    email,
    event_id,
    department_id,
    team_size;

  status_was_pending := true;
  RETURN NEXT;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_or_refresh_pending_registration(
  text,
  text,
  text,
  text,
  uuid,
  uuid,
  text,
  numeric,
  integer,
  jsonb
) TO anon, authenticated;

GRANT EXECUTE ON FUNCTION public.finalize_registration_payment(
  uuid,
  text,
  text,
  numeric,
  text,
  text
) TO anon, authenticated;
