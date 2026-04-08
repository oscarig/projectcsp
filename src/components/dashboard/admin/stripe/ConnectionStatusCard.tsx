import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Copy } from "lucide-react";

interface ConnectionStatus {
  connected: boolean;
  mode: string;
  accountId: string;
  connectedSince: string;
}

interface ConnectionStatusCardProps {
  status: ConnectionStatus;
  testMode: boolean;
  onModeToggle: () => void;
  onCopy: (text: string, label: string) => void;
}

export function ConnectionStatusCard({ status, testMode, onModeToggle, onCopy }: ConnectionStatusCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Connection Status</h2>
        </div>
        <Separator />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Status</Label>
            <div className="flex items-center gap-2">
              {status.connected ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium text-green-600 dark:text-green-400">Connected</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-medium text-red-600 dark:text-red-400">Disconnected</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Mode</Label>
            <div className="flex items-center gap-2">
              <Badge variant={testMode ? "outline" : "default"} className={testMode ? "border-blue-600 text-blue-600 dark:text-blue-400" : "bg-emerald-600"}>
                {testMode ? "Test Mode" : "Live Mode"}
              </Badge>
              <Button
                variant="link"
                size="sm"
                onClick={onModeToggle}
                className="h-auto p-0 text-sm"
              >
                (switch to {testMode ? "Live" : "Test"})
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Account ID</Label>
            <div className="flex items-center gap-2">
              <code className="text-sm font-mono">{status.accountId}</code>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2"
                onClick={() => onCopy(status.accountId, "Account ID")}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Connected Since</Label>
            <p className="text-sm">{status.connectedSince}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}