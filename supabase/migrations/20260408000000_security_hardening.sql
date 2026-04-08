-- 1. Security Hardening: Invitation-Only Signup
-- This migration enforces that EVERY signup must correspond to a valid invitation.
-- It also derives the role from the invitation and restricts data leaks.

-- Drop existing trigger function to redefine it
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role TEXT;
  v_invitation_token TEXT;
  v_provider_id UUID;
  v_invitation_exists BOOLEAN := false;
BEGIN
  -- Extract invitation token from metadata
  v_invitation_token := NEW.raw_user_meta_data->>'invitation_token';

  -- CRITICAL SECURITY CHECK: Enforce invitation-only
  -- Check Client Invitations
  SELECT provider_id, 'client' INTO v_provider_id, v_role
  FROM public.client_invitations 
  WHERE token = v_invitation_token AND client_email = NEW.email AND status = 'pending';

  IF v_provider_id IS NOT NULL THEN
    v_invitation_exists := true;
  ELSE
    -- Check Partner Invitations
    SELECT provider_id, 'partner' INTO v_provider_id, v_role
    FROM public.partner_invitations 
    WHERE token = v_invitation_token AND status = 'pending'; -- email check might be different for partners
    
    IF v_provider_id IS NOT NULL THEN
      v_invitation_exists := true;
    END IF;
  END IF;

  -- BLOCK SIGNUP IF NO VALID INVITATION EXISTS
  IF NOT v_invitation_exists THEN
    RAISE EXCEPTION 'Access Denied: A valid invitation is required to create an account.';
  END IF;

  -- 2. Insert profile with derived role (TRUST NO CLIENT METADATA)
  INSERT INTO public.profiles (id, email, full_name, role, email_verified, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    v_role,
    COALESCE(NEW.email_confirmed_at IS NOT NULL, false),
    NOW(),
    NOW()
  );

  -- 3. Link records based on invitation type
  IF v_role = 'client' THEN
    INSERT INTO public.clients (provider_id, user_id, company_name, contact_name, contact_email, status)
    SELECT provider_id, NEW.id, company_name, client_name, client_email, 'active'
    FROM public.client_invitations
    WHERE token = v_invitation_token;
    
    UPDATE public.client_invitations 
    SET status = 'accepted', used_at = NOW(), used_by = NEW.id
    WHERE token = v_invitation_token;
  ELSIF v_role = 'partner' THEN
    INSERT INTO public.partner_connections (provider_id, partner_id, status)
    VALUES (v_provider_id, NEW.id, 'accepted')
    ON CONFLICT (provider_id, partner_id) DO NOTHING;

    UPDATE public.partner_invitations
    SET status = 'accepted', used_at = NOW(), used_by = NEW.id
    WHERE token = v_invitation_token;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-enable the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Fix RLS Policies to prevent data leaks
-- Secure client_invitations
DROP POLICY IF EXISTS "Anyone can view invitation details given their token" ON public.client_invitations;
DROP POLICY IF EXISTS "Providers can manage their own client invitations" ON public.client_invitations;

-- Providers can see invitations they created
CREATE POLICY "Providers can view their own invitations"
  ON public.client_invitations FOR SELECT
  USING (provider_id = auth.uid());

CREATE POLICY "Providers can insert their own invitations"
  ON public.client_invitations FOR INSERT
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their own invitations"
  ON public.client_invitations FOR UPDATE
  USING (provider_id = auth.uid());

-- 5. Secure Partner Invitations (ensure RLS is enabled and scoped)
ALTER TABLE public.partner_invitations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Providers can manage their own partner invitations" ON public.partner_invitations;
CREATE POLICY "Providers can manage their own partner invitations"
  ON public.partner_invitations FOR ALL
  USING (provider_id = auth.uid());

-- 6. Create a safe RPC for token verification (publicly accessible but scoped)
CREATE OR REPLACE FUNCTION public.verify_invitation_token(p_token TEXT, p_role TEXT)
RETURNS JSONB AS $$
DECLARE
  v_result JSONB;
BEGIN
  IF p_role = 'client' THEN
    SELECT jsonb_build_object('valid', true, 'name', client_name, 'company', company_name, 'email', client_email)
    INTO v_result
    FROM public.client_invitations
    WHERE token = p_token AND status = 'pending';
  ELSE
    SELECT jsonb_build_object('valid', true, 'name', partner_name, 'email', NULL) -- Partner table might have different columns
    INTO v_result
    FROM public.partner_invitations
    WHERE token = p_token AND status = 'pending';
  END IF;

  IF v_result IS NULL THEN
    RETURN jsonb_build_object('valid', false);
  END IF;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
