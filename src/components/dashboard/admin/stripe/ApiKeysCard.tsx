import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Copy, Eye, EyeOff } from "lucide-react";

interface ApiKeysCardProps {
  testMode: boolean;
  showPublishableKey: boolean;
  showSecretKey: boolean;
  showWebhookSecret: boolean;
  onTogglePublishable: () => void;
  onToggleSecret: () => void;
  onToggleWebhook: () => void;
  onCopy: (text: string, label: string) => void;
}

export function ApiKeysCard({
  testMode,
  showPublishableKey,
  showSecretKey,
  showWebhookSecret,
  onTogglePublishable,
  onToggleSecret,
  onToggleWebhook,
  onCopy,
}: ApiKeysCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">API Keys</h2>
          </div>
          <Button variant="outline" size="sm">
            Regenerate Keys
          </Button>
        </div>
        <Separator />

        <div className="space-y-4">
          {/* Publishable Key */}
          <div className="space-y-2">
            <Label htmlFor="publishable-key">Publishable Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="publishable-key"
                  type={showPublishableKey ? "text" : "password"}
                  value={testMode ? "pk_test_51234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "pk_live_51234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                  onClick={onTogglePublishable}
                >
                  {showPublishableKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopy(testMode ? "pk_test_..." : "pk_live_...", "Publishable Key")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Secret Key */}
          <div className="space-y-2">
            <Label htmlFor="secret-key">Secret Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="secret-key"
                  type={showSecretKey ? "text" : "password"}
                  value={testMode ? "sk_test_51234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "sk_live_51234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                  onClick={onToggleSecret}
                >
                  {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopy(testMode ? "sk_test_..." : "sk_live_...", "Secret Key")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Webhook Secret */}
          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Webhook Signing Secret</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="webhook-secret"
                  type={showWebhookSecret ? "text" : "password"}
                  value="whsec_1234567890abcdefghijklmnopqrstuvwxyz"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
                  onClick={onToggleWebhook}
                >
                  {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onCopy("whsec_...", "Webhook Secret")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}