import { SettingsView } from "@/components/dashboard/provider/SettingsView";
import { ProviderLayout } from "@/components/dashboard/provider/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <ProviderLayout>
        <SettingsView />
      </ProviderLayout>
    </ProtectedRoute>
  );
}