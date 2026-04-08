import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { ProvidersView } from "@/components/dashboard/admin/ProvidersView";

export default function AdminProvidersPage() {
  return (
    <AdminLayout>
      <ProvidersView />
    </AdminLayout>
  );
}