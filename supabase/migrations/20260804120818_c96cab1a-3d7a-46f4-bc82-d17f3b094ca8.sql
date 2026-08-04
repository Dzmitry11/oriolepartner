-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site settings (single row)
CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  telegram text NOT NULL DEFAULT '',
  viber text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  map_embed text NOT NULL DEFAULT '',
  hours text NOT NULL DEFAULT '',
  full_name text NOT NULL DEFAULT '',
  short_name text NOT NULL DEFAULT '',
  krs text NOT NULL DEFAULT '',
  nip text NOT NULL DEFAULT '',
  regon text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (id, phone, whatsapp, telegram, viber, email, address, map_embed, hours, full_name, short_name, krs, nip, regon)
VALUES (1, '+48 000 000 000', 'https://wa.me/48000000000', 'https://t.me/oriolepartner', 'viber://chat?number=%2B48000000000',
 'oreole.partner@gmail.com', 'ul. Płochocińska 19 lok. 123, 03-191 Warszawa, Polska',
 'https://www.google.com/maps?q=ul.+P%C5%82ochoci%C5%84ska+19,+03-191+Warszawa&output=embed',
 'Пн–Пт 09:00–18:00', 'ORIOLE PARTNER SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ', 'Oriole Partner Sp. z o.o.',
 '0001049751', '5242979527', '525949456');

-- Car photos
CREATE TABLE public.car_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  url text NOT NULL,
  title text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.car_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.car_photos TO authenticated;
GRANT ALL ON public.car_photos TO service_role;
ALTER TABLE public.car_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view car photos" ON public.car_photos FOR SELECT USING (true);
CREATE POLICY "Admins manage car photos" ON public.car_photos FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Leads
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL DEFAULT '',
  contact_way text NOT NULL DEFAULT '',
  comment text NOT NULL DEFAULT '',
  lang text NOT NULL DEFAULT 'ru',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));