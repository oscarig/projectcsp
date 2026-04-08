-- Corregir TODAS las políticas que causan recursión en la tabla engagements
DROP POLICY IF EXISTS "Admins can view all engagements" ON engagements;

CREATE POLICY "Admins can view all engagements" ON engagements
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');