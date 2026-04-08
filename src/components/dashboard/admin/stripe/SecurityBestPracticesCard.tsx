import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function SecurityBestPracticesCard() {
  return (
    <Card className="p-6 border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="font-semibold text-amber-900 dark:text-amber-400">Security Best Practices</h3>
          <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-500">
            <li>• Never commit API keys to version control</li>
            <li>• Use environment variables for all sensitive data</li>
            <li>• Rotate keys regularly and after any suspected compromise</li>
            <li>• Restrict API key permissions to only what's necessary</li>
            <li>• Always use webhook signing secrets to verify webhook authenticity</li>
            <li>• Test webhooks in test mode before deploying to production</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}