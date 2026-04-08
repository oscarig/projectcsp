import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { SubscriptionsView } from "@/components/dashboard/admin/SubscriptionsView";

export default function SubscriptionsPage() {
  return (
    <AdminLayout>
      <SubscriptionsView />
    </AdminLayout>
  );
}