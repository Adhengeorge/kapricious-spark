-- Rename department code/name from MAIN to CULTURAL and ensure
-- cultural events exist under CULTURAL.

DO $$
DECLARE
  main_dept_id uuid;
  cultural_dept_id uuid;
BEGIN
  SELECT id INTO main_dept_id FROM public.departments WHERE code = 'MAIN' LIMIT 1;
  SELECT id INTO cultural_dept_id FROM public.departments WHERE code = 'CULTURAL' LIMIT 1;

  IF main_dept_id IS NOT NULL AND cultural_dept_id IS NULL THEN
    UPDATE public.departments
    SET code = 'CULTURAL',
        name = 'Cultural Events'
    WHERE id = main_dept_id;
  ELSIF main_dept_id IS NOT NULL AND cultural_dept_id IS NOT NULL THEN
    UPDATE public.events
    SET department_id = cultural_dept_id
    WHERE department_id = main_dept_id;

    DELETE FROM public.departments WHERE id = main_dept_id;
  ELSIF main_dept_id IS NULL AND cultural_dept_id IS NOT NULL THEN
    UPDATE public.departments
    SET name = 'Cultural Events'
    WHERE id = cultural_dept_id;
  ELSE
    INSERT INTO public.departments (name, code)
    VALUES ('Cultural Events', 'CULTURAL');
  END IF;
END $$;

INSERT INTO public.events (title, department_id, image_url)
SELECT v.title, d.id, v.image_url
FROM (
  VALUES
    ('Fashion Show', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop'),
    ('Group Dance', 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop'),
    ('Step in Synchro', 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop'),
    ('Spot Photography', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop'),
    ('Star of Kapricious', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop')
) AS v(title, image_url)
JOIN public.departments d ON d.code = 'CULTURAL'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.title = v.title
    AND e.department_id = d.id
);
