-- Crear tabla de partner connections (para Provider)
CREATE TABLE partner_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(provider_id, partner_id)
);

-- Índices para partner_connections
CREATE INDEX partner_connections_provider_id_idx ON partner_connections(provider_id);
CREATE INDEX partner_connections_partner_id_idx ON partner_connections(partner_id);
CREATE INDEX partner_connections_status_idx ON partner_connections(status);

-- RLS para partner_connections
ALTER TABLE partner_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers can view their connections"
  ON partner_connections FOR SELECT
  USING (provider_id = auth.uid());

CREATE POLICY "Partners can view their connections"
  ON partner_connections FOR SELECT
  USING (partner_id = auth.uid());

CREATE POLICY "Providers can insert connections"
  ON partner_connections FOR INSERT
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their connections"
  ON partner_connections FOR UPDATE
  USING (provider_id = auth.uid());

CREATE POLICY "Partners can update their connections"
  ON partner_connections FOR UPDATE
  USING (partner_id = auth.uid());