import { ClientsView } from "@/components/dashboard/provider/ClientsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <ClientsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}