-- Crear tabla de requests (para Partners)
CREATE TABLE partner_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  
  from_provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_partner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  engagement_id UUID REFERENCES engagements(id) ON DELETE CASCADE,
  
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  jurisdiction TEXT,
  
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  
  offered_fee DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  
  deadline DATE,
  
  partner_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para partner_requests
CREATE INDEX partner_requests_from_provider_idx ON partner_requests(from_provider_id);
CREATE INDEX partner_requests_to_partner_idx ON partner_requests(to_partner_id);
CREATE INDEX partner_requests_status_idx ON partner_requests(status);
CREATE INDEX partner_requests_engagement_id_idx ON partner_requests(engagement_id);

-- RLS para partner_requests
ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers can view their sent requests"
  ON partner_requests FOR SELECT
  USING (from_provider_id = auth.uid());

CREATE POLICY "Partners can view their received requests"
  ON partner_requests FOR SELECT
  USING (to_partner_id = auth.uid());

CREATE POLICY "Providers can insert requests"
  ON partner_requests FOR INSERT
  WITH CHECK (from_provider_id = auth.uid());

CREATE POLICY "Partners can update their received requests"
  ON partner_requests FOR UPDATE
  USING (to_partner_id = auth.uid());

CREATE POLICY "Admins can view all requests"
  ON partner_requests FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Función para generar reference_number automático para requests
CREATE OR REPLACE FUNCTION generate_request_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference_number := 'REQ-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('request_ref_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE request_ref_seq START 1;

CREATE TRIGGER set_request_reference
  BEFORE INSERT ON partner_requests
  FOR EACH ROW
  WHEN (NEW.reference_number IS NULL)
  EXECUTE FUNCTION generate_request_reference();