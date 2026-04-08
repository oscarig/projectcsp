import { WhiteLabelConfig } from "@/types/whitelabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailTabProps {
  config: WhiteLabelConfig;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function EmailTab({ config, isEditing, onSave, onCancel }: EmailTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="sender-name">Sender Name</Label>
          <Input
            id="sender-name"
            defaultValue={config.senderName}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sender-email">Sender Email</Label>
          <Input
            id="sender-email"
            defaultValue={config.senderEmail}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reply-to">Reply-To Email</Label>
          <Input
            id="reply-to"
            defaultValue={config.replyToEmail}
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