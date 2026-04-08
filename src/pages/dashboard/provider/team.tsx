import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/dashboard/provider/Layout";
import { TeamManagementView } from "@/components/dashboard/provider/TeamManagementView";

export default function ProviderTeamPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <Layout>
        <TeamManagementView />
      </Layout>
    </ProtectedRoute>
  );
}