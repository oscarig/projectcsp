import { ProfileView } from "@/components/dashboard/partner/ProfileView";
import { PartnerLayout } from "@/components/dashboard/partner/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <PartnerLayout>
        <ProfileView />
      </PartnerLayout>
    </ProtectedRoute>
  );
}