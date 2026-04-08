import { useState, useCallback } from "react";
import { mockCategories } from "./mockCategories";
import type { Category, EditingItemState, AddingItemState } from "./types";

export function useCategories() {
  const [categories] = useState<Category[]>(mockCategories);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingState, setEditingState] = useState<EditingItemState>(null);
  const [addingState, setAddingState] = useState<AddingItemState>(null);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  }, []);

  const handleEditCategory = useCallback((category: Category) => {
    setEditingState({ type: "category", item: category });
  }, []);

  const handleEditSubcategory = useCallback(
    (categoryId: string, subcategoryId: string) => {
      const category = categories.find((c) => c.id === categoryId);
      const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
      if (subcategory) {
        setEditingState({ type: "subcategory", item: subcategory, parentId: categoryId });
      }
    },
    [categories]
  );

  const handleDelete = useCallback((id: string, type: "category" | "subcategory") => {
    console.log(`Delete ${type}:`, id);
  }, []);

  const handleSave = useCallback(() => {
    console.log("Save changes:", editingState);
    setEditingState(null);
  }, [editingState]);

  const handleCreate = useCallback(() => {
    console.log("Create new:", addingState);
    setAddingState(null);
  }, [addingState]);

  const handleOpenAddCategory = useCallback(() => {
    setAddingState({ type: "category" });
  }, []);

  const handleOpenAddSubcategory = useCallback((parentId: string) => {
    setAddingState({ type: "subcategory", parentId });
  }, []);

  return {
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
  };
}