import { DocumentsView } from "@/components/dashboard/client/DocumentsView";
import { ClientLayout } from "@/components/dashboard/client/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <DocumentsView />
      </ClientLayout>
    </ProtectedRoute>
  );
}