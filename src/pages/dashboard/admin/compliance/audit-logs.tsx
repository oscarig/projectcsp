import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { AuditLogsView } from "@/components/dashboard/admin/AuditLogsView";

export default function AuditLogsPage() {
  return (
    <AdminLayout>
      <AuditLogsView />
    </AdminLayout>
  );
}