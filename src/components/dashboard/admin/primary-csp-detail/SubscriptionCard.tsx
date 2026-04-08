import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

interface SubscriptionCardProps {
  formData: any;
  isEditing: boolean;
  onFormDataChange: (data: any) => void;
}

export function SubscriptionCard({ formData, isEditing, onFormDataChange }: SubscriptionCardProps) {
  const getPlanLabel = (plan: string) => {
    const labels = {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
    };
    return labels[plan as keyof typeof labels] || plan;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plan">Current Plan</Label>
            {isEditing ? (
              <Select
                value={formData.plan}
                onValueChange={(value) => onFormDataChange({ ...formData, plan: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input id="plan" value={getPlanLabel(formData.plan)} disabled />
            )}
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex items-center gap-2 h-10">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium">Active</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Since</Label>
            <Input value={formData.since} disabled />
          </div>
          <div className="space-y-2">
            <Label>Next Billing</Label>
            <Input value={formData.nextBilling} disabled />
          </div>
        </div>
        {!isEditing && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => console.log("Override plan")}>
              Override Plan
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log("Apply discount")}>
              Apply Discount
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400"
              onClick={() => console.log("Cancel subscription")}
            >
              Cancel Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}