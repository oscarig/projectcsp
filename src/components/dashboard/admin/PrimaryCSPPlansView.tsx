import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";
import { PlanCard } from "./primary-csp-plans/PlanCard";
import { PlanFormDialog } from "./primary-csp-plans/PlanFormDialog";
import { PlanPreviewDialog } from "./primary-csp-plans/PlanPreviewDialog";
import { mockPlans } from "./primary-csp-plans/mockPlans";

type Plan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: { id: string; description: string; included: boolean }[];
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

export function PrimaryCSPPlansView() {
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

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Primary CSP Plans</h1>
              <p className="text-sm text-muted-foreground">
                Configure subscription plans for Primary CSPs
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
        {mockPlans.map((plan) => (
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
        isOpen={isCreating || editingPlan !== null}
        editingPlan={editingPlan}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSavePlan}
        onClose={() => {
          setIsCreating(false);
          setEditingPlan(null);
        }}
        onAddFeature={handleAddFeature}
        onRemoveFeature={handleRemoveFeature}
        onFeatureChange={handleFeatureChange}
      />

      {/* Preview Dialog */}
      <PlanPreviewDialog
        plan={previewPlan}
        onClose={() => setPreviewPlan(null)}
      />
    </div>
  );
}