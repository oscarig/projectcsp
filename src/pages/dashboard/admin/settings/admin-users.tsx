import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { AdminUsersManagementView } from "@/components/dashboard/admin/AdminUsersManagementView";

export default function AdminUsersManagementPage() {
  return (
    <AdminLayout>
      <AdminUsersManagementView />
    </AdminLayout>
  );
}