import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { FinancialReportsView } from "@/components/dashboard/admin/FinancialReportsView";

export default function FinancialReportsPage() {
  return (
    <AdminLayout>
      <FinancialReportsView />
    </AdminLayout>
  );
}