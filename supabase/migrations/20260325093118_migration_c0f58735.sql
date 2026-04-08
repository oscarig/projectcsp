-- Create enum for provider team roles
CREATE TYPE provider_team_role AS ENUM (
  'admin',
  'partner_manager',
  'engagement_manager',
  'viewer'
);

-- Create provider_team_members table
CREATE TABLE IF NOT EXISTS provider_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role provider_team_role NOT NULL DEFAULT 'viewer',
  invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider_id, user_id)
);

-- Create indexes for provider_team_members
CREATE INDEX provider_team_members_provider_id_idx ON provider_team_members(provider_id);
CREATE INDEX provider_team_members_user_id_idx ON provider_team_members(user_id);
CREATE INDEX provider_team_members_role_idx ON provider_team_members(role);

-- Create provider_team_invitations table
CREATE TABLE IF NOT EXISTS provider_team_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'base64'),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  role provider_team_role NOT NULL DEFAULT 'viewer',
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  used_at TIMESTAMP WITH TIME ZONE,
  used_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for provider_team_invitations
CREATE INDEX provider_team_invitations_token_idx ON provider_team_invitations(token);
CREATE INDEX provider_team_invitations_provider_id_idx ON provider_team_invitations(provider_id);
CREATE INDEX provider_team_invitations_invitee_email_idx ON provider_team_invitations(invitee_email);
CREATE INDEX provider_team_invitations_status_idx ON provider_team_invitations(status);
CREATE INDEX provider_team_invitations_expires_at_idx ON provider_team_invitations(expires_at);

-- Enable RLS on provider_team_members
ALTER TABLE provider_team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for provider_team_members
CREATE POLICY "Team members can view their own team"
  ON provider_team_members FOR SELECT
  USING (user_id = auth.uid() OR provider_id IN (
    SELECT provider_id FROM provider_team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins can insert team members"
  ON provider_team_members FOR INSERT
  WITH CHECK (
    provider_id IN (
      SELECT provider_id FROM provider_team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update team members"
  ON provider_team_members FOR UPDATE
  USING (
    provider_id IN (
      SELECT provider_id FROM provider_team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete team members"
  ON provider_team_members FOR DELETE
  USING (
    provider_id IN (
      SELECT provider_id FROM provider_team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Enable RLS on provider_team_invitations
ALTER TABLE provider_team_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for provider_team_invitations
CREATE POLICY "Team members can view their provider's invitations"
  ON provider_team_invitations FOR SELECT
  USING (
    provider_id IN (
      SELECT provider_id FROM provider_team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert invitations"
  ON provider_team_invitations FOR INSERT
  WITH CHECK (
    provider_id IN (
      SELECT provider_id FROM provider_team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update invitations"
  ON provider_team_invitations FOR UPDATE
  USING (
    provider_id IN (
      SELECT provider_id FROM provider_team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Public can view valid invitations by token"
  ON provider_team_invitations FOR SELECT
  USING (status = 'pending' AND expires_at > NOW());

-- Create function to get user's role in a provider organization
CREATE OR REPLACE FUNCTION get_provider_team_role(p_provider_id UUID, p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role::TEXT INTO user_role
  FROM provider_team_members
  WHERE provider_id = p_provider_id AND user_id = p_user_id;
  
  RETURN COALESCE(user_role, 'none');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has permission
CREATE OR REPLACE FUNCTION has_provider_permission(
  p_provider_id UUID,
  p_user_id UUID,
  required_permission TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := get_provider_team_role(p_provider_id, p_user_id);
  
  -- Admin has all permissions
  IF user_role = 'admin' THEN
    RETURN TRUE;
  END IF;
  
  -- Partner Manager permissions
  IF user_role = 'partner_manager' AND required_permission IN (
    'view_partners', 'manage_partners', 'view_invitations', 'send_invitations'
  ) THEN
    RETURN TRUE;
  END IF;
  
  -- Engagement Manager permissions
  IF user_role = 'engagement_manager' AND required_permission IN (
    'view_clients', 'manage_clients', 'view_engagements', 'manage_engagements'
  ) THEN
    RETURN TRUE;
  END IF;
  
  -- Viewer can only view
  IF user_role = 'viewer' AND required_permission LIKE 'view_%' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to mark team invitation as used
CREATE OR REPLACE FUNCTION mark_team_invitation_used(
  invitation_token TEXT,
  user_id UUID
)
RETURNS void AS $$
BEGIN
  UPDATE provider_team_invitations
  SET 
    status = 'accepted',
    used_at = NOW(),
    used_by = user_id,
    updated_at = NOW()
  WHERE token = invitation_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_provider_team_role TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION has_provider_permission TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION mark_team_invitation_used TO postgres, anon, authenticated, service_role;

-- Add comment to tables
COMMENT ON TABLE provider_team_members IS 'Stores team members for each provider organization with their roles';
COMMENT ON TABLE provider_team_invitations IS 'Stores pending invitations for team members to join provider organizations';