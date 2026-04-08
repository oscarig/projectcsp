import { EngagementsView } from "@/components/dashboard/client/EngagementsView";
import { ClientLayout } from "@/components/dashboard/client/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function EngagementsPage() {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <EngagementsView />
      </ClientLayout>
    </ProtectedRoute>
  );
}