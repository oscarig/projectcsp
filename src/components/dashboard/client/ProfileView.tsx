import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Bell, Shield, Edit, Lock, Smartphone } from "lucide-react";

export function ProfileView() {
  const [notifications, setNotifications] = useState({
    statusChanges: true,
    documentsRequested: true,
    documentsReceived: true,
    smsNotifications: false,
  });

  const profileData = {
    personal: {
      name: "John Smith",
      email: "john@techinnovators.com",
      phone: "+44 20 1234 5678",
      company: "Tech Innovators Ltd",
    },
    company: {
      companyName: "Tech Innovators Ltd",
      registrationNumber: "12345678",
      registeredAddress: "123 Tech Street, London, UK",
      vatNumber: "GB123456789",
    },
    security: {
      lastLogin: "15 Apr 2024 09:30 AM",
      lastLoginIp: "192.168.1.1",
      twoFactorEnabled: false,
    },
  };

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  const handleChangePassword = () => {
    console.log("Change password");
  };

  const handleEnableTwoFactor = () => {
    console.log("Enable two-factor authentication");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
        <Button onClick={handleEditProfile}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>Your basic account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <p className="text-sm font-medium">{profileData.personal.name}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <p className="text-sm font-medium">{profileData.personal.email}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <p className="text-sm font-medium">{profileData.personal.phone}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Company</Label>
              <p className="text-sm font-medium">{profileData.personal.company}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Company Information</CardTitle>
          </div>
          <CardDescription>Your company registration details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Company Name</Label>
              <p className="text-sm font-medium">{profileData.company.companyName}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Registration Number</Label>
              <p className="text-sm font-medium">{profileData.company.registrationNumber}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs text-muted-foreground">Registered Address</Label>
              <p className="text-sm font-medium">{profileData.company.registeredAddress}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">VAT Number</Label>
              <p className="text-sm font-medium">{profileData.company.vatNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status-changes" className="text-sm font-medium">
                  Engagement status changes
                </Label>
                <p className="text-xs text-muted-foreground">
                  Email me when engagement status changes
                </p>
              </div>
              <Switch
                id="status-changes"
                checked={notifications.statusChanges}
                onCheckedChange={() => handleNotificationChange("statusChanges")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="docs-requested" className="text-sm font-medium">
                  Documents requested
                </Label>
                <p className="text-xs text-muted-foreground">
                  Email me when documents are requested
                </p>
              </div>
              <Switch
                id="docs-requested"
                checked={notifications.documentsRequested}
                onCheckedChange={() => handleNotificationChange("documentsRequested")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="docs-received" className="text-sm font-medium">
                  Documents received
                </Label>
                <p className="text-xs text-muted-foreground">
                  Email me when documents are received
                </p>
              </div>
              <Switch
                id="docs-received"
                checked={notifications.documentsReceived}
                onCheckedChange={() => handleNotificationChange("documentsReceived")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications" className="text-sm font-medium">
                  SMS notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive SMS notifications (optional)
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.smsNotifications}
                onCheckedChange={() => handleNotificationChange("smsNotifications")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Password</Label>
              <p className="text-xs text-muted-foreground">••••••••••••</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleChangePassword}>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Two-Factor Authentication</Label>
              <p className="text-xs text-muted-foreground">
                {profileData.security.twoFactorEnabled
                  ? "Two-factor authentication is enabled"
                  : "Add an extra layer of security to your account"}
              </p>
            </div>
            <Button
              variant={profileData.security.twoFactorEnabled ? "outline" : "default"}
              size="sm"
              onClick={handleEnableTwoFactor}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              {profileData.security.twoFactorEnabled ? "Manage" : "Enable"}
            </Button>
          </div>
          <Separator />
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Last Login</Label>
            <p className="text-xs text-muted-foreground">
              {profileData.security.lastLogin} from {profileData.security.lastLoginIp}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}