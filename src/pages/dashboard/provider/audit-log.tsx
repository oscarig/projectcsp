import { AuditLogView } from "@/components/dashboard/provider/AuditLogView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AuditLogPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <AuditLogView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}