import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Save, AlertCircle } from "lucide-react";

export function PlatformSettingsView() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    platformName: "Global CSP Connect",
    supportEmail: "support@globalcspconnect.com",
    supportPhone: "+1 800 123 4567",
    defaultLanguage: "en",
    defaultTimezone: "utc",
    features: {
      partnerDirectory: true,
      promotedListings: true,
      primaryCSPSubscriptions: true,
      partnerSubscriptions: true,
      whiteLabelPortals: true,
      clientPortal: true,
    },
    maintenanceMode: "off",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [feature]: checked,
      },
    });
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ar", label: "Arabic" },
  ];

  const timezones = [
    { value: "utc", label: "UTC (Universal Time)" },
    { value: "est", label: "Eastern (US & Canada)" },
    { value: "cst", label: "Central (US & Canada)" },
    { value: "pst", label: "Pacific (US & Canada)" },
    { value: "gmt", label: "London (GMT)" },
    { value: "cet", label: "Paris (CET)" },
    { value: "gst", label: "Dubai (GST)" },
    { value: "sgt", label: "Singapore (SGT)" },
    { value: "hkt", label: "Hong Kong (HKT)" },
  ];

  const maintenanceModes = [
    { value: "off", label: "Off - Platform fully operational" },
    {
      value: "scheduled",
      label: "Scheduled - Show maintenance notice to users",
    },
    { value: "active", label: "Active - Platform in maintenance mode" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Platform Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure general platform settings and features
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) =>
                    setSettings({ ...settings, platformName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, supportEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, supportPhone: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) =>
                      setSettings({ ...settings, defaultLanguage: value })
                    }
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultTimezone">Default Timezone</Label>
                  <Select
                    value={settings.defaultTimezone}
                    onValueChange={(value) =>
                      setSettings({ ...settings, defaultTimezone: value })
                    }
                  >
                    <SelectTrigger id="defaultTimezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="partnerDirectory">Enable Partner Directory</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow Primary CSPs to browse and discover partners
                  </p>
                </div>
                <Switch
                  id="partnerDirectory"
                  checked={settings.features.partnerDirectory}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("partnerDirectory", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promotedListings">Enable Promoted Listings</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow partners to purchase promoted directory placement
                  </p>
                </div>
                <Switch
                  id="promotedListings"
                  checked={settings.features.promotedListings}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("promotedListings", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="primaryCSPSubscriptions">
                    Enable Primary CSP Subscriptions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow Primary CSPs to subscribe to paid plans
                  </p>
                </div>
                <Switch
                  id="primaryCSPSubscriptions"
                  checked={settings.features.primaryCSPSubscriptions}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("primaryCSPSubscriptions", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="partnerSubscriptions">
                    Enable Partner Subscriptions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow partners to subscribe to paid plans
                  </p>
                </div>
                <Switch
                  id="partnerSubscriptions"
                  checked={settings.features.partnerSubscriptions}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("partnerSubscriptions", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whiteLabelPortals">Enable White-Label Portals</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow Primary CSPs to create white-label client portals
                  </p>
                </div>
                <Switch
                  id="whiteLabelPortals"
                  checked={settings.features.whiteLabelPortals}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("whiteLabelPortals", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="clientPortal">Enable Client Portal</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow clients to access their engagement portal
                  </p>
                </div>
                <Switch
                  id="clientPortal"
                  checked={settings.features.clientPortal}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle("clientPortal", checked)
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Select
                value={settings.maintenanceMode}
                onValueChange={(value) =>
                  setSettings({ ...settings, maintenanceMode: value })
                }
              >
                <SelectTrigger id="maintenanceMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceModes.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {settings.maintenanceMode === "scheduled" && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Users will see a scheduled maintenance notice on the platform
                </p>
              </div>
            )}

            {settings.maintenanceMode === "active" && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 dark:text-red-200">
                  Platform is currently in maintenance mode - users cannot access the
                  platform
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}