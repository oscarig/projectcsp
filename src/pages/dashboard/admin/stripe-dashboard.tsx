import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { StripeDashboardView } from "@/components/dashboard/admin/StripeDashboardView";

export default function StripeDashboardPage() {
  return (
    <AdminLayout>
      <StripeDashboardView />
    </AdminLayout>
  );
}