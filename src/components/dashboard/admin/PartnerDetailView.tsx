import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake } from "lucide-react";
import { CompanyInfoCard } from "./partner-detail/CompanyInfoCard";
import { PrimaryContactCard } from "./partner-detail/PrimaryContactCard";
import { SubscriptionCard } from "./partner-detail/SubscriptionCard";
import { PromotedListingsCard } from "./partner-detail/PromotedListingsCard";
import { KYCStatusCard } from "./partner-detail/KYCStatusCard";
import { StatisticsCard } from "./partner-detail/StatisticsCard";
import { DangerZoneCard } from "./partner-detail/DangerZoneCard";

interface PartnerDetailViewProps {
  partnerId: string;
}

interface PromotedListing {
  id: string;
  jurisdiction: string;
  status: "active" | "paused";
  price: number;
}

export function PartnerDetailView({ partnerId }: PartnerDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    legalName: "Singapore CSP Pte Ltd",
    tradingName: "Singapore CSP",
    registrationNumber: "202012345Z",
    jurisdiction: "Singapore",
    address: "1 Raffles Place, #20-00, Singapore 048616",
    phone: "+65 1234 5678",
    website: "www.singaporecsp.com",
    contactName: "Sarah Lee",
    contactEmail: "sarah@singaporecsp.com",
    contactPhone: "+65 1234 5679",
    plan: "Basic Partner",
  });

  const [promotedListings, setPromotedListings] = useState<PromotedListing[]>([
    {
      id: "1",
      jurisdiction: "Singapore",
      status: "active",
      price: 200,
    },
  ]);

  const mockPartnerData = {
    id: partnerId,
    company: "Singapore CSP",
    status: "verified",
    since: "20 Jan 2024",
    nextBilling: "20 May 2024",
    kyc: {
      license: {
        verified: true,
        authority: "ACRA",
        expiry: "31 Dec 2025",
        verifiedDate: "15 Jan 2024",
      },
      piInsurance: {
        verified: true,
        expiry: "30 Jun 2025",
      },
      cyberInsurance: {
        verified: true,
        expiry: "30 Jun 2025",
      },
      overallStatus: "verified",
      overallDate: "15 Jan 2024",
    },
    stats: {
      completedEngagements: 124,
      activeEngagements: 3,
      avgRating: 4.9,
      connectedCSPs: 8,
    },
  };

  const handleSave = () => {
    console.log("Saving partner data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddPromotedListing = (jurisdiction: string) => {
    const newListing: PromotedListing = {
      id: Date.now().toString(),
      jurisdiction,
      status: "active",
      price: 200,
    };
    setPromotedListings([...promotedListings, newListing]);
    console.log("Adding promoted listing:", newListing);
  };

  const handleRemovePromotedListing = (id: string) => {
    setPromotedListings(promotedListings.filter((l) => l.id !== id));
    console.log("Removing promoted listing:", id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/admin/users/partners"
            className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partner Management
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <Handshake className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                {isEditing ? "Edit Partner" : formData.tradingName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Partner ID: {partnerId}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Edit Partner
            </Button>
          )}
        </div>
      </div>

      {/* Company Information */}
      <CompanyInfoCard
        formData={formData}
        isEditing={isEditing}
        onChange={handleFieldChange}
      />

      {/* Primary Contact */}
      <PrimaryContactCard
        formData={formData}
        isEditing={isEditing}
        onChange={handleFieldChange}
      />

      {/* Subscription */}
      {!isEditing && (
        <SubscriptionCard
          plan={formData.plan}
          status="Active"
          since={mockPartnerData.since}
          nextBilling={mockPartnerData.nextBilling}
        />
      )}

      {/* Promoted Listings */}
      {!isEditing && (
        <PromotedListingsCard
          listings={promotedListings}
          onAdd={handleAddPromotedListing}
          onRemove={handleRemovePromotedListing}
        />
      )}

      {/* KYC Status */}
      {!isEditing && <KYCStatusCard kycData={mockPartnerData.kyc} />}

      {/* Statistics */}
      {!isEditing && <StatisticsCard stats={mockPartnerData.stats} />}

      {/* Danger Zone */}
      {!isEditing && <DangerZoneCard />}
    </div>
  );
}