import { PartnersView } from "@/components/dashboard/provider/PartnersView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function PartnersPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <PartnersView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}