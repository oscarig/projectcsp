import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Trash2, LogOut } from "lucide-react";

export function DangerZoneCard() {
  return (
    <Card className="border-red-200 dark:border-red-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-red-600 dark:text-red-400 sm:text-lg">
          <Ban className="h-5 w-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Suspend account")}
            className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/10"
          >
            <Ban className="mr-2 h-4 w-4" />
            Suspend Account
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Delete account")}
            className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Force logout")}
            className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Force Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}