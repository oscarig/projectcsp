import { ProfileView } from "@/components/dashboard/provider/ProfileView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <ProfileView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}