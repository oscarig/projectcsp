import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { KYCManagementView } from "@/components/dashboard/admin/KYCManagementView";

export default function KYCManagementPage() {
  return (
    <AdminLayout>
      <KYCManagementView />
    </AdminLayout>
  );
}