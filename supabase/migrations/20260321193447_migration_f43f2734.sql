-- Corregir TODAS las políticas que causan recursión en la tabla activities
DROP POLICY IF EXISTS "Admins can view all activities" ON activities;

CREATE POLICY "Admins can view all activities" ON activities
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');