import { AdminLayout } from "@/components/dashboard/admin/Layout";
import { EmailTemplatesView } from "@/components/dashboard/admin/EmailTemplatesView";

export default function EmailTemplatesPage() {
  return (
    <AdminLayout>
      <EmailTemplatesView />
    </AdminLayout>
  );
}