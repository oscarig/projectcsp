import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, Copy, Eye, EyeOff } from "lucide-react";

export function ApiAccessCard() {
  const [showKey, setShowKey] = useState(false);
  const mockApiKey = "sk_live_51H3KLqGpzXy2sK9w8vN2fR4mT6jL1pQ3hC7bD9xY5nW0eA2sM4vT8kZ1jR6uP7iO3gF5hL2wN9xK4yQ8vB6mC3nT1";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockApiKey);
  };

  const handleRegenerate = () => {
    console.log("Regenerating API key...");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage API keys for third-party integrations
            </CardDescription>
          </div>
          <Badge variant="outline">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>API Key</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showKey ? "text" : "password"}
                value={mockApiKey}
                readOnly
                className="pl-9 pr-9 font-mono text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Keep your API key secure. Do not share it publicly.
          </p>
        </div>

        <div className="pt-4 flex gap-2">
          <Button variant="outline" onClick={handleRegenerate}>
            Regenerate Key
          </Button>
          <Button variant="outline">View Documentation</Button>
        </div>
      </CardContent>
    </Card>
  );
}