import { TeamMembersCard } from "./settings/TeamMembersCard";
import { NotificationPreferencesCard } from "./settings/NotificationPreferencesCard";
import { ComplianceSettingsCard } from "./settings/ComplianceSettingsCard";
import { ApiAccessCard } from "./settings/ApiAccessCard";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings, team members, and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <TeamMembersCard />
        <NotificationPreferencesCard />
        <ComplianceSettingsCard />
        <ApiAccessCard />
      </div>
    </div>
  );
}