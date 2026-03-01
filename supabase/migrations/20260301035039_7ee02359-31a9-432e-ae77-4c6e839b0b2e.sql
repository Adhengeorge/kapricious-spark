
DROP POLICY "Anyone can register" ON public.registrations;

CREATE POLICY "Anyone can register"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
