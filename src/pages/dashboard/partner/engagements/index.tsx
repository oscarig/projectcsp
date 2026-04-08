import { PartnerEngagementsView } from "@/components/dashboard/partner/EngagementsView";
import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function EngagementsPage() {
  return (
    <ProtectedRoute>
      <PartnerLayout>
        <PartnerEngagementsView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}