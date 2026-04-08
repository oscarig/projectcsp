import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PromotedListingsView } from "@/components/dashboard/admin/PromotedListingsView";

export default function PromotedListingsPage() {
  return (
    <AdminLayout>
      <PromotedListingsView />
    </AdminLayout>
  );
}