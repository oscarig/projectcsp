type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";
type SubscriptionPlan = "free" | "basic" | "premium";

export interface PartnerSubscription {
  id: string;
  partnerId: string;
  partnerName: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  nextBillingDate: string;
  amount: number;
  startDate: string;
}

export const mockSubscriptions: PartnerSubscription[] = [
  {
    id: "sub_p001",
    partnerId: "001",
    partnerName: "Singapore CSP",
    plan: "basic",
    status: "active",
    nextBillingDate: "20 May 24",
    amount: 50,
    startDate: "20 Jan 24",
  },
  {
    id: "sub_p002",
    partnerId: "002",
    partnerName: "BVI Trust Services",
    plan: "basic",
    status: "active",
    nextBillingDate: "22 May 24",
    amount: 50,
    startDate: "22 Feb 24",
  },
  {
    id: "sub_p003",
    partnerId: "003",
    partnerName: "Cayman Fund Services",
    plan: "premium",
    status: "active",
    nextBillingDate: "25 May 24",
    amount: 100,
    startDate: "25 Jan 24",
  },
  {
    id: "sub_p004",
    partnerId: "004",
    partnerName: "Malta CSP",
    plan: "basic",
    status: "past_due",
    nextBillingDate: "15 May 24",
    amount: 50,
    startDate: "15 Mar 24",
  },
  {
    id: "sub_p005",
    partnerId: "005",
    partnerName: "Luxembourg Trust",
    plan: "premium",
    status: "active",
    nextBillingDate: "18 May 24",
    amount: 100,
    startDate: "18 Feb 24",
  },
  {
    id: "sub_p006",
    partnerId: "006",
    partnerName: "Seychelles Corp",
    plan: "basic",
    status: "trialing",
    nextBillingDate: "30 May 24",
    amount: 50,
    startDate: "16 Apr 24",
  },
  {
    id: "sub_p007",
    partnerId: "007",
    partnerName: "Mauritius Services",
    plan: "basic",
    status: "active",
    nextBillingDate: "28 May 24",
    amount: 50,
    startDate: "28 Mar 24",
  },
  {
    id: "sub_p008",
    partnerId: "008",
    partnerName: "Dubai Partners",
    plan: "premium",
    status: "active",
    nextBillingDate: "05 Jun 24",
    amount: 100,
    startDate: "05 Apr 24",
  },
  {
    id: "sub_p009",
    partnerId: "009",
    partnerName: "Gibraltar Legal",
    plan: "basic",
    status: "trialing",
    nextBillingDate: "27 May 24",
    amount: 50,
    startDate: "13 Apr 24",
  },
  {
    id: "sub_p010",
    partnerId: "010",
    partnerName: "Isle of Man Trust",
    plan: "premium",
    status: "active",
    nextBillingDate: "12 May 24",
    amount: 100,
    startDate: "12 Feb 24",
  },
  {
    id: "sub_p011",
    partnerId: "011",
    partnerName: "Jersey Financial",
    plan: "basic",
    status: "trialing",
    nextBillingDate: "29 May 24",
    amount: 50,
    startDate: "15 Apr 24",
  },
  {
    id: "sub_p012",
    partnerId: "012",
    partnerName: "Guernsey Services",
    plan: "basic",
    status: "active",
    nextBillingDate: "08 Jun 24",
    amount: 50,
    startDate: "08 May 24",
  },
];