import { WhiteLabelConfig } from "@/types/whitelabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BrandingTabProps {
  config: WhiteLabelConfig;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function BrandingTab({ config, isEditing, onSave, onCancel }: BrandingTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            defaultValue={config.companyName}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex gap-2">
            <div
              className="h-10 w-10 rounded border"
              style={{ backgroundColor: config.primaryColor }}
            />
            <Input
              id="primary-color"
              defaultValue={config.primaryColor}
              disabled={!isEditing}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="secondary-color">Secondary Color</Label>
          <div className="flex gap-2">
            <div
              className="h-10 w-10 rounded border"
              style={{ backgroundColor: config.secondaryColor }}
            />
            <Input
              id="secondary-color"
              defaultValue={config.secondaryColor}
              disabled={!isEditing}
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo-url">Logo URL</Label>
          <Input
            id="logo-url"
            defaultValue={config.logoUrl || ""}
            disabled={!isEditing}
            placeholder="https://..."
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