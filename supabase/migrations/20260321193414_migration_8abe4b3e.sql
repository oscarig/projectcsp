-- Corregir TODAS las políticas que causan recursión en la tabla clients
DROP POLICY IF EXISTS "Admins can view all clients" ON clients;

CREATE POLICY "Admins can view all clients" ON clients
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');