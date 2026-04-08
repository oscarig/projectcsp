import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/dashboard/provider/Layout";
import { InvitationsView } from "@/components/dashboard/provider/InvitationsView";

export default function InvitationsPage() {
  return (
    <ProtectedRoute allowedRoles={["provider"]}>
      <Layout>
        <InvitationsView />
      </Layout>
    </ProtectedRoute>
  );
}