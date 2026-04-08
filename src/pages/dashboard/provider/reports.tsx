import { ReportsView } from "@/components/dashboard/provider/ReportsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <ReportsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}