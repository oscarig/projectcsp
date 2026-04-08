import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { GrowthReportsView } from "@/components/dashboard/admin/GrowthReportsView";

export default function GrowthReportsPage() {
  return (
    <AdminLayout>
      <GrowthReportsView />
    </AdminLayout>
  );
}