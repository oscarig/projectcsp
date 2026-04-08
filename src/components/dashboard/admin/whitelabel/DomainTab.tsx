import { WhiteLabelConfig } from "@/types/whitelabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Check } from "lucide-react";

interface DomainTabProps {
  config: WhiteLabelConfig;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function DomainTab({ config, isEditing, onSave, onCancel }: DomainTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input id="domain" defaultValue={config.domain} disabled={!isEditing} />
        </div>
        <div className="space-y-2">
          <Label>SSL Certificate</Label>
          <div className="flex items-center gap-2">
            {config.sslCertificate === "active" ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="mr-1 h-3 w-3" />
                Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Pending Provisioning
              </Badge>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>DNS Status</Label>
          <div className="flex items-center gap-2">
            {config.dnsStatus === "configured" ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Check className="mr-1 h-3 w-3" />
                Configured
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Pending Configuration
              </Badge>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}