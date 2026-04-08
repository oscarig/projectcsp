import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Copy, CheckCircle2, RefreshCw } from "lucide-react";

interface WebhookConfigCardProps {
  webhookEvents: Record<string, boolean>;
  isTesting: boolean;
  onToggleEvent: (event: string) => void;
  onTestWebhook: () => void;
  onCopy: (text: string, label: string) => void;
}

export function WebhookConfigCard({
  webhookEvents,
  isTesting,
  onToggleEvent,
  onTestWebhook,
  onCopy,
}: WebhookConfigCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Webhook Configuration</h2>
        </div>
        <Separator />

        <div className="space-y-4">
          {/* Webhook URL */}
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook Endpoint URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value="https://api.globalcspconnect.com/stripe/webhook"
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopy("https://api.globalcspconnect.com/stripe/webhook", "Webhook URL")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure this URL in your Stripe Dashboard under Webhooks
            </p>
          </div>

          {/* Events to Listen For */}
          <div className="space-y-3">
            <Label>Events to Listen For</Label>
            <div className="space-y-2">
              {Object.entries(webhookEvents).map(([event, enabled]) => (
                <div key={event} className="flex items-center gap-2">
                  <Checkbox
                    id={event}
                    checked={enabled}
                    onCheckedChange={() => onToggleEvent(event)}
                  />
                  <label
                    htmlFor={event}
                    className="text-sm font-mono cursor-pointer select-none"
                  >
                    {event}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Test Webhook */}
          <Button
            variant="outline"
            onClick={onTestWebhook}
            disabled={isTesting}
          >
            {isTesting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Test Webhook
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}