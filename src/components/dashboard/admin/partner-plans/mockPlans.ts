type PlanFeature = {
  id: string;
  description: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: PlanFeature[];
  status: "active" | "archived";
  subscriberCount: number;
  stripePriceId?: string;
};

export const mockPartnerPlans: Plan[] = [
  {
    id: "plan_basic",
    name: "Basic",
    price: 50,
    billingPeriod: "month",
    description: "Essential features for partners starting out",
    features: [
      {
        id: "f1",
        description: "Profile in partner directory",
        included: true,
      },
      {
        id: "f2",
        description: "Receive engagement requests",
        included: true,
      },
      {
        id: "f3",
        description: "50 quotes per month",
        included: true,
      },
      {
        id: "f4",
        description: "Basic analytics",
        included: true,
      },
      {
        id: "f5",
        description: "Email support",
        included: true,
      },
    ],
    status: "active",
    subscriberCount: 12,
    stripePriceId: "price_partner_basic",
  },
  {
    id: "plan_premium",
    name: "Premium",
    price: 100,
    billingPeriod: "month",
    description: "Advanced features for established partners",
    features: [
      {
        id: "f1",
        description: "Priority profile in directory",
        included: true,
      },
      {
        id: "f2",
        description: "Receive engagement requests",
        included: true,
      },
      {
        id: "f3",
        description: "Unlimited quotes",
        included: true,
      },
      {
        id: "f4",
        description: "Advanced analytics & insights",
        included: true,
      },
      {
        id: "f5",
        description: "Priority support",
        included: true,
      },
      {
        id: "f6",
        description: "1 Promoted Listing included",
        included: true,
      },
    ],
    status: "active",
    subscriberCount: 8,
    stripePriceId: "price_partner_premium",
  },
];