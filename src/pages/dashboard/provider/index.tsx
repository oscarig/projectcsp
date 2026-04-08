import { HomeView } from "@/components/dashboard/provider/HomeView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { SEO } from "@/components/SEO";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProviderDashboard() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <ProviderLayout>
        <HomeView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}