import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { AdminUsersView } from "@/components/dashboard/admin/UsersView";

export default function UsersPage() {
  return (
    <AdminLayout>
      <AdminUsersView />
    </AdminLayout>
  );
}