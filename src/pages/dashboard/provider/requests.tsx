import { RequestsView } from "@/components/dashboard/provider/RequestsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function RequestsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <RequestsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}