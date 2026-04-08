import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  FileText,
  MapPin,
  Phone,
  Globe,
  Mail,
  CheckCircle2,
  Upload,
  Edit,
  Briefcase,
  DollarSign,
  Clock,
} from "lucide-react";

export function ProfileView() {
  const handleEdit = () => {
    console.log("Edit profile clicked");
    // Navigate to edit mode or open edit modal
  };

  const handleUploadLicense = () => {
    console.log("Upload license clicked");
    // Open email client or file upload dialog
  };

  const companyInfo = {
    legalName: "Singapore CSP Pte Ltd",
    tradingName: "Singapore CSP",
    registrationNumber: "202012345Z",
    yearEstablished: "2010",
    jurisdiction: "Singapore",
    address: "1 Raffles Place, #20-00, Singapore 048616",
    phone: "+65 1234 5678",
    website: "www.singaporecsp.com",
    email: "contact@singaporecsp.com",
  };

  const verification = {
    status: "verified",
    authority: "ACRA",
    expiryDate: "31 Dec 2025",
  };

  const servicesData = {
    primaryJurisdiction: "Singapore",
    services: [
      { name: "Company Formation", enabled: true },
      { name: "Corporate Secretarial (CoSec)", enabled: true },
      { name: "Registered Agent", enabled: true },
      { name: "Annual Filing & Compliance", enabled: true },
      { name: "Director Services", enabled: false },
    ],
  };

  const ratesData = {
    rates: [
      { service: "Company Formation", rate: "$2,500 - $4,000" },
      { service: "CoSec (annual)", rate: "$1,200 - $2,000" },
      { service: "Registered Agent", rate: "$800/year" },
      { service: "Annual Filing", rate: "$500 - $1,000" },
    ],
    availability: {
      status: "accepting",
      statusLabel: "Accepting New Work",
      responseTime: "< 4 hours",
      languages: ["English", "Mandarin", "Malay"],
      timezone: "GMT+8",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information and verification
          </p>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Your registered company details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Legal Name */}
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Legal Name</p>
              <p className="font-medium">{companyInfo.legalName}</p>
            </div>
          </div>

          {/* Trading Name */}
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Trading Name</p>
              <p className="font-medium">{companyInfo.tradingName}</p>
            </div>
          </div>

          {/* Registration Number */}
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Registration Number</p>
              <p className="font-medium font-mono">{companyInfo.registrationNumber}</p>
            </div>
          </div>

          {/* Year Established */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Year Established</p>
              <p className="font-medium">{companyInfo.yearEstablished}</p>
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Jurisdiction</p>
              <p className="font-medium">{companyInfo.jurisdiction}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{companyInfo.address}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{companyInfo.phone}</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Website</p>
              <a 
                href={`https://${companyInfo.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {companyInfo.website}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <a 
                href={`mailto:${companyInfo.email}`}
                className="font-medium text-primary hover:underline"
              >
                {companyInfo.email}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Verification Status
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {verification.status === "verified" ? "Verified" : "Pending"}
            </Badge>
          </CardTitle>
          <CardDescription>
            External verification managed by platform administrators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>
              License verified with <span className="font-semibold">{verification.authority}</span>
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              Expires: {verification.expiryDate}
            </span>
          </div>

          <Button 
            variant="outline" 
            onClick={handleUploadLicense}
            className="w-full sm:w-auto"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Renewed License via Email
          </Button>

          <div className="rounded-lg border border-muted bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              To update your license, please email the renewed document to{" "}
              <a 
                href="mailto:compliance@vetto.com" 
                className="text-primary hover:underline"
              >
                compliance@vetto.com
              </a>
              . Our team will review and update your verification status within 2-3 business days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Services & Jurisdictions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <CardTitle>Services & Jurisdictions</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <CardDescription>
            Your service offerings and jurisdictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Jurisdiction */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Primary Jurisdiction</h3>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{servicesData.primaryJurisdiction}</span>
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Services Offered</h3>
            <div className="space-y-2">
              {servicesData.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <div className={`h-5 w-5 rounded ${service.enabled ? "bg-primary" : "bg-muted"} flex items-center justify-center`}>
                    {service.enabled && <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />}
                  </div>
                  <span className={service.enabled ? "font-medium" : "text-muted-foreground"}>
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rates & Availability */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <CardTitle>Rates & Availability</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
          <CardDescription>
            Your pricing and availability information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Default Rates */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Default Rates (for quotes)</h3>
            <div className="space-y-2">
              {ratesData.rates.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span className="text-sm text-muted-foreground">{item.service}</span>
                  <span className="font-medium">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Availability</h3>
            <div className="space-y-3 rounded-lg border p-4">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium">{ratesData.availability.statusLabel}</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Typical Response Time:</span>
                <span className="font-medium">{ratesData.availability.responseTime}</span>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Languages:</span>
                <span className="font-medium">{ratesData.availability.languages.join(", ")}</span>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Timezone:</span>
                <span className="font-medium">{ratesData.availability.timezone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}