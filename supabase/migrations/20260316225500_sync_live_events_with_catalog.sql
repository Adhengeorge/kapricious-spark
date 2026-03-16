-- Sync live DB events with the current website event catalog for
-- CSE, ECE, EEE, RAE, and SF departments.
-- This migration is non-destructive for existing registrations:
-- - it first renames legacy titles
-- - inserts missing canonical events
-- - deletes only obsolete events that have no registrations

-- 1) Rename known legacy titles to canonical titles.
WITH renames(old_title, new_title, dept_code) AS (
  VALUES
    ('NO-Run Ninja', 'Build a PC', 'CSE'),
    ('TECH ESCAPE ROOM', 'Tech Escape Room', 'CSE'),
    ('Laser Heist', 'Lazer Heist', 'ECE'),
    ('Solder Master', 'E Solder', 'ECE'),
    ('Robo Soccer', 'Robosoccer', 'RAE'),
    ('Vibe Coding Ideathon', 'InnovateX – Robotics & Tech Talks', 'RAE'),
    ('Circuit Rush', 'Tech Insights – Expert Talk (NPOL Scientist)', 'RAE'),
    ('Emergency Drill', 'Rescue Raid – Emergency Drill', 'SF'),
    ('Hazard Hunt', 'Hazard Hunt – Hazard Identification', 'SF'),
    ('PPE Race', 'Gear Up Challenge – PPE Race', 'SF'),
    ('Safety Quiz', 'Hazard Huzzle – Safety Quiz', 'SF'),
    ('Poster/Paper Presentation Competition', 'Insight – Poster/Paper Presentation', 'SF'),
    ('Technical Debate', 'The Safety Verdict – Technical Debate', 'SF')
)
UPDATE public.events e
SET title = r.new_title
FROM renames r
JOIN public.departments d ON d.code = r.dept_code
WHERE e.department_id = d.id
  AND e.title = r.old_title;

-- 2) Ensure canonical event rows exist (insert missing).
WITH canonical(title, dept_code, image_url) AS (
  VALUES
    ('Prompt Wars', 'CSE', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'),
    ('Bug Bounty', 'CSE', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'),
    ('CSS Royale', 'CSE', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop'),
    ('Build a PC', 'CSE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Catastrophe', 'CSE', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'),
    ('Tech Escape Room', 'CSE', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Hackathon', 'CSE', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'),

    ('E Solder', 'ECE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Lazer Heist', 'ECE', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop'),
    ('ElectroDex', 'ECE', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'),
    ('Electro Hunt', 'ECE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Red', 'ECE', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop'),

    ('Arduino Crafters', 'EEE', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop'),
    ('Zap Free Zone', 'EEE', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop'),
    ('Defuse-X', 'EEE', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Stacker Blocks', 'EEE', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop'),
    ('Power Play Arena', 'EEE', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop'),

    ('Robosoccer', 'RAE', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop'),
    ('Line Tracer', 'RAE', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop'),
    ('InnovateX – Robotics & Tech Talks', 'RAE', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RAE', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),
    ('Path to Pitch – Robotics Workshop', 'RAE', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop'),

    ('Hazard Huzzle – Safety Quiz', 'SF', 'https://images.unsplash.com/photo-1581092921461-eab10380b1fb?w=1200&h=600&fit=crop'),
    ('The Safety Verdict – Technical Debate', 'SF', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop'),
    ('Insight – Poster/Paper Presentation', 'SF', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop'),
    ('Rescue Raid – Emergency Drill', 'SF', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop'),
    ('Hazard Hunt – Hazard Identification', 'SF', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop'),
    ('Gear Up Challenge – PPE Race', 'SF', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop')
)
INSERT INTO public.events (title, department_id, image_url)
SELECT c.title, d.id, c.image_url
FROM canonical c
JOIN public.departments d ON d.code = c.dept_code
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.title = c.title
    AND e.department_id = d.id
);

-- 3) Keep image URLs in sync for canonical events.
WITH canonical(title, dept_code, image_url) AS (
  VALUES
    ('Prompt Wars', 'CSE', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'),
    ('Bug Bounty', 'CSE', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'),
    ('CSS Royale', 'CSE', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop'),
    ('Build a PC', 'CSE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Catastrophe', 'CSE', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'),
    ('Tech Escape Room', 'CSE', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Hackathon', 'CSE', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'),
    ('E Solder', 'ECE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Lazer Heist', 'ECE', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop'),
    ('ElectroDex', 'ECE', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'),
    ('Electro Hunt', 'ECE', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Red', 'ECE', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop'),
    ('Arduino Crafters', 'EEE', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop'),
    ('Zap Free Zone', 'EEE', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop'),
    ('Defuse-X', 'EEE', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Stacker Blocks', 'EEE', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop'),
    ('Power Play Arena', 'EEE', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop'),
    ('Robosoccer', 'RAE', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop'),
    ('Line Tracer', 'RAE', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop'),
    ('InnovateX – Robotics & Tech Talks', 'RAE', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RAE', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),
    ('Path to Pitch – Robotics Workshop', 'RAE', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop'),
    ('Hazard Huzzle – Safety Quiz', 'SF', 'https://images.unsplash.com/photo-1581092921461-eab10380b1fb?w=1200&h=600&fit=crop'),
    ('The Safety Verdict – Technical Debate', 'SF', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop'),
    ('Insight – Poster/Paper Presentation', 'SF', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop'),
    ('Rescue Raid – Emergency Drill', 'SF', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop'),
    ('Hazard Hunt – Hazard Identification', 'SF', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop'),
    ('Gear Up Challenge – PPE Race', 'SF', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop')
)
UPDATE public.events e
SET image_url = c.image_url
FROM canonical c
JOIN public.departments d ON d.code = c.dept_code
WHERE e.department_id = d.id
  AND e.title = c.title;

-- 4) Delete obsolete events from these departments if they have no registrations.
WITH canonical(title, dept_code) AS (
  VALUES
    ('Prompt Wars', 'CSE'),
    ('Bug Bounty', 'CSE'),
    ('CSS Royale', 'CSE'),
    ('Build a PC', 'CSE'),
    ('Code Catastrophe', 'CSE'),
    ('Tech Escape Room', 'CSE'),
    ('Hackathon', 'CSE'),
    ('E Solder', 'ECE'),
    ('Lazer Heist', 'ECE'),
    ('ElectroDex', 'ECE'),
    ('Electro Hunt', 'ECE'),
    ('Code Red', 'ECE'),
    ('Arduino Crafters', 'EEE'),
    ('Zap Free Zone', 'EEE'),
    ('Defuse-X', 'EEE'),
    ('Stacker Blocks', 'EEE'),
    ('Power Play Arena', 'EEE'),
    ('Robosoccer', 'RAE'),
    ('Line Tracer', 'RAE'),
    ('InnovateX – Robotics & Tech Talks', 'RAE'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RAE'),
    ('Path to Pitch – Robotics Workshop', 'RAE'),
    ('Hazard Huzzle – Safety Quiz', 'SF'),
    ('The Safety Verdict – Technical Debate', 'SF'),
    ('Insight – Poster/Paper Presentation', 'SF'),
    ('Rescue Raid – Emergency Drill', 'SF'),
    ('Hazard Hunt – Hazard Identification', 'SF'),
    ('Gear Up Challenge – PPE Race', 'SF')
)
DELETE FROM public.events e
USING public.departments d
WHERE e.department_id = d.id
  AND d.code IN ('CSE', 'ECE', 'EEE', 'RAE', 'SF')
  AND NOT EXISTS (
    SELECT 1
    FROM canonical c
    WHERE c.title = e.title
      AND c.dept_code = d.code
  )
  AND NOT EXISTS (
    SELECT 1
    FROM public.registrations r
    WHERE r.event_id = e.id
  );
