-- Crear tabla de earnings (para Partners)
CREATE TABLE partner_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  engagement_id UUID REFERENCES engagements(id) ON DELETE SET NULL,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  description TEXT,
  
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  
  earned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  paid_date DATE,
  
  payment_method TEXT,
  transaction_reference TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para partner_earnings
CREATE INDEX partner_earnings_partner_id_idx ON partner_earnings(partner_id);
CREATE INDEX partner_earnings_status_idx ON partner_earnings(status);
CREATE INDEX partner_earnings_earned_date_idx ON partner_earnings(earned_date DESC);

-- RLS para partner_earnings
ALTER TABLE partner_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view their own earnings"
  ON partner_earnings FOR SELECT
  USING (partner_id = auth.uid());

CREATE POLICY "Admins can view all earnings"
  ON partner_earnings FOR SELECT
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Admins can insert earnings"
  ON partner_earnings FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Admins can update earnings"
  ON partner_earnings FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));