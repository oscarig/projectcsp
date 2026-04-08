import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface AcceptRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    ref: string;
    from: string;
    service: string;
    details: string;
  };
  onAccept: (conflictStatus: string) => void;
  onDecline: () => void;
}

export function AcceptRequestModal({
  open,
  onOpenChange,
  request,
  onAccept,
  onDecline,
}: AcceptRequestModalProps) {
  const [conflictStatus, setConflictStatus] = useState<string>("no-conflict");

  const handleAccept = () => {
    onAccept(conflictStatus);
    onOpenChange(false);
  };

  const handleDecline = () => {
    onDecline();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Accept Engagement Request</DialogTitle>
          <DialogDescription>
            Review the request details and complete the conflict check before accepting
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">REQUEST:</span>
              <Badge variant="outline" className="font-mono">
                {request.ref}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">FROM:</span>
              <span className="text-sm font-medium">{request.from}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">SERVICE:</span>
              <span className="text-sm font-medium">{request.service}</span>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Request Details</h3>
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm whitespace-pre-line">{request.details}</p>
            </div>
          </div>

          {/* Conflict Check */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold">Conflict Check</h3>
            </div>
            <RadioGroup value={conflictStatus} onValueChange={setConflictStatus}>
              <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="no-conflict" id="no-conflict" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="no-conflict" className="font-medium cursor-pointer">
                    No conflict
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I have no existing relationship or conflict with this client
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="potential-conflict" id="potential-conflict" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="potential-conflict" className="font-medium cursor-pointer">
                    Potential conflict - flag to Primary CSP
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    There may be a conflict of interest that needs CSP review
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="pre-existing" id="pre-existing" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="pre-existing" className="font-medium cursor-pointer">
                    Pre-existing relationship - declare
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I have a prior relationship with this client that must be disclosed
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>
            Accept Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}