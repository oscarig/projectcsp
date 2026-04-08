import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhiteLabelConfig } from "@/types/whitelabel";
import { ConfigurationTable } from "./whitelabel/ConfigurationTable";
import { CreateConfigDialog } from "./whitelabel/CreateConfigDialog";
import { BrandingTab } from "./whitelabel/BrandingTab";
import { DomainTab } from "./whitelabel/DomainTab";
import { EmailTab } from "./whitelabel/EmailTab";
import { FeaturesTab } from "./whitelabel/FeaturesTab";
import { Palette, Globe, Mail, Monitor, ExternalLink, Edit } from "lucide-react";

export function WhiteLabelView() {
  const [selectedConfig, setSelectedConfig] = useState<WhiteLabelConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const whiteLabelConfigs: WhiteLabelConfig[] = [
    {
      id: "wl-1",
      providerId: "prov-1",
      providerName: "Gibraltar Services Ltd",
      status: "active",
      domain: "londoncsp.vetto.com",
      companyName: "London CSP Ltd",
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      logoUrl: "/logos/london-csp.png",
      faviconUrl: "/favicons/london-csp.ico",
      senderName: "London CSP Team",
      senderEmail: "noreply@londoncsp.vetto.com",
      replyToEmail: "support@londoncsp.com",
      portalEnabled: true,
      documentUploadEnabled: true,
      engagementTrackingEnabled: true,
      publicDirectoryEnabled: false,
      sslCertificate: "active",
      dnsStatus: "configured",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-02-10T14:30:00Z",
    },
    {
      id: "wl-2",
      providerId: "prov-2",
      providerName: "Malta Business Partners",
      status: "pending",
      domain: "maltacsp.vetto.com",
      companyName: "Malta CSP Solutions",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      senderName: "Malta CSP Team",
      senderEmail: "noreply@maltacsp.vetto.com",
      replyToEmail: "info@maltacsp.com",
      portalEnabled: false,
      documentUploadEnabled: true,
      engagementTrackingEnabled: true,
      publicDirectoryEnabled: false,
      sslCertificate: "pending",
      dnsStatus: "pending",
      createdAt: "2024-02-18T09:00:00Z",
      updatedAt: "2024-02-18T09:00:00Z",
    },
  ];

  const handleCreateConfig = (data: { providerId: string; domain: string; companyName: string }) => {
    console.log("Create config:", data);
  };

  const handleSave = () => {
    console.log("Save configuration");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">White-Label Management</h1>
          <p className="text-muted-foreground mt-1">
            Configure white-label portals for Primary CSPs
          </p>
        </div>
        <CreateConfigDialog onSubmit={handleCreateConfig} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Configurations</CardTitle>
          <CardDescription>
            {whiteLabelConfigs.length} white-label portal{whiteLabelConfigs.length !== 1 ? "s" : ""} configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigurationTable
            configs={whiteLabelConfigs}
            onView={(config) => setSelectedConfig(config)}
            onEdit={(config) => {
              setSelectedConfig(config);
              setIsEditing(true);
            }}
          />
        </CardContent>
      </Card>

      {selectedConfig && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedConfig.companyName}</CardTitle>
                <CardDescription>
                  Configuration for {selectedConfig.providerName}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://${selectedConfig.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Preview Portal
                  </a>
                </Button>
                <Button size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? "Cancel Edit" : "Edit Configuration"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="branding">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="branding">
                  <Palette className="mr-2 h-4 w-4" />
                  Branding
                </TabsTrigger>
                <TabsTrigger value="domain">
                  <Globe className="mr-2 h-4 w-4" />
                  Domain
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="features">
                  <Monitor className="mr-2 h-4 w-4" />
                  Features
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding">
                <BrandingTab
                  config={selectedConfig}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </TabsContent>

              <TabsContent value="domain">
                <DomainTab
                  config={selectedConfig}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </TabsContent>

              <TabsContent value="email">
                <EmailTab
                  config={selectedConfig}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </TabsContent>

              <TabsContent value="features">
                <FeaturesTab
                  config={selectedConfig}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}