import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, RefreshCw, ExternalLink, CheckCircle2 } from "lucide-react";

interface ProductSyncCardProps {
  isSyncing: boolean;
  onSync: () => void;
}

export function ProductSyncCard({ isSyncing, onSync }: ProductSyncCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Product Sync</h2>
        </div>
        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Products Synced to Stripe</p>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">
              3 Primary CSP Plans + 2 Partner Plans + 3 Promoted Listing Tiers
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://dashboard.stripe.com/products", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Stripe Dashboard
            </Button>
          </div>
        </div>

        {/* Sync Status */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-green-900 dark:text-green-400">
                All Products Synced
              </p>
              <p className="text-xs text-green-700 dark:text-green-500">
                Last synced: 2 hours ago • All pricing plans are up to date with Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}