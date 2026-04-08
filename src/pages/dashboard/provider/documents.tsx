import { DocumentsView } from "@/components/dashboard/provider/DocumentsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <DocumentsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}