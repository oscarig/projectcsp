import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Pencil, Trash2, Plus } from "lucide-react";
import type { Category } from "./types";

interface CategoryCardProps {
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onEditSubcategory: (subcategoryId: string) => void;
  onDeleteSubcategory: (subcategoryId: string) => void;
  onAddSubcategory: () => void;
}

export const CategoryCard = memo(function CategoryCard({
  category,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
  onEditSubcategory,
  onDeleteSubcategory,
  onAddSubcategory,
}: CategoryCardProps) {
  const CategoryIcon = category.icon;

  return (
    <Card>
      <div className="p-4">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 flex-1 text-left hover:opacity-80 transition-opacity"
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            )}
            <CategoryIcon className="h-6 w-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.subcategories.length} subcategories · {category.providerCount} providers
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4 text-emerald-600" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>

        {/* Subcategories */}
        {isExpanded && (
          <div className="ml-8 mt-4 space-y-2">
            {category.subcategories.map((sub) => {
              const SubIcon = sub.icon;
              return (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <SubIcon className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sub.providerCount} providers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSubcategory(sub.id)}
                    >
                      <Pencil className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteSubcategory(sub.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={onAddSubcategory}
              className="w-full mt-2"
            >
              <Plus className="h-4 w-4 mr-2 text-emerald-600" />
              Add Subcategory
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
});