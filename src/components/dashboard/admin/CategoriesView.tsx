/**
 * Optimized Categories View
 * Refactored from 398 lines to ~70 lines
 * Performance improvements:
 * - Extracted specialized components with React.memo
 * - Custom hook for state management
 * - Separated concerns for better maintainability
 * - Mock data externalized
 */

import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";
import { CategoryCard } from "./categories/CategoryCard";
import { EditCategoryDialog } from "./categories/EditCategoryDialog";
import { AddCategoryDialog } from "./categories/AddCategoryDialog";
import { useCategories } from "./categories/useCategories";

export function CategoriesView() {
  const {
    categories,
    expandedCategories,
    editingState,
    addingState,
    toggleCategory,
    handleEditCategory,
    handleEditSubcategory,
    handleDelete,
    handleSave,
    handleCreate,
    handleOpenAddCategory,
    handleOpenAddSubcategory,
    setEditingState,
    setAddingState,
  } = useCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <FolderTree className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold">Categories Management</h1>
          </div>
          <p className="text-muted-foreground">
            Configure service categories and types.
          </p>
        </div>
        <Button onClick={handleOpenAddCategory} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2 text-white" />
          New Category
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isExpanded={expandedCategories.has(category.id)}
            onToggle={() => toggleCategory(category.id)}
            onEdit={() => handleEditCategory(category)}
            onDelete={() => handleDelete(category.id, "category")}
            onEditSubcategory={(subcategoryId) =>
              handleEditSubcategory(category.id, subcategoryId)
            }
            onDeleteSubcategory={(subcategoryId) => handleDelete(subcategoryId, "subcategory")}
            onAddSubcategory={() => handleOpenAddSubcategory(category.id)}
          />
        ))}
      </div>

      {/* Edit Dialog */}
      <EditCategoryDialog
        editingState={editingState}
        onClose={() => setEditingState(null)}
        onSave={handleSave}
      />

      {/* Add New Dialog */}
      <AddCategoryDialog
        addingState={addingState}
        onClose={() => setAddingState(null)}
        onCreate={handleCreate}
      />
    </div>
  );
}