import { DocumentsView } from "@/components/dashboard/partner/DocumentsView";
import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <PartnerLayout>
        <DocumentsView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}