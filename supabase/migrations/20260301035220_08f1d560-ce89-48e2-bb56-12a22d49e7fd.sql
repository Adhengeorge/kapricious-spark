
DROP POLICY "Registrations readable by admins" ON public.registrations;

CREATE POLICY "Registrations readable by admins and inserters"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);
