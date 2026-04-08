import { ProfileView } from "@/components/dashboard/client/ProfileView";
import { ClientLayout } from "@/components/dashboard/client/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <ProfileView />
      </ClientLayout>
    </ProtectedRoute>
  );
}