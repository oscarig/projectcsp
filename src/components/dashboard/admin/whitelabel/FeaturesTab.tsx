import { WhiteLabelConfig } from "@/types/whitelabel";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface FeaturesTabProps {
  config: WhiteLabelConfig;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function FeaturesTab({ config, isEditing, onSave, onCancel }: FeaturesTabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Client Portal</p>
            <p className="text-sm text-muted-foreground">
              Enable client-facing portal access
            </p>
          </div>
          <Switch defaultChecked={config.portalEnabled} disabled={!isEditing} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Document Upload</p>
            <p className="text-sm text-muted-foreground">
              Allow clients to upload documents
            </p>
          </div>
          <Switch defaultChecked={config.documentUploadEnabled} disabled={!isEditing} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Engagement Tracking</p>
            <p className="text-sm text-muted-foreground">
              Show engagement progress to clients
            </p>
          </div>
          <Switch
            defaultChecked={config.engagementTrackingEnabled}
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Public Directory</p>
            <p className="text-sm text-muted-foreground">
              List provider in public directory
            </p>
          </div>
          <Switch
            defaultChecked={config.publicDirectoryEnabled}
            disabled={!isEditing}
          />
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