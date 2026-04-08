import { ClientLayout } from "@/components/dashboard/client/Layout";
import { HomeView } from "@/components/dashboard/client/HomeView";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ClientDashboard() {
  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <ClientLayout>
        <HomeView />
      </ClientLayout>
    </ProtectedRoute>
  );
}