-- Crear tabla de clientes (para Provider)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  jurisdiction TEXT,
  industry TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para clients
CREATE INDEX clients_provider_id_idx ON clients(provider_id);
CREATE INDEX clients_status_idx ON clients(status);

-- RLS para clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers can view their own clients"
  ON clients FOR SELECT
  USING (provider_id = auth.uid());

CREATE POLICY "Providers can insert their own clients"
  ON clients FOR INSERT
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their own clients"
  ON clients FOR UPDATE
  USING (provider_id = auth.uid());

CREATE POLICY "Providers can delete their own clients"
  ON clients FOR DELETE
  USING (provider_id = auth.uid());

CREATE POLICY "Admins can view all clients"
  ON clients FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));