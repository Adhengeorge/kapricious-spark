
-- Departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departments are publicly readable" ON public.departments FOR SELECT USING (true);

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  rules TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
  event_date TIMESTAMPTZ,
  venue TEXT,
  max_participants INT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are publicly readable" ON public.events FOR SELECT USING (true);

-- Registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(email, event_id)
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Registrations readable by admins" ON public.registrations FOR SELECT TO authenticated USING (true);

-- Certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES public.registrations(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  certificate_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Certificates publicly searchable" ON public.certificates FOR SELECT USING (true);

-- Admin role setup
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for events
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for departments
CREATE POLICY "Admins can insert departments" ON public.departments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update departments" ON public.departments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete departments" ON public.departments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for certificates
CREATE POLICY "Admins can insert certificates" ON public.certificates FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update certificates" ON public.certificates FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete certificates" ON public.certificates FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for registrations
CREATE POLICY "Admins can delete registrations" ON public.registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed departments
INSERT INTO public.departments (name, code) VALUES
  ('Computer Science & Engineering', 'CSE'),
  ('Electronics & Communication', 'ECE'),
  ('Electrical & Electronics', 'EEE'),
  ('Mechanical Engineering', 'ME'),
  ('Civil Engineering', 'CE'),
  ('Robotics & Automation Engineering', 'RA'),
  ('Safety & Fire Engineering', 'SF'),
  ('Kapricious Main Stage', 'MAIN');

-- Seed events
INSERT INTO public.events (
  title,
  description,
  rules,
  department_id,
  event_date,
  venue,
  max_participants,
  image_url
) VALUES
  ('Assemble-X (EV Edition)',
   'A VR-based Electric Vehicle assembly challenge where participants assemble EV components in a simulated factory.',
   E'1. Solo participants only\n2. VR headsets and tools provided\n3. Complete the EV assembly within 2.5 hours\n4. Accuracy and innovation are both scored\n5. No external references or help allowed\n6. Final ranking combines speed and precision',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-27 10:00:00+05:30',
   'VR Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&h=600&fit=crop'),
  ('RC Trails',
   'A high-speed remote-control vehicle lap challenge that rewards control, precision, and blistering lap times.',
   E'1. Individual participation\n2. Bring your own RC vehicle or use the provided fleet\n3. Multiple laps; best lap time counts\n4. Stay within track boundaries\n5. Battery swaps only in the pit area\n6. Judges penalize collisions and shortcuts',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-27 14:30:00+05:30',
   'Outdoor RC Track, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1200&h=600&fit=crop'),
  ('CAD Combat',
   'Create precise and creative CAD models within a limited timeframe while showcasing engineering intelligence.',
   E'1. Solo participants only\n2. Use AutoCAD, SolidWorks, or Fusion 360\n3. Problem statement issued at the start\n4. Complete the design within 90 minutes\n5. Submit the model and a short rationale\n6. Judging: precision, creativity, feasibility',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-28 10:00:00+05:30',
   'CAD Lab, KMEA Engineering College',
   60,
   'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop'),
  ('Technical Quiz',
   'A multi-round quiz testing depth in thermodynamics, mechanics, materials, and modern mechanical systems.',
   E'1. Teams of two members\n2. Written, rapid-fire, and buzzer rounds\n3. Topics: mechanics, materials, fluids, dynamics\n4. No electronic devices allowed\n5. Negative marking applies in written round\n6. Tie-breaker decided by rapid-fire',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-28 11:00:00+05:30',
   'Seminar Hall, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
  ('Sustainable Innovation Pitching',
   'Pitch eco-friendly engineering solutions backed by research, impact metrics, and scalable prototypes.',
   E'1. Teams of up to four members\n2. Pitch duration: 10 minutes plus 5 minutes Q&A\n3. Highlight sustainability metrics and feasibility\n4. Slide deck and prototype preferred\n5. Judges evaluate innovation, feasibility, impact, delivery\n6. Participants must submit slides after the pitch',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-27 14:00:00+05:30',
   'Conference Hall, KMEA Engineering College',
   20,
   'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop'),
  ('Lathe Master',
   'Transform raw material into a precision component on the lathe while demonstrating machining discipline.',
   E'1. Solo participants only\n2. Safety gear mandatory at all times\n3. Time limit: 45 minutes\n4. Raw stock and tools provided\n5. Judging: accuracy, surface finish, time management\n6. Safety violations cause immediate disqualification',
   (SELECT id FROM public.departments WHERE code='ME'),
   '2026-03-28 10:00:00+05:30',
   'Mechanical Workshop, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=600&fit=crop'),
  ('Bridgit (Bridge Modelling)',
   'Design and construct a bridge using limited materials and prepare it for load testing.',
   E'1. Teams of up to four members\n2. Only provided materials allowed\n3. Maximum span of 50 cm\n4. Bridge must support the prescribed load\n5. Build within 3 hours\n6. Judging: structural load, design, creativity',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-27 09:00:00+05:30',
   'Civil Engineering Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=600&fit=crop'),
  ('CAD Illumina',
   'A CAD drafting competition that prizes accuracy, speed, and technical understanding.',
   E'1. Individual participation\n2. Use AutoCAD or similar tools\n3. Problem statement revealed at the start\n4. Time limit: 90 minutes\n5. Submit the final drawing file\n6. Judging: precision, speed, presentation',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-28 10:00:00+05:30',
   'Civil CAD Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop'),
  ('Movethon',
   'Teams ideate and present innovative civil solutions to real-world challenges.',
   E'1. Teams of four\n2. Problem statements revealed at kickoff\n3. 10-minute presentations with Q&A\n4. Focus on feasibility and scalability\n5. Judges assess storytelling and data\n6. Innovation, viability, presentation scores matter',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-27 14:00:00+05:30',
   'Conference Hall, KMEA Engineering College',
   20,
   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop'),
  ('Quizzard',
   'A multi-level civil engineering quiz covering structures, surveying, and smart infrastructure.',
   E'1. Teams of two\n2. Written, rapid-fire, and buzzer rounds\n3. Topics: structures, surveying, materials\n4. No electronic devices allowed\n5. Negative marking in written round\n6. Tie breaks via buzzer',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-28 11:00:00+05:30',
   'Seminar Hall, KMEA Engineering College',
   20,
   'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop'),
  ('Infrahunt',
   'A treasure hunt where teams solve civil engineering clues and navigate the campus.',
   E'1. Teams of four\n2. Follow clues sequentially\n3. Stay within campus boundaries\n4. Clue book provided at each gate\n5. No external assistance allowed\n6. First team to find the treasure wins',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-27 14:00:00+05:30',
   'Campus Wide, KMEA Engineering College',
   60,
   'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=600&fit=crop'),
  ('Structra (Paper Tower Challenge)',
   'Build the tallest freestanding paper tower using limited materials within the time limit.',
   E'1. Teams of four\n2. Use only paper, tape, and glue\n3. Tower must stand for 30 seconds\n4. Time limit: 45 minutes\n5. Height measured at the highest stable point\n6. No external supports allowed',
   (SELECT id FROM public.departments WHERE code='CE'),
   '2026-03-28 15:00:00+05:30',
   'Civil Lab, KMEA Engineering College',
   15,
   'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop'),
  ('Prompt Wars',
   'Engineer creative prompts for AI models and deliver the best outputs within constraints.',
   E'1. Individual participation\n2. 60-minute window\n3. Prompts evaluated on clarity, intent, and correctness\n4. Use provided AI endpoints only\n5. No external data sources\n6. Multiple stages: creation and refinement',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-27 10:00:00+05:30',
   'AI Lab, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'),
  ('Bug Bounty',
   'Hunt and fix bugs in complex codebases while maintaining readability and test coverage.',
   E'1. Individual participation\n2. 90 minutes\n3. Languages: Python, JavaScript, or C++\n4. Each bug has a score\n5. Submit fixes with explanation\n6. More bugs fixed with clean patches score higher',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-27 14:00:00+05:30',
   'Cyber Lab, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'),
  ('CSS Royale',
   'Compose a visually stunning layout using only HTML and CSS while demonstrating responsive design.',
   E'1. Individual participation\n2. 2-hour time limit\n3. Pure HTML and CSS tools only\n4. Responsive grid expected\n5. Judges evaluate aesthetics and cleanliness\n6. Use semantic markup where possible',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-28 10:00:00+05:30',
   'Frontend Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&h=600&fit=crop'),
  ('Build a PC',
   'Assemble and dedman the best performing workstation under time pressure.',
   E'1. Individual participation\n2. Components provided onsite\n3. 90-minute assembly window\n4. Must boot into BIOS and run diagnostics\n5. Bonus points for cable management\n6. Submit a short build summary',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-28 14:00:00+05:30',
   'Hardware Lab, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
  ('Code Catastrophe',
   'Create chaotic yet functional code that impresses with creativity and correctness.',
   E'1. Individual participation\n2. 90 minutes\n3. Any programming language allowed\n4. Code must compile or run successfully\n5. Creativity earns bonus points\n6. Judges score functionality and uniqueness',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-27 16:00:00+05:30',
   'Innovation Studio, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop'),
  ('Tech Escape Room',
   'Solve encryption, debugging, and logic puzzles to escape the themed room within 60 minutes.',
   E'1. Teams of four members\n2. 60-minute time box\n3. QR clues provided at each stage\n4. No outside help allowed\n5. Escape by solving all puzzles\n6. Fastest escape wins with bonus points',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-27 18:00:00+05:30',
   'CSE Department, KMEA Engineering College',
   80,
   'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
  ('Hackathon',
   'A 12-hour innovation sprint where teams build working prototypes addressing real problems.',
   E'1. Teams of up to four members\n2. 12-hour coding window\n3. Problem statement announced at kickoff\n4. Working prototype mandatory\n5. Any tech stack allowed\n6. Judges assess innovation, implementation, presentation',
   (SELECT id FROM public.departments WHERE code='CSE'),
   '2026-03-28 09:00:00+05:30',
   'Hack Lab, KMEA Engineering College',
   80,
   'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop'),

  ('E Solder',
   'An action-inspired electronics sprint where participants complete short mission-based tasks.',
   E'1. Individual participation\n2. Complete each mission to unlock the next\n3. No external electronics allowed\n4. Time limit per stage: 5 minutes\n5. Judges evaluate precision, speed, and creativity\n6. Decision of judges is final',
   (SELECT id FROM public.departments WHERE code='ECE'),
   '2026-03-27 09:00:00+05:30',
   'ECE Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1581091012184-3a42df66e89e?w=1200&h=600&fit=crop'),
  ('Lazer Heist',
   'Navigate through a simulated laser security grid and steal the vault without tripping beam sensors.',
   E'1. Individual participation\n2. Three attempts per participant\n3. Laser grid resets on contact\n4. Time limit: 5 minutes per attempt\n5. Judging: completion time and accuracy\n6. Safety goggles mandatory',
   (SELECT id FROM public.departments WHERE code='ECE'),
   '2026-03-27 11:00:00+05:30',
   'ECE Innovation Arena, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?w=1200&h=600&fit=crop'),
  ('ElectroDex',
   'Identify components, decode circuits, and answer rapid-fire ECE questions in this knowledge sprint.',
   E'1. Individual participation\n2. Multiple choice and puzzle rounds\n3. No electronic devices allowed\n4. Time limit: 60 minutes\n5. Negative marking for wrong answers\n6. Top scorers advance to finals',
   (SELECT id FROM public.departments WHERE code='ECE'),
   '2026-03-27 13:00:00+05:30',
   'Seminar Hall, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop'),
  ('Electro Hunt',
   'A campus-wide treasure hunt where solving electronics clues leads to the final prize.',
   E'1. Individual participation\n2. Follow sequential checkpoints\n3. No external assistance allowed\n4. Stay within campus boundaries\n5. First to finish wins\n6. Organizers reserve the right to disqualify unfair play',
   (SELECT id FROM public.departments WHERE code='ECE'),
   '2026-03-27 14:45:00+05:30',
   'Campus Wide, KMEA Engineering College',
   60,
   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop'),
  ('Code Red',
   'Embedded systems challenge with timed coding tasks on microcontrollers and IoT flows.',
   E'1. Individual participation\n2. Programming in C/C++ for microcontrollers\n3. 90-minute window\n4. Code must run on provided boards\n5. No pre-written templates allowed\n6. Internet access limited to offline docs',
   (SELECT id FROM public.departments WHERE code='ECE'),
   '2026-03-27 16:45:00+05:30',
   'Computer Lab, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop'),
  ('Arduino Crafters',
   'Design and demonstrate an Arduino project using modular sensors and actuators.',
   E'1. Individual participation\n2. Components provided\n3. 90-minute time limit\n4. Code and wiring must be documented\n5. Judges evaluate innovation and functionality\n6. No pre-built modules allowed',
   (SELECT id FROM public.departments WHERE code='EEE'),
   '2026-03-27 10:00:00+05:30',
   'EEE Lab, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&h=600&fit=crop'),
  ('Zap Free Zone',
   'Navigate a reaction arena to avoid zap zones while completing challenges.',
   E'1. Solo participants\n2. Avoid touching marked zap areas\n3. Challenges escalate in difficulty\n4. Timer stops on contact with forbidden zones\n5. Provided toolkit only\n6. Fastest safe completion wins',
   (SELECT id FROM public.departments WHERE code='EEE'),
   '2026-03-27 11:00:00+05:30',
   'EEE Department, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop'),
  ('Defuse-X',
   'Decode puzzles and work as a team to safely defuse the mock device.',
   E'1. Teams of three members\n2. Solve puzzles sequentially\n3. Communication only within the team\n4. Time limit: 30 minutes per round\n5. No outside help allowed\n6. Fastest defusal wins',
   (SELECT id FROM public.departments WHERE code='EEE'),
   '2026-03-27 14:00:00+05:30',
   'EEE Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1200&h=600&fit=crop'),
  ('Stacker Blocks',
   'Stack blocks as high as possible while reacting to speed increases.',
   E'1. Individual participation\n2. Stack blocks within time limit\n3. Speed increases with each level\n4. Top score counts\n5. Multiple attempts allowed\n6. No external aids',
   (SELECT id FROM public.departments WHERE code='EEE'),
   '2026-03-27 11:00:00+05:30',
   'EEE Activity Zone, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=600&fit=crop'),
  ('Power Play Arena',
   'Compete across multiple console and PC titles inside a full-day gaming arena.',
   E'1. Teams of up to four participants\n2. Console setups provided\n3. Tournament bracket format\n4. Adhere to fair play rules\n5. Controllers and hardware supplied\n6. Bring your own slots when needed',
   (SELECT id FROM public.departments WHERE code='EEE'),
   '2026-03-27 10:00:00+05:30',
   'Gaming Zone, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop'),
  ('Robosoccer',
   'Autonomous or remote-controlled robots compete in a soccer match on a compact arena.',
   E'1. Teams of up to four\n2. Robots may be autonomous or remote controlled\n3. Maximum robot size: 30 cm cube\n4. Match duration: five minutes per half\n5. No damaging opponent robots\n6. Judging: goals, fair play, design',
   (SELECT id FROM public.departments WHERE code='RA'),
   '2026-03-27 10:00:00+05:30',
   'Robotics Arena, KMEA Engineering College',
   60,
   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop'),
  ('Line Tracer',
   'Build and program a robot to follow a complex line track with speed and accuracy.',
   E'1. Teams of four\n2. Robot must follow black line on white surface\n3. Track includes curves and intersections\n4. Fastest completion time wins\n5. No manual intervention allowed\n6. Judges score speed and precision',
   (SELECT id FROM public.departments WHERE code='RA'),
   '2026-03-27 14:00:00+05:30',
   'Robotics Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=600&fit=crop'),
  ('InnovateX – Robotics & Tech Talks',
   'Hear from robotics innovators sharing use cases in automation, AI, and emerging tech.',
   E'1. Open to all attendees\n2. Limited seating available\n3. Q&A follows each session\n4. Follow speaker schedule\n5. Recording for internal reference only\n6. Maintain decorum',
   (SELECT id FROM public.departments WHERE code='RA'),
   '2026-03-27 16:00:00+05:30',
   'Robotics Innovation Hall, KMEA Engineering College',
   120,
   'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=600&fit=crop'),
  ('Tech Insights – Expert Talk (NPOL Scientist)',
   'A fireside session with a scientist covering robotics research, defense automation, and future tech.',
   E'1. Free entry\n2. Audience participation encouraged\n3. Photography allowed with permission\n4. Sessions start on time\n5. No commercial promotions allowed\n6. Respect the speaker',
   (SELECT id FROM public.departments WHERE code='RA'),
   '2026-03-28 10:00:00+05:30',
   'Conference Hall, KMEA Engineering College',
   120,
   'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=600&fit=crop'),
  
  ('Hazard Huzzle – Safety Quiz',
   'Team-based quiz covering fire safety, industrial protocols, and emergency preparedness.',
   E'1. Teams of two\n2. Multiple rounds: written, buzzer, rapid fire\n3. Topics: fire safety, hazard control, compliance\n4. No electronic devices\n5. Negative marking for wrong answers\n6. Tie breaker via buzzer round',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-27 09:00:00+05:30',
   'Fire Safety Lab, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&h=600&fit=crop'),
  ('The Safety Verdict – Technical Debate',
   'Structured debate on fire safety policies, regulations, and industry standards.',
   E'1. Teams of three speakers\n2. Topics issued 30 minutes before debate\n3. Each speaker gets five minutes\n4. Rebuttals follow\n5. Maintain decorum\n6. Judging: content, delivery, teamwork',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-27 11:30:00+05:30',
   'Seminar Hall, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1523362628745-0c100150b9b0?w=1200&h=600&fit=crop'),
  ('Insight – Poster/Paper Presentation',
   'Present research, case studies, or innovations in fire and safety.',
   E'1. Teams of up to four\n2. Topic must be fire or safety related\n3. Poster size: A1\n4. Presentation: 10 minutes plus 5 minutes Q&A\n5. Original work only\n6. Judging: content, presentation, innovation',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-27 14:00:00+05:30',
   'Conference Hall, KMEA Engineering College',
   50,
   'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&h=600&fit=crop'),
  ('Rescue Raid – Emergency Drill',
   'Simulated emergency response where teams evacuate victims and demonstrate protocols.',
   E'1. Teams of four\n2. Follow the coordinators\n3. Complete drills under pressure\n4. PPE must be worn\n5. Judging: coordination, timing, protocol adherence\n6. Safety violations incur penalties',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-27 15:00:00+05:30',
   'Fire Safety Grounds, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&h=600&fit=crop'),
  ('Hazard Hunt – Hazard Identification',
   'Inspect a simulated workplace, identify hazards, and propose controls within the time limit.',
   E'1. Teams of four\n2. Hazard walk-through with documentation\n3. Time limit: 90 minutes\n4. No electronic devices during inspection\n5. Judging: accuracy, completeness, mitigation\n6. Stay within assigned zones',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-28 10:00:00+05:30',
   'Workshop Area, KMEA Engineering College',
   40,
   'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop'),
  ('Gear Up Challenge – PPE Race',
   'Race to correctly don full PPE kits while obeying safety checklists.',
   E'1. Teams of two\n2. Don all assigned PPE components\n3. Time penalties for mistakes\n4. Single attempt per round\n5. Judging: speed and accuracy\n6. Safety briefing mandatory',
   (SELECT id FROM public.departments WHERE code='SF'),
   '2026-03-28 13:00:00+05:30',
   'Fire Training Arena, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=600&fit=crop'),
  ('Fashion Show',
   'Showcase themed fashion collections with choreography, music, and styling on the main stage runway.',
   E'1. Teams of 8-12 members\n2. Theme must be declared during registration\n3. Performance duration: 8-12 minutes\n4. Costumes and props are team responsibility\n5. No vulgar or offensive content\n6. Judging: theme, costumes, choreography, overall impact',
   (SELECT id FROM public.departments WHERE code='MAIN'),
   '2026-03-28 18:00:00+05:30',
   'Main Auditorium, KMEA Engineering College',
   12,
   'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop'),
  ('Group Dance',
   'Bring the stage alive with synchronized choreography across classical, western, fusion, or folk formats.',
   E'1. Teams of 6-10 members\n2. Performance duration: 5-8 minutes\n3. Any dance style allowed\n4. Props allowed with limited setup time\n5. No fire, water, or hazardous materials\n6. Judging: choreography, synchronization, expression, costumes',
   (SELECT id FROM public.departments WHERE code='MAIN'),
   '2026-03-28 16:00:00+05:30',
   'Main Auditorium, KMEA Engineering College',
   10,
   'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1200&h=600&fit=crop'),
  ('Step in Synchro',
   'A synchronization challenge where teams perform in perfect unison and timing under fixed music cues.',
   E'1. Teams of 4 members\n2. Performance duration: 3-5 minutes\n3. All members must maintain synchronized movement\n4. Background track will be provided\n5. No props allowed\n6. Judging: synchronization, creativity, energy',
   (SELECT id FROM public.departments WHERE code='MAIN'),
   '2026-03-28 14:00:00+05:30',
   'Open Air Stage, KMEA Engineering College',
   20,
   'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=600&fit=crop'),
  ('Spot Photography',
   'Capture the fest through your lens after an on-spot theme reveal and submit your best framed shots.',
   E'1. Individual participation\n2. Theme announced at event start\n3. Bring your own camera or smartphone\n4. Submit best 3 photos only\n5. Basic color correction allowed\n6. Judging: creativity, theme relevance, technical quality',
   (SELECT id FROM public.departments WHERE code='MAIN'),
   '2026-03-28 10:00:00+05:30',
   'Campus Wide, KMEA Engineering College',
   100,
   'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200&h=600&fit=crop'),
  ('Star of Kapricious',
   'A Main Stage talent showcase that celebrates singing, dance, standup, instruments, and any unique act.',
   E'1. Individual participation\n2. Performance duration: 3-5 minutes\n3. Bring required instruments or props\n4. Pre-recorded tracks allowed for singers\n5. Judges evaluate talent, stage presence, engagement\n6. Preliminary screening if entries exceed limits',
   (SELECT id FROM public.departments WHERE code='MAIN'),
   '2026-03-28 17:00:00+05:30',
   'Main Auditorium, KMEA Engineering College',
   30,
   'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for certificates
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);

CREATE POLICY "Anyone can view certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Admins can upload certificates" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update certificates" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete certificates" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));





