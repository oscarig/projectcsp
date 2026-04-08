-- Corregir TODAS las políticas que causan recursión en la tabla support_tickets
DROP POLICY IF EXISTS "Admins can view all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can update all tickets" ON support_tickets;

CREATE POLICY "Admins can view all tickets" ON support_tickets
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all tickets" ON support_tickets
  FOR UPDATE
  USING (get_user_role(auth.uid()) = 'admin');