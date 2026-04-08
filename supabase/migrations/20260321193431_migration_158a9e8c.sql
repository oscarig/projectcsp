-- Corregir TODAS las políticas que causan recursión en la tabla documents
DROP POLICY IF EXISTS "Admins can view all documents" ON documents;

CREATE POLICY "Admins can view all documents" ON documents
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');