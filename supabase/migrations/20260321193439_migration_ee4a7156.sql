-- Corregir TODAS las políticas que causan recursión en la tabla partner_requests
DROP POLICY IF EXISTS "Admins can view all requests" ON partner_requests;

CREATE POLICY "Admins can view all requests" ON partner_requests
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');