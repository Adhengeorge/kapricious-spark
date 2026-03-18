-- Sync live DB events with the current website catalog across all
-- department-event groups shown on the site.
-- This migration:
-- 1) ensures missing department buckets exist
-- 2) renames known legacy event titles to current website titles
-- 3) inserts any missing catalog events
-- 4) updates current event metadata (date, venue, image)
-- 5) deletes obsolete catalog rows only when they have no registrations

INSERT INTO public.departments (name, code)
SELECT 'Cultural Events', 'CULTURAL'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.departments
  WHERE code = 'CULTURAL'
);

INSERT INTO public.departments (name, code)
SELECT 'Sports Fiesta', 'SPORTS'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.departments
  WHERE code = 'SPORTS'
);

INSERT INTO public.departments (name, code)
SELECT 'Managerial Events', 'MANAGERIAL'
WHERE NOT EXISTS (
  SELECT 1
  FROM public.departments
  WHERE code = 'MANAGERIAL'
);

WITH renames(old_title, new_title, dept_code) AS (
  VALUES
    ('NO-Run Ninja', 'Build a PC', 'CSE'),
    ('TECH ESCAPE ROOM', 'Realm Of Secrets', 'CSE'),
    ('Tech Escape Room', 'Realm Of Secrets', 'CSE'),
    ('Solder Master', 'Solder-Master', 'ECE'),
    ('E Solder', 'Solder-Master', 'ECE'),
    ('Laser Heist', 'Lazer Heist', 'ECE'),
    ('Robo Soccer', 'Robosoccer', 'RA'),
    ('Vibe Coding Ideathon', 'InnovateX – Robotics & Tech Talks', 'RA'),
    ('Circuit Rush', 'Tech Insights – Expert Talk (NPOL Scientist)', 'RA'),
    ('Safety Quiz', 'Hazard Huzzle – Safety Quiz', 'SF'),
    ('Technical Debate', 'The Safety Verdict – Technical Debate', 'SF'),
    ('Poster/Paper Presentation Competition', 'Insight – Poster/Paper Presentation', 'SF'),
    ('Emergency Drill', 'Rescue Raid – Emergency Drill', 'SF'),
    ('Hazard Hunt', 'Hazard Hunt – Hazard Identification', 'SF'),
    ('PPE Race', 'Gear Up Challenge – PPE Race', 'SF'),
    ('Step in Synchro', 'Spot Choreo', 'CULTURAL'),
    ('INFRAHUNT (Treasure Hunt)', 'Infrahunt', 'CE'),
    ('STRUCTRA', 'Structra (Paper Tower Challenge)', 'CE')
)
UPDATE public.events e
SET title = r.new_title
FROM renames r
JOIN public.departments d ON d.code = r.dept_code
WHERE e.department_id = d.id
  AND e.title = r.old_title;

WITH canonical(title, dept_code, event_date, venue, image_url) AS (
  VALUES
    ('Fashion Show', 'CULTURAL', '2026-03-28 18:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop'),
    ('Group Dance', 'CULTURAL', '2026-03-28 16:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop'),
    ('Spot Choreo', 'CULTURAL', '2026-03-28 14:00:00+05:30'::timestamptz, 'Open Air Stage, KMEA Engineering College', 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop'),
    ('Spot Photography', 'CULTURAL', '2026-03-28 10:00:00+05:30'::timestamptz, 'Campus Wide, KMEA Engineering College', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop'),
    ('Star of Kapricious', 'MANAGERIAL', '2026-03-28 17:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop'),

    ('7''s Football Tournament', 'SPORTS', '2026-03-24 00:00:00+05:30'::timestamptz, 'KMEA College Ground', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop'),
    ('Kabaddi Tournament', 'SPORTS', '2026-03-25 00:00:00+05:30'::timestamptz, 'College Indoor Kabaddi Court', 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200&h=600&fit=crop'),

    ('Prompt Wars', 'CSE', '2026-03-27 11:30:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'),
    ('Bug Bounty', 'CSE', '2026-03-27 14:00:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'),
    ('CSS Royale', 'CSE', '2026-03-27 11:30:00+05:30'::timestamptz, 'CCF-3', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop'),
    ('Build a PC', 'CSE', '2026-03-28 12:00:00+05:30'::timestamptz, 'CCF-2', 'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&h=600&fit=crop'),
    ('Code Catastrophe', 'CSE', '2026-03-28 12:00:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'),
    ('Realm Of Secrets', 'CSE', '2026-03-27 12:00:00+05:30'::timestamptz, 'B309, Whole Campus', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Hackathon', 'CSE', '2026-03-26 07:00:00+05:30'::timestamptz, 'Hack Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'),

    ('Bridgit (Bridge Modelling)', 'CE', '2026-03-27 09:00:00+05:30'::timestamptz, 'D304', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop'),
    ('CAD Illumina', 'CE', '2026-03-28 09:30:00+05:30'::timestamptz, 'CAD Lab, Civil Block', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop'),
    ('Movethon', 'CE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Smart Class, Civil Block', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Quizzard', 'CE', '2026-03-28 09:30:00+05:30'::timestamptz, 'Seminar Hall, Civil Block', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
    ('Infrahunt', 'CE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Whole Department', 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop'),
    ('Structra (Paper Tower Challenge)', 'CE', '2026-03-28 09:00:00+05:30'::timestamptz, 'Seminar Hall, Civil Block', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop'),

    ('Solder-Master', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B308', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Lazer Heist', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B214', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop'),
    ('ElectroDex', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B307', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'),
    ('Electro Hunt', 'ECE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Green Block', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Red', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B303', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop'),

    ('Arduino Crafters', 'EEE', '2026-03-27 11:30:00+05:30'::timestamptz, 'C406', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop'),
    ('Zap Free Zone', 'EEE', '2026-03-27 11:30:00+05:30'::timestamptz, 'C205-A', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop'),
    ('Defuse-X', 'EEE', '2026-03-27 14:00:00+05:30'::timestamptz, 'C209', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Stacker Blocks', 'EEE', '2026-03-27 11:00:00+05:30'::timestamptz, 'C205B', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop'),
    ('Power Play Arena', 'EEE', '2026-03-27 12:00:00+05:30'::timestamptz, 'C306', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop'),

    ('Assemble-X (EV Edition)', 'ME', '2026-03-27 10:00:00+05:30'::timestamptz, 'VR Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop'),
    ('RC Trails', 'ME', '2026-03-27 14:30:00+05:30'::timestamptz, 'Outdoor RC Track, KMEA Engineering College', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=600&fit=crop'),
    ('CAD Combat', 'ME', '2026-03-27 10:00:00+05:30'::timestamptz, 'CAD Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop'),
    ('Technical Quiz', 'ME', '2026-03-27 11:00:00+05:30'::timestamptz, 'Seminar Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
    ('Sustainable Innovation Pitching', 'ME', '2026-03-27 14:00:00+05:30'::timestamptz, 'Conference Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop'),

    ('Robosoccer', 'RA', '2026-03-27 10:00:00+05:30'::timestamptz, 'Badminton Court', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop'),
    ('Line Tracer', 'RA', '2026-03-27 13:00:00+05:30'::timestamptz, 'Badminton Court', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop'),
    ('InnovateX – Robotics & Tech Talks', 'RA', '2026-03-27 16:00:00+05:30'::timestamptz, 'Robotics Innovation Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RA', '2026-03-28 10:00:00+05:30'::timestamptz, 'Conference Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),

    ('Hazard Huzzle – Safety Quiz', 'SF', '2026-03-27 12:00:00+05:30'::timestamptz, 'D301', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),
    ('The Safety Verdict – Technical Debate', 'SF', '2026-03-27 13:30:00+05:30'::timestamptz, 'D302', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop'),
    ('Insight – Poster/Paper Presentation', 'SF', '2026-03-27 15:30:00+05:30'::timestamptz, 'D303', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop'),
    ('Rescue Raid – Emergency Drill', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Bus Bay, D301, Corridor of D301, Premise of HOD Cabin, SFE, External Staircase of Green Block', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop'),
    ('Hazard Hunt – Hazard Identification', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Civil Block', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop'),
    ('Gear Up Challenge – PPE Race', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Fire Engineering Laboratory', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop')
)
INSERT INTO public.events (title, department_id, event_date, venue, image_url)
SELECT c.title, d.id, c.event_date, c.venue, c.image_url
FROM canonical c
JOIN public.departments d ON d.code = c.dept_code
WHERE NOT EXISTS (
  SELECT 1
  FROM public.events e
  WHERE e.title = c.title
    AND e.department_id = d.id
);

WITH canonical(title, dept_code, event_date, venue, image_url) AS (
  VALUES
    ('Fashion Show', 'CULTURAL', '2026-03-28 18:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop'),
    ('Group Dance', 'CULTURAL', '2026-03-28 16:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop'),
    ('Spot Choreo', 'CULTURAL', '2026-03-28 14:00:00+05:30'::timestamptz, 'Open Air Stage, KMEA Engineering College', 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop'),
    ('Spot Photography', 'CULTURAL', '2026-03-28 10:00:00+05:30'::timestamptz, 'Campus Wide, KMEA Engineering College', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop'),
    ('Star of Kapricious', 'MANAGERIAL', '2026-03-28 17:00:00+05:30'::timestamptz, 'Main Auditorium, KMEA Engineering College', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop'),

    ('7''s Football Tournament', 'SPORTS', '2026-03-24 00:00:00+05:30'::timestamptz, 'KMEA College Ground', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop'),
    ('Kabaddi Tournament', 'SPORTS', '2026-03-25 00:00:00+05:30'::timestamptz, 'College Indoor Kabaddi Court', 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200&h=600&fit=crop'),

    ('Prompt Wars', 'CSE', '2026-03-27 11:30:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'),
    ('Bug Bounty', 'CSE', '2026-03-27 14:00:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'),
    ('CSS Royale', 'CSE', '2026-03-27 11:30:00+05:30'::timestamptz, 'CCF-3', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop'),
    ('Build a PC', 'CSE', '2026-03-28 12:00:00+05:30'::timestamptz, 'CCF-2', 'https://images.unsplash.com/photo-1591799265444-d66432b91588?w=1200&h=600&fit=crop'),
    ('Code Catastrophe', 'CSE', '2026-03-28 12:00:00+05:30'::timestamptz, 'CCF-1', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'),
    ('Realm Of Secrets', 'CSE', '2026-03-27 12:00:00+05:30'::timestamptz, 'B309, Whole Campus', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Hackathon', 'CSE', '2026-03-26 07:00:00+05:30'::timestamptz, 'Hack Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'),

    ('Bridgit (Bridge Modelling)', 'CE', '2026-03-27 09:00:00+05:30'::timestamptz, 'D304', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop'),
    ('CAD Illumina', 'CE', '2026-03-28 09:30:00+05:30'::timestamptz, 'CAD Lab, Civil Block', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop'),
    ('Movethon', 'CE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Smart Class, Civil Block', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Quizzard', 'CE', '2026-03-28 09:30:00+05:30'::timestamptz, 'Seminar Hall, Civil Block', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
    ('Infrahunt', 'CE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Whole Department', 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop'),
    ('Structra (Paper Tower Challenge)', 'CE', '2026-03-28 09:00:00+05:30'::timestamptz, 'Seminar Hall, Civil Block', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop'),

    ('Solder-Master', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B308', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Lazer Heist', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B214', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=600&fit=crop'),
    ('ElectroDex', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B307', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'),
    ('Electro Hunt', 'ECE', '2026-03-27 14:00:00+05:30'::timestamptz, 'Green Block', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
    ('Code Red', 'ECE', '2026-03-27 11:30:00+05:30'::timestamptz, 'B303', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop'),

    ('Arduino Crafters', 'EEE', '2026-03-27 11:30:00+05:30'::timestamptz, 'C406', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop'),
    ('Zap Free Zone', 'EEE', '2026-03-27 11:30:00+05:30'::timestamptz, 'C205-A', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop'),
    ('Defuse-X', 'EEE', '2026-03-27 14:00:00+05:30'::timestamptz, 'C209', 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
    ('Stacker Blocks', 'EEE', '2026-03-27 11:00:00+05:30'::timestamptz, 'C205B', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop'),
    ('Power Play Arena', 'EEE', '2026-03-27 12:00:00+05:30'::timestamptz, 'C306', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop'),

    ('Assemble-X (EV Edition)', 'ME', '2026-03-27 10:00:00+05:30'::timestamptz, 'VR Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop'),
    ('RC Trails', 'ME', '2026-03-27 14:30:00+05:30'::timestamptz, 'Outdoor RC Track, KMEA Engineering College', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&h=600&fit=crop'),
    ('CAD Combat', 'ME', '2026-03-27 10:00:00+05:30'::timestamptz, 'CAD Lab, KMEA Engineering College', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop'),
    ('Technical Quiz', 'ME', '2026-03-27 11:00:00+05:30'::timestamptz, 'Seminar Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
    ('Sustainable Innovation Pitching', 'ME', '2026-03-27 14:00:00+05:30'::timestamptz, 'Conference Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop'),

    ('Robosoccer', 'RA', '2026-03-27 10:00:00+05:30'::timestamptz, 'Badminton Court', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop'),
    ('Line Tracer', 'RA', '2026-03-27 13:00:00+05:30'::timestamptz, 'Badminton Court', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop'),
    ('InnovateX – Robotics & Tech Talks', 'RA', '2026-03-27 16:00:00+05:30'::timestamptz, 'Robotics Innovation Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RA', '2026-03-28 10:00:00+05:30'::timestamptz, 'Conference Hall, KMEA Engineering College', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),

    ('Hazard Huzzle – Safety Quiz', 'SF', '2026-03-27 12:00:00+05:30'::timestamptz, 'D301', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=600&fit=crop'),
    ('The Safety Verdict – Technical Debate', 'SF', '2026-03-27 13:30:00+05:30'::timestamptz, 'D302', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop'),
    ('Insight – Poster/Paper Presentation', 'SF', '2026-03-27 15:30:00+05:30'::timestamptz, 'D303', 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop'),
    ('Rescue Raid – Emergency Drill', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Bus Bay, D301, Corridor of D301, Premise of HOD Cabin, SFE, External Staircase of Green Block', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop'),
    ('Hazard Hunt – Hazard Identification', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Civil Block', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop'),
    ('Gear Up Challenge – PPE Race', 'SF', '2026-03-28 10:00:00+05:30'::timestamptz, 'Fire Engineering Laboratory', 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop')
)
UPDATE public.events e
SET
  event_date = c.event_date,
  venue = c.venue,
  image_url = c.image_url
FROM canonical c
JOIN public.departments d ON d.code = c.dept_code
WHERE e.department_id = d.id
  AND e.title = c.title;

WITH canonical(title, dept_code) AS (
  VALUES
    ('Fashion Show', 'CULTURAL'),
    ('Group Dance', 'CULTURAL'),
    ('Spot Choreo', 'CULTURAL'),
    ('Spot Photography', 'CULTURAL'),
    ('Star of Kapricious', 'MANAGERIAL'),
    ('7''s Football Tournament', 'SPORTS'),
    ('Kabaddi Tournament', 'SPORTS'),
    ('Prompt Wars', 'CSE'),
    ('Bug Bounty', 'CSE'),
    ('CSS Royale', 'CSE'),
    ('Build a PC', 'CSE'),
    ('Code Catastrophe', 'CSE'),
    ('Realm Of Secrets', 'CSE'),
    ('Hackathon', 'CSE'),
    ('Bridgit (Bridge Modelling)', 'CE'),
    ('CAD Illumina', 'CE'),
    ('Movethon', 'CE'),
    ('Quizzard', 'CE'),
    ('Infrahunt', 'CE'),
    ('Structra (Paper Tower Challenge)', 'CE'),
    ('Solder-Master', 'ECE'),
    ('Lazer Heist', 'ECE'),
    ('ElectroDex', 'ECE'),
    ('Electro Hunt', 'ECE'),
    ('Code Red', 'ECE'),
    ('Arduino Crafters', 'EEE'),
    ('Zap Free Zone', 'EEE'),
    ('Defuse-X', 'EEE'),
    ('Stacker Blocks', 'EEE'),
    ('Power Play Arena', 'EEE'),
    ('Assemble-X (EV Edition)', 'ME'),
    ('RC Trails', 'ME'),
    ('CAD Combat', 'ME'),
    ('Technical Quiz', 'ME'),
    ('Sustainable Innovation Pitching', 'ME'),
    ('Robosoccer', 'RA'),
    ('Line Tracer', 'RA'),
    ('InnovateX – Robotics & Tech Talks', 'RA'),
    ('Tech Insights – Expert Talk (NPOL Scientist)', 'RA'),
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
  AND d.code IN ('CULTURAL', 'MANAGERIAL', 'SPORTS', 'CSE', 'CE', 'ECE', 'EEE', 'ME', 'RA', 'SF')
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

