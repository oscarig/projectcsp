import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PartnerSubscriptionsView } from "@/components/dashboard/admin/PartnerSubscriptionsView";

export default function PartnerSubscriptionsPage() {
  return (
    <AdminLayout>
      <PartnerSubscriptionsView />
    </AdminLayout>
  );
}