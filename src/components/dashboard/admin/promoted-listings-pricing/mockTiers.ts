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

export const mockTiers: PricingTier[] = [
  {
    id: "tier_single",
    name: "Single Jurisdiction",
    price: 200,
    billingPeriod: "month",
    description: "Featured placement in one jurisdiction",
    features: [
      {
        id: "f1",
        description: "Top placement in one jurisdiction",
        included: true,
      },
      {
        id: "f2",
        description: '"Featured Partner" badge',
        included: true,
      },
      {
        id: "f3",
        description: "Enhanced profile visibility",
        included: true,
      },
    ],
    jurisdictionLimit: 1,
    status: "active",
    subscriberCount: 15,
    stripePriceId: "price_promoted_single",
  },
  {
    id: "tier_multi",
    name: "Multi-Jurisdiction",
    price: 500,
    billingPeriod: "month",
    description: "Featured placement in up to 3 jurisdictions",
    features: [
      {
        id: "f1",
        description: "Top placement in up to 3 jurisdictions",
        included: true,
      },
      {
        id: "f2",
        description: '"Featured Partner" badge',
        included: true,
      },
      {
        id: "f3",
        description: "Priority in search results",
        included: true,
      },
      {
        id: "f4",
        description: "Advanced analytics",
        included: true,
      },
    ],
    jurisdictionLimit: 3,
    status: "active",
    subscriberCount: 8,
    stripePriceId: "price_promoted_multi",
  },
  {
    id: "tier_enterprise",
    name: "Enterprise",
    price: 1000,
    billingPeriod: "month",
    description: "Featured placement in all jurisdictions",
    features: [
      {
        id: "f1",
        description: "Top placement in all jurisdictions",
        included: true,
      },
      {
        id: "f2",
        description: '"Premium Partner" badge',
        included: true,
      },
      {
        id: "f3",
        description: "Early access to new engagement postings",
        included: true,
      },
      {
        id: "f4",
        description: "Dedicated account manager",
        included: true,
      },
      {
        id: "f5",
        description: "Custom analytics reports",
        included: true,
      },
    ],
    jurisdictionLimit: "unlimited",
    status: "active",
    subscriberCount: 3,
    stripePriceId: "price_promoted_enterprise",
  },
];