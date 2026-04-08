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

export const mockPlans: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    price: 300,
    billingPeriod: "month",
    description: "Perfect for small CSPs getting started",
    features: [
      {
        id: "f1",
        description: "3 outsourced matters/month",
        included: true,
      },
      {
        id: "f2",
        description: "Basic partner directory access",
        included: true,
      },
      {
        id: "f3",
        description: "2 team members",
        included: true,
      },
      {
        id: "f4",
        description: "Email support",
        included: true,
      },
      {
        id: "f5",
        description: "Basic analytics",
        included: true,
      },
    ],
    status: "active",
    subscriberCount: 2,
    stripePriceId: "price_starter_monthly",
  },
  {
    id: "plan_professional",
    name: "Professional",
    price: 1000,
    billingPeriod: "month",
    description: "For growing CSPs with higher volume needs",
    features: [
      {
        id: "f1",
        description: "Unlimited outsourced matters",
        included: true,
      },
      {
        id: "f2",
        description: "Full partner directory access",
        included: true,
      },
      {
        id: "f3",
        description: "Priority support",
        included: true,
      },
      {
        id: "f4",
        description: "10 team members",
        included: true,
      },
      {
        id: "f5",
        description: "Advanced analytics",
        included: true,
      },
      {
        id: "f6",
        description: "Custom branding",
        included: true,
      },
    ],
    status: "active",
    subscriberCount: 4,
    stripePriceId: "price_pro_monthly",
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: 3000,
    billingPeriod: "month",
    description: "For large CSPs requiring enterprise features",
    features: [
      {
        id: "f1",
        description: "Unlimited outsourced matters",
        included: true,
      },
      {
        id: "f2",
        description: "API access",
        included: true,
      },
      {
        id: "f3",
        description: "Dedicated account manager",
        included: true,
      },
      {
        id: "f4",
        description: "Custom SLA",
        included: true,
      },
      {
        id: "f5",
        description: "Unlimited team members",
        included: true,
      },
      {
        id: "f6",
        description: "White-label portal",
        included: true,
      },
      {
        id: "f7",
        description: "Priority partner matching",
        included: true,
      },
    ],
    status: "active",
    subscriberCount: 2,
    stripePriceId: "price_enterprise_monthly",
  },
];