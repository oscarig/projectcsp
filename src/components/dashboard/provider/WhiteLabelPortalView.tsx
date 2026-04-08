import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Monitor, 
  Globe, 
  Mail, 
  Palette, 
  ExternalLink, 
  Copy, 
  Check,
  Info,
  Shield,
  Eye,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

type PortalStatus = "active" | "pending_approval" | "suspended";

export function WhiteLabelPortalView() {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [portalStatus] = useState<PortalStatus>("active");

  const portalUrl = "https://londoncsp.vetto.com";

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">White Label Portal</h1>
        <p className="text-muted-foreground mt-1">
          View your white-label portal status and preview. Contact your account manager to request changes.
        </p>
      </div>

      {/* Status Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          White-label portal settings are managed by Vetto administrators. To request changes to branding, domain, or portal features, please contact your account manager.
        </AlertDescription>
      </Alert>

      {/* Portal Status */}
      <Card>
        <CardHeader>
          <CardTitle>Portal Status</CardTitle>
          <CardDescription>Current status of your white-label client portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2 w-2 rounded-full ${portalStatus === "active" ? "bg-green-500" : portalStatus === "pending_approval" ? "bg-yellow-500" : "bg-red-500"}`} />
                <span className="font-medium capitalize">{portalStatus.replace("_", " ")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>URL:</span>
                <code className="bg-muted px-2 py-1 rounded text-xs">{portalUrl}</code>
              </div>
              {portalStatus === "active" && (
                <p className="text-sm text-muted-foreground">
                  Your portal is live and accessible to clients
                </p>
              )}
              {portalStatus === "pending_approval" && (
                <p className="text-sm text-muted-foreground">
                  Your portal configuration is pending admin approval
                </p>
              )}
              {portalStatus === "suspended" && (
                <p className="text-sm text-muted-foreground">
                  Your portal is temporarily unavailable. Contact support for assistance.
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              {copiedUrl ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={portalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview Portal
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={portalUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                View as Client
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Configuration (Read-Only) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Branding */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Branding</CardTitle>
            </div>
            <CardDescription>Your current white-label branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Company Name</p>
              <p className="text-sm text-muted-foreground">London CSP Ltd</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Primary Color</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded border" style={{ backgroundColor: "#8B5CF6" }} />
                <code className="text-xs">#8B5CF6</code>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Secondary Color</p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded border" style={{ backgroundColor: "#EC4899" }} />
                <code className="text-xs">#EC4899</code>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Logo</p>
              <Badge variant="secondary">Configured</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Domain */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Custom Domain</CardTitle>
            </div>
            <CardDescription>Your custom portal domain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Domain</p>
              <code className="text-sm text-muted-foreground">londoncsp.vetto.com</code>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">SSL Certificate</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="mr-1 h-3 w-3" />
                Active
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">DNS Status</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Configured
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle>Email Settings</CardTitle>
            </div>
            <CardDescription>Client-facing email configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">Sender Name</p>
              <p className="text-sm text-muted-foreground">London CSP Team</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Sender Email</p>
              <p className="text-sm text-muted-foreground">noreply@londoncsp.vetto.com</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Reply-To</p>
              <p className="text-sm text-muted-foreground">support@londoncsp.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Portal Features */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <CardTitle>Portal Features</CardTitle>
            </div>
            <CardDescription>Enabled features in your client portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm">Client Portal</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Document Upload</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Engagement Tracking</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Public Directory</p>
              <Badge variant="secondary">Disabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Request Changes</CardTitle>
          <CardDescription>
            Need to update your white-label configuration? Contact your account manager.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              To request changes to branding, custom domain, email settings, or portal features, please contact your Vetto account manager at <a href="mailto:support@vetto.com" className="text-primary hover:underline">support@vetto.com</a>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}