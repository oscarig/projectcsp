import {
  Landmark,
  CreditCard,
  Coins,
  Calculator,
  BookOpen,
  Briefcase,
  TrendingUp,
  Scale,
  User,
  FileText,
  Copyright,
  Building2,
  ClipboardList,
  MapPin,
  Home,
  Laptop,
} from "lucide-react";
import type { Category } from "./types";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Banking & Payments",
    icon: Landmark,
    displayOrder: 1,
    providerCount: 12,
    subcategories: [
      { id: "1-1", name: "Banks", icon: Landmark, displayOrder: 1, providerCount: 4 },
      { id: "1-2", name: "EMI / E-Money Institutions", icon: CreditCard, displayOrder: 2, providerCount: 5 },
      { id: "1-3", name: "Payment Processors", icon: Coins, displayOrder: 3, providerCount: 3 },
    ],
  },
  {
    id: "2",
    name: "Accounting & Finance",
    icon: Calculator,
    displayOrder: 2,
    providerCount: 24,
    subcategories: [
      { id: "2-1", name: "Accountants", icon: Calculator, displayOrder: 1, providerCount: 10 },
      { id: "2-2", name: "Bookkeepers", icon: BookOpen, displayOrder: 2, providerCount: 8 },
      { id: "2-3", name: "Tax Advisors", icon: Briefcase, displayOrder: 3, providerCount: 4 },
      { id: "2-4", name: "CFO Services", icon: TrendingUp, displayOrder: 4, providerCount: 2 },
    ],
  },
  {
    id: "3",
    name: "Legal Services",
    icon: Scale,
    displayOrder: 3,
    providerCount: 18,
    subcategories: [
      { id: "3-1", name: "Corporate Lawyers", icon: User, displayOrder: 1, providerCount: 8 },
      { id: "3-2", name: "Contract Lawyers", icon: FileText, displayOrder: 2, providerCount: 6 },
      { id: "3-3", name: "IP Lawyers", icon: Copyright, displayOrder: 3, providerCount: 4 },
    ],
  },
  {
    id: "4",
    name: "Company Formation",
    icon: Building2,
    displayOrder: 4,
    providerCount: 15,
    subcategories: [
      { id: "4-1", name: "Formation Agents", icon: ClipboardList, displayOrder: 1, providerCount: 10 },
      { id: "4-2", name: "Registered Offices", icon: MapPin, displayOrder: 2, providerCount: 5 },
    ],
  },
  {
    id: "5",
    name: "Real Estate",
    icon: Home,
    displayOrder: 5,
    providerCount: 9,
    subcategories: [
      { id: "5-1", name: "Office Space", icon: Building2, displayOrder: 1, providerCount: 5 },
      { id: "5-2", name: "Virtual Offices", icon: Laptop, displayOrder: 2, providerCount: 4 },
    ],
  },
];