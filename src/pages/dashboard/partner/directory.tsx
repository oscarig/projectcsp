import { DirectoryView } from "@/components/dashboard/partner/DirectoryView";
import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DirectoryPage() {
  return (
    <ProtectedRoute>
      <PartnerLayout>
        <DirectoryView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}