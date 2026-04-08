import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { InvoicesView } from "@/components/dashboard/admin/InvoicesView";

export default function InvoicesPage() {
  return (
    <AdminLayout>
      <InvoicesView />
    </AdminLayout>
  );
}