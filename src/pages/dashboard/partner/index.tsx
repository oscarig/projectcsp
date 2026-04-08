import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { PartnerHomeView } from "@/components/dashboard/partner/HomeView";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function PartnerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["partner"]}>
      <PartnerLayout>
        <PartnerHomeView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}