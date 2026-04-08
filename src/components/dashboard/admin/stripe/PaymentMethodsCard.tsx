import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard } from "lucide-react";

interface PaymentMethodsCardProps {
  paymentMethods: {
    cards: boolean;
    sepa: boolean;
    bankTransfer: boolean;
  };
  onToggleMethod: (method: "cards" | "sepa" | "bankTransfer") => void;
}

export function PaymentMethodsCard({ paymentMethods, onToggleMethod }: PaymentMethodsCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Payment Methods</h2>
          </div>
          <Button variant="outline" size="sm">
            Configure Payment Methods
          </Button>
        </div>
        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Checkbox
                id="cards"
                checked={paymentMethods.cards}
                onCheckedChange={() => onToggleMethod("cards")}
              />
              <div>
                <label htmlFor="cards" className="font-medium cursor-pointer select-none">
                  Credit/Debit Cards
                </label>
                <p className="text-xs text-muted-foreground">
                  Visa, Mastercard, American Express, and more
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-600 dark:bg-green-900/30 dark:text-green-400">
              Enabled
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-dashed">
            <div className="flex items-center gap-3">
              <Checkbox
                id="sepa"
                checked={paymentMethods.sepa}
                onCheckedChange={() => onToggleMethod("sepa")}
              />
              <div>
                <label htmlFor="sepa" className="font-medium cursor-pointer select-none">
                  SEPA Direct Debit
                </label>
                <p className="text-xs text-muted-foreground">
                  For European customers
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              Disabled
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-dashed bg-muted/30">
            <div className="flex items-center gap-3">
              <Checkbox
                id="bank-transfer"
                checked={paymentMethods.bankTransfer}
                disabled
              />
              <div>
                <label htmlFor="bank-transfer" className="font-medium text-muted-foreground cursor-not-allowed select-none">
                  Bank Transfer
                </label>
                <p className="text-xs text-muted-foreground">
                  Coming soon
                </p>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              Coming Soon
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}