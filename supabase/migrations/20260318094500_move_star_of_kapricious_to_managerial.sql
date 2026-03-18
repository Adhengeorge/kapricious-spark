-- Add the MANAGERIAL department bucket and move Star of Kapricious
-- from CULTURAL to MANAGERIAL without losing existing registrations.

DO $$
DECLARE
  managerial_dept_id uuid;
  cultural_dept_id uuid;
  star_event_id uuid;
  duplicate_star_event_id uuid;
BEGIN
  INSERT INTO public.departments (name, code)
  VALUES ('Managerial Events', 'MANAGERIAL')
  ON CONFLICT (code) DO UPDATE
  SET name = EXCLUDED.name;

  SELECT id INTO managerial_dept_id
  FROM public.departments
  WHERE code = 'MANAGERIAL'
  LIMIT 1;

  SELECT id INTO cultural_dept_id
  FROM public.departments
  WHERE code = 'CULTURAL'
  LIMIT 1;

  SELECT e.id INTO star_event_id
  FROM public.events e
  WHERE e.title = 'Star of Kapricious'
    AND e.department_id = cultural_dept_id
  LIMIT 1;

  SELECT e.id INTO duplicate_star_event_id
  FROM public.events e
  WHERE e.title = 'Star of Kapricious'
    AND e.department_id = managerial_dept_id
  LIMIT 1;

  IF star_event_id IS NOT NULL AND duplicate_star_event_id IS NULL THEN
    UPDATE public.events
    SET department_id = managerial_dept_id
    WHERE id = star_event_id;

    UPDATE public.registrations
    SET department_id = managerial_dept_id
    WHERE event_id = star_event_id
       OR (event_id IS NULL AND department_id = cultural_dept_id);
  ELSIF star_event_id IS NOT NULL AND duplicate_star_event_id IS NOT NULL THEN
    UPDATE public.registrations
    SET event_id = duplicate_star_event_id,
        department_id = managerial_dept_id
    WHERE event_id = star_event_id;

    DELETE FROM public.events
    WHERE id = star_event_id;
  ELSIF duplicate_star_event_id IS NOT NULL THEN
    UPDATE public.registrations
    SET department_id = managerial_dept_id
    WHERE event_id = duplicate_star_event_id
       OR (event_id IS NULL AND department_id = cultural_dept_id);
  END IF;

  INSERT INTO public.events (title, department_id, event_date, venue, image_url)
  SELECT
    'Star of Kapricious',
    managerial_dept_id,
    '2026-03-28 17:00:00+05:30'::timestamptz,
    'Main Auditorium, KMEA Engineering College',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop'
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.events e
    WHERE e.title = 'Star of Kapricious'
      AND e.department_id = managerial_dept_id
  );
END $$;
