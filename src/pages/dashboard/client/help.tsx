import { HelpSupportView } from "@/components/dashboard/client/HelpSupportView";
import { ClientLayout } from "@/components/dashboard/client/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function HelpPage() {
  return (
    <ProtectedRoute>
      <ClientLayout>
        <HelpSupportView />
      </ClientLayout>
    </ProtectedRoute>
  );
}