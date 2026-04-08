-- Corregir TODAS las políticas que causan recursión en la tabla partner_earnings
DROP POLICY IF EXISTS "Admins can view all earnings" ON partner_earnings;
DROP POLICY IF EXISTS "Admins can insert earnings" ON partner_earnings;
DROP POLICY IF EXISTS "Admins can update earnings" ON partner_earnings;

CREATE POLICY "Admins can view all earnings" ON partner_earnings
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can insert earnings" ON partner_earnings
  FOR INSERT
  WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update earnings" ON partner_earnings
  FOR UPDATE
  USING (get_user_role(auth.uid()) = 'admin');