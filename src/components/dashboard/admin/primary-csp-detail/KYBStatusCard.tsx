import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText } from "lucide-react";

interface KYBStatusCardProps {
  kycStatus: any;
  isEditing: boolean;
}

export function KYBStatusCard({ kycStatus, isEditing }: KYBStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <div className="font-medium">Company Registration</div>
                <div className="text-xs text-muted-foreground">
                  Verified · {kycStatus.companyRegistration.date}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Document
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <div className="font-medium">Director ID</div>
                <div className="text-xs text-muted-foreground">
                  Verified · {kycStatus.directorId.date}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Document
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <div className="font-medium">Proof of Address</div>
                <div className="text-xs text-muted-foreground">
                  Verified · {kycStatus.proofOfAddress.date}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Document
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            <div>
              <div className="font-semibold">Overall Status: Verified</div>
              <div className="text-sm text-muted-foreground">{kycStatus.overallDate}</div>
            </div>
          </div>
        </div>
        {!isEditing && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => console.log("Re-verify")}>
              Re-verify
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 dark:text-red-400"
              onClick={() => console.log("Mark as unverified")}
            >
              Mark as Unverified
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}