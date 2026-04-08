import { BillingView } from "@/components/dashboard/provider/BillingView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <BillingView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}