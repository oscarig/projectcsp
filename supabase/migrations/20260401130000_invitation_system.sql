-- 0. Update partner_invitations to include partner_name
ALTER TABLE public.partner_invitations ADD COLUMN IF NOT EXISTS partner_name TEXT;

-- 1. Add user_id to clients table
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 2. Create client_invitations table
CREATE TABLE IF NOT EXISTS public.client_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_email TEXT NOT NULL,
  client_name TEXT,
  company_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  used_at TIMESTAMP WITH TIME ZONE,
  used_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Update handle_new_user() trigger to handle invitations for both Clients and Partners
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role TEXT;
  v_invitation_token TEXT;
  v_provider_id UUID;
BEGIN
  -- Get info from metadata
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');
  v_invitation_token := NEW.raw_user_meta_data->>'invitation_token';

  -- A. Insert basic profile
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

  -- B. Logic for Invited Users
  IF v_invitation_token IS NOT NULL THEN
    
    -- Handle Client Invitation
    IF v_role = 'client' THEN
      -- Find the invitation
      SELECT provider_id INTO v_provider_id 
      FROM public.client_invitations 
      WHERE token = v_invitation_token AND status = 'pending';

      IF v_provider_id IS NOT NULL THEN
        -- Link the newly created user to a new/existing client record
        INSERT INTO public.clients (provider_id, user_id, company_name, contact_name, contact_email, status)
        SELECT provider_id, NEW.id, company_name, client_name, client_email, 'active'
        FROM public.client_invitations
        WHERE token = v_invitation_token
        ON CONFLICT (user_id) DO NOTHING;
        
        -- Mark as used
        UPDATE public.client_invitations 
        SET status = 'accepted', used_at = NOW(), used_by = NEW.id
        WHERE token = v_invitation_token;
      END IF;
    END IF;

    -- Handle Partner Invitation
    IF v_role = 'partner' THEN
      -- Find the invitation
      SELECT provider_id INTO v_provider_id 
      FROM public.partner_invitations 
      WHERE token = v_invitation_token AND status = 'pending';

      IF v_provider_id IS NOT NULL THEN
        -- Create a connection between Provider and the new Partner
        INSERT INTO public.partner_connections (provider_id, partner_id, status)
        VALUES (v_provider_id, NEW.id, 'accepted')
        ON CONFLICT (provider_id, partner_id) DO NOTHING;

        -- Mark invitation as used
        UPDATE public.partner_invitations
        SET status = 'accepted', used_at = NOW(), used_by = NEW.id
        WHERE token = v_invitation_token;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RLS for client_invitations
ALTER TABLE public.client_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers can manage their own client invitations"
  ON public.client_invitations
  FOR ALL
  USING (provider_id = auth.uid());

CREATE POLICY "Anyone can view invitation details given their token"
  ON public.client_invitations
  FOR SELECT
  USING (true);

-- Indices
CREATE INDEX IF NOT EXISTS client_invitations_token_idx ON public.client_invitations(token);
CREATE INDEX IF NOT EXISTS client_invitations_provider_id_idx ON public.client_invitations(provider_id);
CREATE INDEX IF NOT EXISTS client_invitations_email_idx ON public.client_invitations(client_email);
