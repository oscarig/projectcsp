import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { ComplianceReportsView } from "@/components/dashboard/admin/ComplianceReportsView";

export default function ComplianceReportsPage() {
  return (
    <AdminLayout>
      <ComplianceReportsView />
    </AdminLayout>
  );
}