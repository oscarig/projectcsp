import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { ClientsView } from "@/components/dashboard/admin/ClientsView";

export default function ClientsPage() {
  return (
    <AdminLayout>
      <ClientsView />
    </AdminLayout>
  );
}