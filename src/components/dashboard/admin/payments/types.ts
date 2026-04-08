/**
 * Types for Payments View
 */

export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
export type PaymentMethod = "card" | "bank_transfer" | "paypal" | "crypto";
export type CustomerType = "provider" | "partner";

export interface Payment {
  id: string;
  customerName: string;
  customerType: CustomerType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  date: string;
  invoiceId: string;
  description: string;
}

export interface PaymentFilters {
  search: string;
  status: PaymentStatus | "all";
  customerType: CustomerType | "all";
  method: PaymentMethod | "all";
  dateFrom: string;
  dateTo: string;
}