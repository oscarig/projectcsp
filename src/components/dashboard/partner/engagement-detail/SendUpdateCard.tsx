import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paperclip, User, Send } from "lucide-react";

interface SendUpdateCardProps {
  message: string;
  requestType: string;
  onMessageChange: (value: string) => void;
  onRequestTypeChange: (value: string) => void;
  onSend?: () => void;
  onAttachFiles?: () => void;
  onAddRecipients?: () => void;
}

export const SendUpdateCard = memo(function SendUpdateCard({
  message,
  requestType,
  onMessageChange,
  onRequestTypeChange,
  onSend,
  onAttachFiles,
  onAddRecipients,
}: SendUpdateCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Update Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Type</label>
            <Select value={requestType} onValueChange={onRequestTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Message</label>
            <Textarea
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Enter your message"
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Attachments</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={onAttachFiles}
              >
                <Paperclip className="h-4 w-4" />
                Attach Files
              </Button>
              <span className="text-sm text-muted-foreground">(Optional)</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Recipients</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={onAddRecipients}
              >
                <User className="h-4 w-4" />
                Add Recipients
              </Button>
              <span className="text-sm text-muted-foreground">(Optional)</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Send</label>
            <Button size="sm" className="gap-2" onClick={onSend}>
              <Send className="h-4 w-4" />
              Send Notification
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});