import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { PlatformSettingsView } from "@/components/dashboard/admin/PlatformSettingsView";

export default function PlatformSettingsPage() {
  return (
    <AdminLayout>
      <PlatformSettingsView />
    </AdminLayout>
  );
}