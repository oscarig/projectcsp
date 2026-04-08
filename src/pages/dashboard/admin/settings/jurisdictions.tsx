import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { JurisdictionsManagementView } from "@/components/dashboard/admin/JurisdictionsManagementView";

export default function JurisdictionsManagementPage() {
  return (
    <AdminLayout>
      <JurisdictionsManagementView />
    </AdminLayout>
  );
}