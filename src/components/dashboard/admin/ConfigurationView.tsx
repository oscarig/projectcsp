import { EmailTemplatesCard } from "./configuration/EmailTemplatesCard";
import { ServiceCategoriesCard } from "./configuration/ServiceCategoriesCard";
import { PlatformFeesCard } from "./configuration/PlatformFeesCard";

export function ConfigurationView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Platform Configuration</h2>
        <p className="text-muted-foreground">
          Manage platform-wide settings, templates, and service categories
        </p>
      </div>

      <div className="grid gap-6">
        <EmailTemplatesCard />
        <ServiceCategoriesCard />
        <PlatformFeesCard />
      </div>
    </div>
  );
}