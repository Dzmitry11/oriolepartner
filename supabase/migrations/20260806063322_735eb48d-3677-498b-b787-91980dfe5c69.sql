-- 1) SECURITY DEFINER function should not be directly callable via the API
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 2) Explicitly prevent privilege escalation on user_roles
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

DROP POLICY IF EXISTS "No one can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "No one can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "No one can delete roles" ON public.user_roles;

CREATE POLICY "No one can insert roles"
  ON public.user_roles FOR INSERT TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "No one can update roles"
  ON public.user_roles FOR UPDATE TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "No one can delete roles"
  ON public.user_roles FOR DELETE TO anon, authenticated
  USING (false);