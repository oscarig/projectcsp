import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { StripeConfigurationView } from "@/components/dashboard/admin/StripeConfigurationView";

export default function AdminStripeConfigurationPage() {
  return (
    <AdminLayout>
      <StripeConfigurationView />
    </AdminLayout>
  );
}