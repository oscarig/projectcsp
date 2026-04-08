import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { ConfigurationView } from "@/components/dashboard/admin/ConfigurationView";

export default function AdminConfigurationPage() {
  return (
    <AdminLayout>
      <ConfigurationView />
    </AdminLayout>
  );
}