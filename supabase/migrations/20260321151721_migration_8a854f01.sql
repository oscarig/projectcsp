-- Habilitar pgcrypto si no está habilitado (normalmente ya lo está)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Actualizar contraseñas de los usuarios de prueba a 'Test123!'
UPDATE auth.users
SET 
  encrypted_password = crypt('Test123!', gen_salt('bf')),
  updated_at = NOW()
WHERE email IN (
  'navarrapete@gmail.com',
  'provider@vetto.com', 
  'partner@vetto.com',
  'client@vetto.com'
);

-- Verificar que se actualizaron
SELECT email, updated_at FROM auth.users 
WHERE email IN ('navarrapete@gmail.com', 'provider@vetto.com', 'partner@vetto.com', 'client@vetto.com');