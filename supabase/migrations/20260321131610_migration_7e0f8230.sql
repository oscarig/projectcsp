-- Crear tabla de documentos
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  engagement_id UUID REFERENCES engagements(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  
  document_type TEXT NOT NULL,
  category TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  
  notes TEXT,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  expires_at DATE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para documents
CREATE INDEX documents_engagement_id_idx ON documents(engagement_id);
CREATE INDEX documents_uploaded_by_idx ON documents(uploaded_by);
CREATE INDEX documents_status_idx ON documents(status);
CREATE INDEX documents_document_type_idx ON documents(document_type);

-- RLS para documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents they uploaded"
  ON documents FOR SELECT
  USING (uploaded_by = auth.uid());

CREATE POLICY "Providers can view documents in their engagements"
  ON documents FOR SELECT
  USING (engagement_id IN (SELECT id FROM engagements WHERE provider_id = auth.uid()));

CREATE POLICY "Partners can view documents in their engagements"
  ON documents FOR SELECT
  USING (engagement_id IN (SELECT id FROM engagements WHERE partner_id = auth.uid()));

CREATE POLICY "Clients can view documents in their engagements"
  ON documents FOR SELECT
  USING (engagement_id IN (SELECT id FROM engagements WHERE client_user_id = auth.uid()));

CREATE POLICY "Users can insert documents"
  ON documents FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));