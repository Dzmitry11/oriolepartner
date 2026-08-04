CREATE POLICY "Public can view car images" ON storage.objects FOR SELECT USING (bucket_id = 'cars');
CREATE POLICY "Admins upload car images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cars' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update car images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cars' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete car images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cars' AND public.has_role(auth.uid(),'admin'));