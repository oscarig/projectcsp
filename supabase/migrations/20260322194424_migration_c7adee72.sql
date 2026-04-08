-- Create partner_invitations table to store invitation tokens
CREATE TABLE IF NOT EXISTS partner_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  partner_email TEXT NOT NULL,
  jurisdiction TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  used_at TIMESTAMP WITH TIME ZONE,
  used_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS partner_invitations_token_idx ON partner_invitations(token);
CREATE INDEX IF NOT EXISTS partner_invitations_provider_id_idx ON partner_invitations(provider_id);
CREATE INDEX IF NOT EXISTS partner_invitations_partner_email_idx ON partner_invitations(partner_email);
CREATE INDEX IF NOT EXISTS partner_invitations_status_idx ON partner_invitations(status);
CREATE INDEX IF NOT EXISTS partner_invitations_expires_at_idx ON partner_invitations(expires_at);

-- Enable RLS
ALTER TABLE partner_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Providers can insert their own invitations"
  ON partner_invitations FOR INSERT
  TO public
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can view their own invitations"
  ON partner_invitations FOR SELECT
  TO public
  USING (provider_id = auth.uid());

CREATE POLICY "Providers can update their own invitations"
  ON partner_invitations FOR UPDATE
  TO public
  USING (provider_id = auth.uid());

CREATE POLICY "Public can view valid invitations by token"
  ON partner_invitations FOR SELECT
  TO public
  USING (
    status = 'pending' 
    AND expires_at > NOW()
  );

CREATE POLICY "Admins can view all invitations"
  ON partner_invitations FOR SELECT
  TO public
  USING (get_user_role(auth.uid()) = 'admin');

-- Function to generate secure random token
CREATE OR REPLACE FUNCTION generate_invitation_token()
RETURNS TEXT AS $$
DECLARE
  token TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random token (32 characters)
    token := encode(gen_random_bytes(24), 'base64');
    -- Remove characters that might cause URL issues
    token := replace(replace(replace(token, '/', '_'), '+', '-'), '=', '');
    
    -- Check if token already exists
    SELECT EXISTS(SELECT 1 FROM partner_invitations WHERE partner_invitations.token = token) INTO exists;
    
    -- Exit loop if token is unique
    EXIT WHEN NOT exists;
  END LOOP;
  
  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate and use invitation token
CREATE OR REPLACE FUNCTION validate_invitation_token(invitation_token TEXT)
RETURNS TABLE (
  valid BOOLEAN,
  invitation_id UUID,
  provider_id UUID,
  partner_email TEXT,
  jurisdiction TEXT,
  message TEXT
) AS $$
DECLARE
  inv RECORD;
BEGIN
  -- Get invitation details
  SELECT * INTO inv
  FROM partner_invitations
  WHERE token = invitation_token;
  
  -- Check if invitation exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Check if already used
  IF inv.status != 'pending' THEN
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Check if expired
  IF inv.expires_at < NOW() THEN
    -- Update status to expired
    UPDATE partner_invitations SET status = 'expired' WHERE id = inv.id;
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;
  
  -- Valid invitation
  RETURN QUERY SELECT 
    TRUE,
    inv.id,
    inv.provider_id,
    inv.partner_email,
    inv.jurisdiction,
    inv.message;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark invitation as used
CREATE OR REPLACE FUNCTION mark_invitation_used(invitation_token TEXT, user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  inv_id UUID;
BEGIN
  -- Get invitation id
  SELECT id INTO inv_id
  FROM partner_invitations
  WHERE token = invitation_token
    AND status = 'pending'
    AND expires_at > NOW();
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Mark as accepted
  UPDATE partner_invitations
  SET 
    status = 'accepted',
    used_at = NOW(),
    used_by = user_id,
    updated_at = NOW()
  WHERE id = inv_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT ALL ON partner_invitations TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION generate_invitation_token() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION validate_invitation_token(TEXT) TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION mark_invitation_used(TEXT, UUID) TO postgres, anon, authenticated, service_role;