-- Crear políticas RLS seguras SIN recursión para la tabla profiles

-- 1. SELECT: Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 2. SELECT: Los admins pueden ver todos los perfiles (usando la función segura)
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT
  USING (get_user_role(auth.uid()) = 'admin');

-- 3. INSERT: Servicio puede insertar perfiles (para registro)
CREATE POLICY "Service can insert profiles" ON profiles
  FOR INSERT
  WITH CHECK (true);

-- 4. UPDATE: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 5. UPDATE: Los admins pueden actualizar todos los perfiles
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE
  USING (get_user_role(auth.uid()) = 'admin')
  WITH CHECK (get_user_role(auth.uid()) = 'admin');

-- 6. DELETE: Solo admins pueden eliminar perfiles
CREATE POLICY "Admins can delete profiles" ON profiles
  FOR DELETE
  USING (get_user_role(auth.uid()) = 'admin');