/**
 * Types for Categories View
 */

import type { LucideIcon } from "lucide-react";

export interface Subcategory {
  id: string;
  name: string;
  icon: LucideIcon;
  providerCount: number;
  displayOrder: number;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  subcategories: Subcategory[];
  providerCount: number;
  displayOrder: number;
}

export type EditingItemState = 
  | { type: "category"; item: Category }
  | { type: "subcategory"; item: Subcategory; parentId?: string }
  | null;

export type AddingItemState = 
  | { type: "category" }
  | { type: "subcategory"; parentId: string }
  | null;

export interface CategoryFormData {
  name: string;
  iconName: string;
  displayOrder: number;
}