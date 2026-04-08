import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PrimaryCSPSubscriptionsView } from "@/components/dashboard/admin/PrimaryCSPSubscriptionsView";

export default function PrimaryCSPSubscriptionsPage() {
  return (
    <AdminLayout>
      <PrimaryCSPSubscriptionsView />
    </AdminLayout>
  );
}