-- Crear tabla de engagements
CREATE TABLE engagements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  client_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  service_type TEXT NOT NULL,
  jurisdiction TEXT,
  
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'with_partner', 'awaiting_info', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  current_step INTEGER DEFAULT 1,
  total_steps INTEGER DEFAULT 4,
  
  estimated_completion_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  
  budget_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para engagements
CREATE INDEX engagements_provider_id_idx ON engagements(provider_id);
CREATE INDEX engagements_partner_id_idx ON engagements(partner_id);
CREATE INDEX engagements_client_id_idx ON engagements(client_id);
CREATE INDEX engagements_client_user_id_idx ON engagements(client_user_id);
CREATE INDEX engagements_status_idx ON engagements(status);
CREATE INDEX engagements_reference_number_idx ON engagements(reference_number);

-- RLS para engagements
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers can view their own engagements"
  ON engagements FOR SELECT
  USING (provider_id = auth.uid());

CREATE POLICY "Partners can view their assigned engagements"
  ON engagements FOR SELECT
  USING (partner_id = auth.uid());

CREATE POLICY "Clients can view their own engagements"
  ON engagements FOR SELECT
  USING (client_user_id = auth.uid());

CREATE POLICY "Providers can insert their own engagements"
  ON engagements FOR INSERT
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their own engagements"
  ON engagements FOR UPDATE
  USING (provider_id = auth.uid());

CREATE POLICY "Partners can update their assigned engagements"
  ON engagements FOR UPDATE
  USING (partner_id = auth.uid());

CREATE POLICY "Admins can view all engagements"
  ON engagements FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Función para generar reference_number automático
CREATE OR REPLACE FUNCTION generate_engagement_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference_number := 'ENG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('engagement_ref_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE engagement_ref_seq START 1;

CREATE TRIGGER set_engagement_reference
  BEFORE INSERT ON engagements
  FOR EACH ROW
  WHEN (NEW.reference_number IS NULL)
  EXECUTE FUNCTION generate_engagement_reference();