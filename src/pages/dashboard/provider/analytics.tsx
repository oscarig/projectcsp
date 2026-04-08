import { AnalyticsView } from "@/components/dashboard/provider/AnalyticsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <AnalyticsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}