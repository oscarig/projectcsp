import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";
import { PlanCard } from "./partner-plans/PlanCard";
import { PlanFormDialog } from "./partner-plans/PlanFormDialog";
import { PlanPreviewDialog } from "./partner-plans/PlanPreviewDialog";
import { mockPartnerPlans } from "./partner-plans/mockPlans";

type PlanFeature = {
  id: string;
  description: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: PlanFeature[];
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

type PlanFormData = {
  name: string;
  price: string;
  billingPeriod: "month" | "year";
  description: string;
  features: string[];
};

export function PartnerPlansView() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [previewPlan, setPreviewPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    price: "",
    billingPeriod: "month",
    description: "",
    features: [""],
  });

  const handleCreatePlan = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      price: "",
      billingPeriod: "month",
      description: "",
      features: [""],
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      billingPeriod: plan.billingPeriod,
      description: plan.description,
      features: plan.features.map((f) => f.description),
    });
  };

  const handleDuplicatePlan = (plan: Plan) => {
    console.log("Duplicate plan:", plan.id);
    setIsCreating(true);
    setFormData({
      name: `${plan.name} (Copy)`,
      price: plan.price.toString(),
      billingPeriod: plan.billingPeriod,
      description: plan.description,
      features: plan.features.map((f) => f.description),
    });
  };

  const handleArchivePlan = (planId: string) => {
    console.log("Archive plan:", planId);
  };

  const handlePreviewPlan = (plan: Plan) => {
    setPreviewPlan(plan);
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      console.log("Update plan:", editingPlan.id, formData);
    } else {
      console.log("Create new plan:", formData);
    }
    setIsCreating(false);
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Partner Plans</h1>
              <p className="text-sm text-muted-foreground">
                Configure subscription plans for Partners
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleCreatePlan}>
          <Plus className="mr-2 h-4 w-4" />
          New Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPartnerPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEditPlan}
            onDuplicate={handleDuplicatePlan}
            onPreview={handlePreviewPlan}
            onArchive={handleArchivePlan}
          />
        ))}
      </div>

      {/* Create/Edit Plan Dialog */}
      <PlanFormDialog
        open={isCreating || editingPlan !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false);
            setEditingPlan(null);
          }
        }}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSavePlan}
        isEditing={!!editingPlan}
      />

      {/* Preview Dialog */}
      <PlanPreviewDialog
        plan={previewPlan}
        onClose={() => setPreviewPlan(null)}
      />
    </div>
  );
}