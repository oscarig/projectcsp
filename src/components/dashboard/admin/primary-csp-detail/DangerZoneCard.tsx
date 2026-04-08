import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Trash2, LogOut } from "lucide-react";

export function DangerZoneCard() {
  return (
    <Card className="border-red-200 dark:border-red-900/30">
      <CardHeader>
        <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/30"
            onClick={() => console.log("Suspend account")}
          >
            <Ban className="h-4 w-4 mr-2" />
            Suspend Account
          </Button>
          <Button
            variant="outline"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30"
            onClick={() => console.log("Delete account")}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
          <Button
            variant="outline"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30"
            onClick={() => console.log("Force logout")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Force Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}