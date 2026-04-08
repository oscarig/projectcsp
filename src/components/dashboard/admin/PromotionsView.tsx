import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, Plus } from "lucide-react";
import { Promotion, PromotionFormData } from "@/types/promotions";
import { PromotionCard } from "./promotions/PromotionCard";
import { PromotionFormDialog } from "./promotions/PromotionFormDialog";
import { PromotionUsageDialog } from "./promotions/PromotionUsageDialog";
import { BulkDiscountsTab } from "./promotions/BulkDiscountsTab";

const mockPromotions: Promotion[] = [
  {
    id: "promo_001",
    code: "EARLYBIRD2024",
    description: "20% off first 6 months",
    type: "percentage",
    amount: 20,
    appliesTo: "primary_csp",
    validUntil: "2024-12-31",
    usageCount: 24,
    usageLimit: 100,
    status: "active",
  },
  {
    id: "promo_002",
    code: "PARTNERLAUNCH",
    description: "50% off first 3 months",
    type: "percentage",
    amount: 50,
    appliesTo: "partner",
    validUntil: "2024-06-30",
    usageCount: 12,
    usageLimit: 50,
    status: "active",
  },
  {
    id: "promo_003",
    code: "PROMO50",
    description: "$50 off first promoted listing",
    type: "fixed",
    amount: 50,
    appliesTo: "promoted_listing",
    validUntil: "ongoing",
    usageCount: 8,
    status: "active",
  },
  {
    id: "promo_004",
    code: "LAUNCH2024",
    description: "30% off all subscriptions",
    type: "percentage",
    amount: 30,
    appliesTo: "all",
    validUntil: "2024-03-31",
    usageCount: 45,
    usageLimit: 50,
    status: "expired",
  },
];

export function PromotionsView() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [viewingUsage, setViewingUsage] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState<PromotionFormData>({
    code: "",
    description: "",
    type: "percentage",
    amount: "",
    appliesTo: "all",
    validUntil: "",
    usageLimit: "",
  });

  const handleEditPromo = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      description: promo.description,
      type: promo.type,
      amount: promo.amount.toString(),
      appliesTo: promo.appliesTo,
      validUntil: promo.validUntil === "ongoing" ? "" : promo.validUntil,
      usageLimit: promo.usageLimit?.toString() || "",
    });
    setIsCreating(true);
  };

  const handleDeactivate = (promoId: string) => {
    console.log("Deactivate promotion:", promoId);
  };

  const handleDelete = (promoId: string) => {
    console.log("Delete promotion:", promoId);
  };

  const handleSavePromo = () => {
    if (editingPromo) {
      console.log("Update promotion:", editingPromo.id, formData);
    } else {
      console.log("Create new promotion:", formData);
    }
    setIsCreating(false);
    setEditingPromo(null);
  };

  const handleFormChange = (data: Partial<PromotionFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const activePromotions = mockPromotions.filter((p) => p.status === "active");
  const expiredPromotions = mockPromotions.filter((p) => p.status === "expired");
  const disabledPromotions = mockPromotions.filter((p) => p.status === "disabled");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Tag className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Promotions & Discounts</h1>
              <p className="text-muted-foreground">
                Manage discount codes and promotional offers
              </p>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Promotion
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activePromotions.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredPromotions.length})</TabsTrigger>
          <TabsTrigger value="disabled">Disabled ({disabledPromotions.length})</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Discounts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activePromotions.map((promo) => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              onEdit={handleEditPromo}
              onViewUsage={setViewingUsage}
              onDeactivate={handleDeactivate}
              onDelete={handleDelete}
            />
          ))}
          {activePromotions.length === 0 && (
            <div className="flex h-24 items-center justify-center text-muted-foreground">
              No active promotions
            </div>
          )}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {expiredPromotions.map((promo) => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              onEdit={handleEditPromo}
              onViewUsage={setViewingUsage}
              onDeactivate={handleDeactivate}
              onDelete={handleDelete}
            />
          ))}
          {expiredPromotions.length === 0 && (
            <div className="flex h-24 items-center justify-center text-muted-foreground">
              No expired promotions
            </div>
          )}
        </TabsContent>

        <TabsContent value="disabled" className="space-y-4">
          {disabledPromotions.length === 0 && (
            <div className="flex h-24 items-center justify-center text-muted-foreground">
              No disabled promotions
            </div>
          )}
        </TabsContent>

        <TabsContent value="bulk">
          <BulkDiscountsTab />
        </TabsContent>
      </Tabs>

      <PromotionFormDialog
        open={isCreating}
        onOpenChange={setIsCreating}
        editingPromo={editingPromo}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSavePromo}
      />

      <PromotionUsageDialog
        promotion={viewingUsage}
        open={!!viewingUsage}
        onOpenChange={() => setViewingUsage(null)}
      />
    </div>
  );
}