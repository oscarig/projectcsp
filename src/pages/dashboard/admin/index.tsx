import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { AdminHomeView } from "@/components/dashboard/admin/HomeView";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <AdminHomeView />
      </AdminLayout>
    </ProtectedRoute>
  );
}