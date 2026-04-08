import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, FileText } from "lucide-react";

interface KYCData {
  license: {
    verified: boolean;
    authority: string;
    expiry: string;
    verifiedDate: string;
  };
  piInsurance: {
    verified: boolean;
    expiry: string;
  };
  cyberInsurance: {
    verified: boolean;
    expiry: string;
  };
  overallStatus: string;
  overallDate: string;
}

interface KYCStatusCardProps {
  kycData: KYCData;
}

export function KYCStatusCard({ kycData }: KYCStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          KYC Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* License */}
        <div className="flex items-start justify-between rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium">License</p>
              <p className="text-sm text-muted-foreground">
                Verified ({kycData.license.authority}) · Expires: {kycData.license.expiry}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("View license document")}
          >
            View Document
          </Button>
        </div>

        {/* PI Insurance */}
        <div className="flex items-start justify-between rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium">Professional Indemnity Insurance</p>
              <p className="text-sm text-muted-foreground">
                Verified · Expires: {kycData.piInsurance.expiry}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("View PI insurance")}
          >
            View Document
          </Button>
        </div>

        {/* Cyber Insurance */}
        <div className="flex items-start justify-between rounded-lg border p-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium">Cyber Insurance</p>
              <p className="text-sm text-muted-foreground">
                Verified · Expires: {kycData.cyberInsurance.expiry}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("View cyber insurance")}
          >
            View Document
          </Button>
        </div>

        {/* Overall Status */}
        <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">
                Overall Status: Verified
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                {kycData.overallDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => console.log("View documents")}>
            <FileText className="mr-2 h-4 w-4" />
            View Documents
          </Button>
          <Button variant="outline" size="sm" onClick={() => console.log("Re-verify")}>
            Re-verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}