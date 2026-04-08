import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Save } from "lucide-react";
import { CompanyInfoCard } from "./primary-csp-detail/CompanyInfoCard";
import { PrimaryContactCard } from "./primary-csp-detail/PrimaryContactCard";
import { SubscriptionCard } from "./primary-csp-detail/SubscriptionCard";
import { KYBStatusCard } from "./primary-csp-detail/KYBStatusCard";
import { StatisticsCard } from "./primary-csp-detail/StatisticsCard";
import { DangerZoneCard } from "./primary-csp-detail/DangerZoneCard";

interface PrimaryCSPDetailViewProps {
  cspId: string;
}

const mockCSPData = {
  id: "001",
  legalName: "London CSP LLP",
  tradingName: "London CSP",
  registrationNumber: "12345678",
  jurisdiction: "United Kingdom",
  address: "123 Fleet Street, London EC4Y 8AU",
  phone: "+44 20 1234 5678",
  website: "www.londoncsp.com",
  contactName: "Michael Chen",
  contactEmail: "michael@londoncsp.com",
  contactPhone: "+44 20 1234 5679",
  plan: "professional",
  status: "active",
  since: "15 Jan 2024",
  nextBilling: "15 May 2024",
  mrr: 1000,
  kycStatus: {
    companyRegistration: { verified: true, date: "15 Jan 2024" },
    directorId: { verified: true, date: "15 Jan 2024" },
    proofOfAddress: { verified: true, date: "15 Jan 2024" },
    overallStatus: "verified",
    overallDate: "15 Jan 2024",
  },
  statistics: {
    engagements: { total: 124, active: 24 },
    partners: 18,
    clients: 47,
    lifetimeRevenue: 12400,
  },
};

export function PrimaryCSPDetailView({ cspId }: PrimaryCSPDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockCSPData);

  const handleSave = () => {
    console.log("Saving CSP data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Link
            href="/dashboard/admin/users/primary-csps"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Primary CSP Management
          </Link>
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isEditing ? "Edit Primary CSP" : formData.tradingName}
            </h1>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
            Edit CSP
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Company Information */}
      <CompanyInfoCard
        formData={formData}
        isEditing={isEditing}
        onFormDataChange={setFormData}
      />

      {/* Primary Contact */}
      <PrimaryContactCard
        formData={formData}
        isEditing={isEditing}
        onFormDataChange={setFormData}
      />

      {/* Subscription */}
      <SubscriptionCard
        formData={formData}
        isEditing={isEditing}
        onFormDataChange={setFormData}
      />

      {/* KYB Status */}
      <KYBStatusCard kycStatus={formData.kycStatus} isEditing={isEditing} />

      {/* Statistics */}
      <StatisticsCard statistics={formData.statistics} />

      {/* Danger Zone */}
      {!isEditing && <DangerZoneCard />}
    </div>
  );
}