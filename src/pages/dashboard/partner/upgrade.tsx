import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { PartnerUpgradeView } from "@/components/dashboard/partner/UpgradeView";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function PartnerUpgradePage() {
  return (
    <ProtectedRoute allowedRoles={["partner"]}>
      <PartnerLayout>
        <PartnerUpgradeView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}
