import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, GripVertical, Edit, Trash2 } from "lucide-react";
import { ServiceCategory } from "./types";

export function ServiceCategoriesCard() {
  const [categories, setCategories] = useState<ServiceCategory[]>([
    { id: "1", name: "Tax Services", description: "Tax planning and preparation", icon: "📊", active: true, providerCount: 45 },
    { id: "2", name: "Audit & Assurance", description: "Financial statement audits", icon: "✅", active: true, providerCount: 32 },
    { id: "3", name: "Advisory Services", description: "Business consulting", icon: "💼", active: true, providerCount: 28 },
    { id: "4", name: "Bookkeeping", description: "Financial record management", icon: "📚", active: true, providerCount: 56 },
    { id: "5", name: "Payroll Services", description: "Payroll processing", icon: "💰", active: false, providerCount: 12 },
  ]);

  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, active: !cat.active } : cat
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Service Categories</CardTitle>
            <CardDescription>Manage service categories available on the platform</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {category.providerCount} providers
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={category.active}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}