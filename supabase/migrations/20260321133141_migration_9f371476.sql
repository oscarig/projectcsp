-- Agregar columna email_verified a profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Agregar columna email_verified_at para trackear cuándo se verificó
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE NULL;

-- Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS profiles_email_verified_idx ON profiles(email_verified);

-- Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('email_verified', 'email_verified_at')
ORDER BY ordinal_position;