import { EarningsView } from "@/components/dashboard/partner/EarningsView";
import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function EarningsPage() {
  return (
    <ProtectedRoute>
      <PartnerLayout>
        <EarningsView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}