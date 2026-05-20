-- Actualizar los estados de cliente permitidos para incluir 'Rejected' y 'Resigned'
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_status_check;

ALTER TABLE clients ADD CONSTRAINT clients_status_check CHECK (status IN ('Enquiry', 'CDD', 'Active', 'Struck-off', 'Rejected', 'Resigned', 'active', 'inactive', 'pending'));
