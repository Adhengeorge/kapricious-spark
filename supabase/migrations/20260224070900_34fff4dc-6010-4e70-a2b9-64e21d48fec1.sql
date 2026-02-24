
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
  ('Civil Engineering', 'CE');

-- Seed events
INSERT INTO public.events (title, description, rules, department_id, event_date, venue) VALUES
  ('AI Hackathon', 'Build innovative AI-powered solutions in a 24-hour hackathon. Teams will tackle real-world problems using machine learning, deep learning, and generative AI.', '1. Team of 2-4 members\n2. Bring your own laptop\n3. Pre-built models not allowed\n4. Judging based on innovation, implementation, and presentation', (SELECT id FROM public.departments WHERE code='CSE'), '2026-03-15 09:00:00+05:30', 'Main Auditorium'),
  ('Code Debugging Challenge', 'Find and fix bugs in complex codebases across multiple languages. Speed and accuracy determine the winner!', '1. Individual participation\n2. 90 minutes time limit\n3. Languages: Python, C++, Java, JavaScript\n4. No external tools allowed', (SELECT id FROM public.departments WHERE code='CSE'), '2026-03-15 14:00:00+05:30', 'Computer Lab 1'),
  ('Capture The Flag', 'A cybersecurity challenge where participants solve puzzles involving cryptography, reverse engineering, web exploitation, and forensics.', '1. Team of 1-3 members\n2. No attacking competition infrastructure\n3. Flag sharing is prohibited\n4. Internet access provided', (SELECT id FROM public.departments WHERE code='ECE'), '2026-03-16 10:00:00+05:30', 'Cyber Lab'),
  ('UI/UX Design Sprint', 'Design beautiful and functional interfaces for a given problem statement in a timed sprint. Creativity meets usability!', '1. Individual or team of 2\n2. Use any design tool (Figma, Adobe XD, etc.)\n3. 3 hours time limit\n4. Present your design at the end', (SELECT id FROM public.departments WHERE code='CSE'), '2026-03-16 09:00:00+05:30', 'Design Studio'),
  ('Robo Race', 'Build and race your robot through an obstacle course. Speed, agility, and engineering precision win the race!', '1. Team of 2-5 members\n2. Robot must be self-powered\n3. Maximum dimensions: 30x30x30 cm\n4. Remote controlled allowed', (SELECT id FROM public.departments WHERE code='ME'), '2026-03-17 10:00:00+05:30', 'Ground Floor Arena'),
  ('Tech Quiz', 'Test your knowledge across technology domains — from programming to electronics to emerging tech trends.', '1. Team of 2 members\n2. Multiple rounds: written, rapid fire, buzzer\n3. No electronic devices\n4. Judges decision is final', (SELECT id FROM public.departments WHERE code='EEE'), '2026-03-17 14:00:00+05:30', 'Seminar Hall');

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
