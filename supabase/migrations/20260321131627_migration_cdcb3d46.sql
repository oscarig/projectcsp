-- Crear tabla de actividades/timeline
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  engagement_id UUID NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'created', 'updated', 'status_changed', 'document_uploaded', 
    'document_approved', 'document_rejected', 'comment_added', 
    'partner_assigned', 'partner_removed', 'completed'
  )),
  
  title TEXT NOT NULL,
  description TEXT,
  
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para activities
CREATE INDEX activities_engagement_id_idx ON activities(engagement_id);
CREATE INDEX activities_user_id_idx ON activities(user_id);
CREATE INDEX activities_created_at_idx ON activities(created_at DESC);

-- RLS para activities
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view activities in their engagements"
  ON activities FOR SELECT
  USING (
    engagement_id IN (
      SELECT id FROM engagements 
      WHERE provider_id = auth.uid() 
         OR partner_id = auth.uid() 
         OR client_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert activities"
  ON activities FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all activities"
  ON activities FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));