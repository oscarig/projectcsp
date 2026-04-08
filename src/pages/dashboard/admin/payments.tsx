import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PaymentsView } from "@/components/dashboard/admin/PaymentsView";

export default function AdminPaymentsPage() {
  return (
    <AdminLayout>
      <PaymentsView />
    </AdminLayout>
  );
}