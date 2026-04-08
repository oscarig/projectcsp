import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export function ComplianceSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Compliance Settings</CardTitle>
            <CardDescription>
              Manage compliance requirements and data handling
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Compliant
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>GDPR Compliance</Label>
            <p className="text-sm text-muted-foreground">
              Follow GDPR data protection requirements
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Data Retention</Label>
            <p className="text-sm text-muted-foreground">
              Automatically delete data after 7 years
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Audit Logging</Label>
            <p className="text-sm text-muted-foreground">
              Keep detailed logs of all system activities
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Client Data Encryption</Label>
            <p className="text-sm text-muted-foreground">
              Encrypt sensitive client information at rest
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}