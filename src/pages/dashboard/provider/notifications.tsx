import { NotificationsView } from "@/components/dashboard/provider/NotificationsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { SEO } from "@/components/SEO";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function NotificationsPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <SEO />
      <ProviderLayout>
        <NotificationsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}
