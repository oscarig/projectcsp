import { EngagementsView } from "@/components/dashboard/provider/EngagementsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function EngagementsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <EngagementsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}