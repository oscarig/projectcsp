import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  CheckCircle2,
  Circle,
  Star,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Building2,
  Shield,
  TrendingUp,
  Mail,
} from "lucide-react";

export function DirectoryView() {
  const [visibilityStatus, setVisibilityStatus] = useState<"public" | "paused" | "private">("public");
  const [discoveryPreference, setDiscoveryPreference] = useState<"direct" | "approval">("approval");
  const [visibilityControls, setVisibilityControls] = useState({
    companyName: true,
    jurisdictions: true,
    services: true,
    verificationBadges: true,
    performanceMetrics: true,
    contactEmail: false,
  });

  const handleSave = () => {
    console.log("Save visibility settings", {
      visibilityStatus,
      discoveryPreference,
      visibilityControls,
    });
  };

  const handleOptOut = () => {
    setVisibilityStatus("private");
    console.log("Opted out of directory");
  };

  const handlePauseDiscovery = () => {
    setVisibilityStatus("paused");
    console.log("Paused directory discovery");
  };

  const handleRefresh = () => {
    console.log("Refresh profile preview");
  };

  const toggleVisibilityControl = (key: keyof typeof visibilityControls) => {
    setVisibilityControls((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const profileViews = 24;
  const rating = 4.9;
  const totalEngagements = 24;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Directory & Visibility</h1>
          <p className="text-muted-foreground">
            Control how you appear in the partner directory
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      {/* Current Visibility Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Visibility</CardTitle>
          <CardDescription>
            Manage your profile visibility and discovery settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${
                  visibilityStatus === "public" ? "bg-green-500" :
                  visibilityStatus === "paused" ? "bg-yellow-500" :
                  "bg-gray-500"
                }`} />
                <span className="font-medium">
                  {visibilityStatus === "public" && "Public (Discoverable by all Primary CSPs)"}
                  {visibilityStatus === "paused" && "Paused (Not accepting new connections)"}
                  {visibilityStatus === "private" && "Private (Not visible in directory)"}
                </span>
              </div>
            </div>

            {/* Profile Views */}
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Profile Views (Last 30 Days):</span>
              <span className="font-medium">{profileViews}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOptOut}
              disabled={visibilityStatus === "private"}
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Opt Out
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePauseDiscovery}
              disabled={visibilityStatus === "paused"}
            >
              <Clock className="mr-2 h-4 w-4" />
              Pause Discovery
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>
                What Primary CSPs see when browsing the directory
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Preview Card */}
          <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
            {/* Company Name */}
            {visibilityControls.companyName && (
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-lg">
                  S
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">SINGAPORE CSP PTE LTD</h3>
                  
                  {/* Performance Metrics */}
                  {visibilityControls.performanceMetrics && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({totalEngagements} engagements)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {/* Verification Badge */}
              {visibilityControls.verificationBadges && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>License verified (ACRA)</span>
                </div>
              )}

              {/* Jurisdictions */}
              {visibilityControls.jurisdictions && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Jurisdictions:</span>
                  <span>Singapore</span>
                </div>
              )}

              {/* Services */}
              {visibilityControls.services && (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Services:</span>
                  <span>Formation, CoSec, Registered Agent</span>
                </div>
              )}

              {/* Performance Metrics - Response Time & Member Since */}
              {visibilityControls.performanceMetrics && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Avg response:</span>
                    <span>&lt;4 hrs</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Member since:</span>
                    <span>Jan 2024</span>
                  </div>
                </div>
              )}

              {/* Contact Email */}
              {visibilityControls.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href="mailto:contact@singaporecsp.com"
                    className="text-primary hover:underline"
                  >
                    contact@singaporecsp.com
                  </a>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Visibility Controls
          </CardTitle>
          <CardDescription>
            Choose what information is visible in your directory profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries({
              companyName: "Company Name",
              jurisdictions: "Jurisdictions",
              services: "Services",
              verificationBadges: "Verification badges",
              performanceMetrics: "Performance metrics",
              contactEmail: "Contact email",
            }).map(([key, label]) => {
              const isEnabled = visibilityControls[key as keyof typeof visibilityControls];
              return (
                <button
                  key={key}
                  onClick={() => toggleVisibilityControl(key as keyof typeof visibilityControls)}
                  className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className={`flex h-5 w-5 items-center justify-center rounded ${
                    isEnabled ? "bg-primary" : "bg-muted"
                  }`}>
                    {isEnabled && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                    )}
                  </div>
                  <span className={isEnabled ? "font-medium" : "text-muted-foreground"}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Discovery Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Discovery Preferences
          </CardTitle>
          <CardDescription>
            Control how Primary CSPs can connect with you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={discoveryPreference}
            onValueChange={(value) => setDiscoveryPreference(value as "direct" | "approval")}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="direct" id="direct" />
              <Label htmlFor="direct" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">Any Primary CSP can connect directly</p>
                  <p className="text-sm text-muted-foreground">
                    CSPs can send engagement requests without prior approval
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="approval" id="approval" />
              <Label htmlFor="approval" className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">Require my approval for new connections</p>
                  <p className="text-sm text-muted-foreground">
                    CSPs must request to connect before sending engagements
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}