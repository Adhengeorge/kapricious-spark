UPDATE public.events
SET max_participants = 10
WHERE title = 'Build a PC';

UPDATE public.events
SET max_participants = 15
WHERE title = 'Realm Of Secrets';

UPDATE public.events
SET event_date = '2026-03-28 13:00:00+05:30'::timestamptz
WHERE title = 'Line Tracer';
