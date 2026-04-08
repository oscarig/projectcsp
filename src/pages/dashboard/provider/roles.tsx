import { RolePermissionsView } from "@/components/dashboard/provider/RolePermissionsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function RolesPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <RolePermissionsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}