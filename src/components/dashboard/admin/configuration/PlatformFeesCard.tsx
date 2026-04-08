import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import { PlatformFee } from "./types";

export function PlatformFeesCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [fees, setFees] = useState<PlatformFee[]>([
    { id: "1", type: "Primary CSP Subscription", percentage: 15, fixedAmount: undefined },
    { id: "2", type: "Partner Earnings", percentage: 10, fixedAmount: undefined },
    { id: "3", type: "Transaction Fee", percentage: 2.9, fixedAmount: 0.30 },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Platform Fees</CardTitle>
            <CardDescription>Configure platform commission and transaction fees</CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Fees
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fees.map((fee) => (
            <div key={fee.id} className="p-4 border rounded-lg">
              <Label className="text-sm font-medium">{fee.type}</Label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Percentage</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      type="number"
                      value={fee.percentage}
                      disabled={!isEditing}
                      className="w-24"
                      step="0.1"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                {fee.fixedAmount !== undefined && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Fixed Amount</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={fee.fixedAmount}
                        disabled={!isEditing}
                        className="w-24"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}