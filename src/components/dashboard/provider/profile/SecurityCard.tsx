import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface SecurityCardProps {
  onPasswordChange: () => void;
}

export function SecurityCard({ onPasswordChange }: SecurityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <p className="font-medium">Password</p>
            <p className="text-sm text-muted-foreground">
              Last changed 3 months ago
            </p>
          </div>
          <Button variant="outline" onClick={onPasswordChange}>
            Change Password
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security
            </p>
          </div>
          <Button variant="outline">
            Enable 2FA
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <p className="font-medium">Active Sessions</p>
            <p className="text-sm text-muted-foreground">
              Manage your active sessions
            </p>
          </div>
          <Button variant="outline">
            View Sessions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}