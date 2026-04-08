type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";
type SubscriptionPlan = "starter" | "professional" | "enterprise";

export interface PrimaryCSPSubscription {
  id: string;
  cspId: string;
  companyName: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  nextBillingDate: string;
  amount: number;
  startDate: string;
}

export const mockSubscriptions: PrimaryCSPSubscription[] = [
  {
    id: "sub_001",
    cspId: "001",
    companyName: "Cayman Islands Services Ltd",
    plan: "enterprise",
    status: "active",
    nextBillingDate: "15 May 24",
    amount: 500,
    startDate: "15 Jan 24",
  },
  {
    id: "sub_002",
    cspId: "002",
    companyName: "BVI Corporate Solutions",
    plan: "professional",
    status: "active",
    nextBillingDate: "20 May 24",
    amount: 299,
    startDate: "20 Feb 24",
  },
  {
    id: "sub_003",
    cspId: "003",
    companyName: "Singapore Fiduciary Services",
    plan: "professional",
    status: "active",
    nextBillingDate: "22 May 24",
    amount: 299,
    startDate: "22 Jan 24",
  },
  {
    id: "sub_004",
    cspId: "004",
    companyName: "Hong Kong Trust Co",
    plan: "enterprise",
    status: "active",
    nextBillingDate: "25 May 24",
    amount: 500,
    startDate: "25 Dec 23",
  },
  {
    id: "sub_005",
    cspId: "005",
    companyName: "Malta Corporate Services",
    plan: "starter",
    status: "trialing",
    nextBillingDate: "28 May 24",
    amount: 149,
    startDate: "14 Apr 24",
  },
  {
    id: "sub_006",
    cspId: "006",
    companyName: "Luxembourg Fiduciary",
    plan: "professional",
    status: "active",
    nextBillingDate: "01 Jun 24",
    amount: 299,
    startDate: "01 Mar 24",
  },
  {
    id: "sub_007",
    cspId: "007",
    companyName: "Dubai Financial Services",
    plan: "enterprise",
    status: "past_due",
    nextBillingDate: "10 May 24",
    amount: 500,
    startDate: "10 Jan 24",
  },
  {
    id: "sub_008",
    cspId: "008",
    companyName: "Seychelles Corporate",
    plan: "starter",
    status: "active",
    nextBillingDate: "05 Jun 24",
    amount: 149,
    startDate: "05 Apr 24",
  },
  {
    id: "sub_009",
    cspId: "009",
    companyName: "Isle of Man Trust Services",
    plan: "professional",
    status: "active",
    nextBillingDate: "12 May 24",
    amount: 299,
    startDate: "12 Feb 24",
  },
  {
    id: "sub_010",
    cspId: "010",
    companyName: "Jersey Fiduciary Ltd",
    plan: "enterprise",
    status: "active",
    nextBillingDate: "18 May 24",
    amount: 500,
    startDate: "18 Dec 23",
  },
];