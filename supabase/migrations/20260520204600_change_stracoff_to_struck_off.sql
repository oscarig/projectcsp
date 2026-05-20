-- Actualizar los estados de cliente permitidos en la base de datos (reemplazar 'Stracoff' por 'Struck-off')
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_status_check;

-- Actualizar filas existentes de 'Stracoff' a 'Struck-off'
UPDATE clients SET status = 'Struck-off' WHERE status = 'Stracoff';

-- Agregar la nueva restricción CHECK
ALTER TABLE clients ADD CONSTRAINT clients_status_check CHECK (status IN ('Enquiry', 'CDD', 'Active', 'Struck-off', 'active', 'inactive', 'pending'));
