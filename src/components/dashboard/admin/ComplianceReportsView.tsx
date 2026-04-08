import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Shield, AlertCircle, ExternalLink } from "lucide-react";

export function ComplianceReportsView() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleGenerateReport = (reportType: string) => {
    setIsGenerating(reportType);
    setTimeout(() => {
      console.log(`Generating ${reportType} report...`);
      setIsGenerating(null);
    }, 2000);
  };

  const verificationStats = {
    verifiedPartners: 368,
    totalPartners: 413,
    verificationRate: 89,
    licensesExpiring: 24,
    insuranceExpiring: 18,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate regulatory and compliance reports
          </p>
        </div>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Regulatory Reports</h2>
              <p className="text-sm text-muted-foreground">
                Generate compliance reports for regulatory requirements
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">GDPR Data Export</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Export all personal data for GDPR compliance requests
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">EU Regulation</Badge>
                  <Badge variant="outline">Personal Data</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleGenerateReport("GDPR")}
                disabled={isGenerating === "GDPR"}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating === "GDPR" ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">CCPA Report</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  California Consumer Privacy Act compliance report
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">US California</Badge>
                  <Badge variant="outline">Consumer Privacy</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleGenerateReport("CCPA")}
                disabled={isGenerating === "CCPA"}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating === "CCPA" ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">SAR (Subject Access Request) Report</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate comprehensive user data report for access requests
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Data Rights</Badge>
                  <Badge variant="outline">User Request</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleGenerateReport("SAR")}
                disabled={isGenerating === "SAR"}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating === "SAR" ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Verification Summary</h2>
              <p className="text-sm text-muted-foreground">
                Overview of partner verification status
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Partner Verification Rate</h3>
                <Badge className="bg-green-100 text-green-700 border-green-600">
                  {verificationStats.verificationRate}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verified Partners</span>
                  <span className="font-medium">
                    {verificationStats.verifiedPartners} / {verificationStats.totalPartners}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${verificationStats.verificationRate}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  High verification rate indicates strong compliance
                </p>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Expiring Credentials</h3>
                <Badge variant="outline" className="border-amber-600 text-amber-600">
                  {verificationStats.licensesExpiring + verificationStats.insuranceExpiring} Total
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Licenses expiring in 60 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{verificationStats.licensesExpiring}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Insurance expiring in 60 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{verificationStats.insuranceExpiring}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg mt-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    Proactively contact partners to renew expiring credentials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Compliance Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Generate GDPR reports within 30 days of user requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Review verification queue daily to maintain compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Notify partners 60 days before credential expiration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Maintain audit logs for at least 7 years for regulatory purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Perform quarterly compliance audits to ensure ongoing adherence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}