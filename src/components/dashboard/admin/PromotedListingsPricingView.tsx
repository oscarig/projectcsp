import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { PricingTierCard } from "./promoted-listings-pricing/PricingTierCard";
import { TierFormDialog } from "./promoted-listings-pricing/TierFormDialog";
import { TierPreviewDialog } from "./promoted-listings-pricing/TierPreviewDialog";
import { mockTiers } from "./promoted-listings-pricing/mockTiers";

type PricingTier = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: Array<{
    id: string;
    description: string;
    included: boolean;
  }>;
  jurisdictionLimit: number | "unlimited";
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

type FormData = {
  name: string;
  price: string;
  billingPeriod: "month" | "year";
  description: string;
  features: string[];
  jurisdictionLimit: string;
};

export function PromotedListingsPricingView() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [previewTier, setPreviewTier] = useState<PricingTier | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    billingPeriod: "month",
    description: "",
    features: [""],
    jurisdictionLimit: "1",
  });

  const handleEditTier = (tier: PricingTier) => {
    setEditingTier(tier);
    setFormData({
      name: tier.name,
      price: tier.price.toString(),
      billingPeriod: tier.billingPeriod,
      description: tier.description,
      features: tier.features.map((f) => f.description),
      jurisdictionLimit:
        tier.jurisdictionLimit === "unlimited"
          ? "unlimited"
          : tier.jurisdictionLimit.toString(),
    });
    setIsCreating(true);
  };

  const handleDuplicate = (tier: PricingTier) => {
    console.log("Duplicate tier:", tier.id);
    setFormData({
      name: tier.name + " (Copy)",
      price: tier.price.toString(),
      billingPeriod: tier.billingPeriod,
      description: tier.description,
      features: tier.features.map((f) => f.description),
      jurisdictionLimit:
        tier.jurisdictionLimit === "unlimited"
          ? "unlimited"
          : tier.jurisdictionLimit.toString(),
    });
    setIsCreating(true);
  };

  const handleArchive = (tierId: string) => {
    console.log("Archive tier:", tierId);
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

  const handleSaveTier = () => {
    if (editingTier) {
      console.log("Update tier:", editingTier.id, formData);
    } else {
      console.log("Create new tier:", formData);
    }
    setIsCreating(false);
    setEditingTier(null);
  };

  const handleCloseDialog = () => {
    setIsCreating(false);
    setEditingTier(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Promoted Listings Pricing</h1>
              <p className="text-muted-foreground">
                Configure pricing tiers for promoted listings
              </p>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Tier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTiers.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            onEdit={handleEditTier}
            onDuplicate={handleDuplicate}
            onPreview={setPreviewTier}
            onArchive={handleArchive}
          />
        ))}
      </div>

      <TierFormDialog
        isOpen={isCreating}
        onClose={handleCloseDialog}
        formData={formData}
        isEditing={!!editingTier}
        onFormChange={setFormData}
        onSave={handleSaveTier}
        onAddFeature={handleAddFeature}
        onRemoveFeature={handleRemoveFeature}
        onFeatureChange={handleFeatureChange}
      />

      <TierPreviewDialog
        tier={previewTier}
        onClose={() => setPreviewTier(null)}
      />
    </div>
  );
}