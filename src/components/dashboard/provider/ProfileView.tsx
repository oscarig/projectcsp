import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ProfileData } from "@/types/profile";
import { ProfileOverviewCard } from "./profile/ProfileOverviewCard";
import { PersonalInfoCard } from "./profile/PersonalInfoCard";
import { ProfessionalInfoCard } from "./profile/ProfessionalInfoCard";
import { PreferencesCard } from "./profile/PreferencesCard";
import { SecurityCard } from "./profile/SecurityCard";
import { ChangePasswordDialog } from "./profile/ChangePasswordDialog";

export function ProfileView() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Michael",
    lastName: "Chen",
    email: "michael@londoncsp.com",
    phone: "+44 20 7123 4567",
    company: "London CSP",
    position: "Chief Operating Officer",
    bio: "Experienced CSP professional specializing in international company formation and corporate services. Over 10 years in the industry.",
    location: "London, United Kingdom",
    timezone: "Europe/London",
    language: "English",
    avatarUrl: ""
  });

  const [passwordDialog, setPasswordDialog] = useState(false);

  const handleProfileUpdate = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
    // API call would go here
  };

  const handlePasswordChange = (currentPassword: string, newPassword: string) => {
    console.log("Changing password");
    setPasswordDialog(false);
  };

  const getInitials = () => {
    return `${profile.firstName[0]}${profile.lastName[0]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and account preferences
          </p>
        </div>
        <Button onClick={handleSaveProfile}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Overview */}
        <div className="md:col-span-1">
          <ProfileOverviewCard profile={profile} getInitials={getInitials} />
        </div>

        {/* Right Column - Detailed Settings */}
        <div className="md:col-span-2 space-y-6">
          <PersonalInfoCard profile={profile} onUpdate={handleProfileUpdate} />
          <ProfessionalInfoCard profile={profile} onUpdate={handleProfileUpdate} />
          <PreferencesCard profile={profile} onUpdate={handleProfileUpdate} />
          <SecurityCard onPasswordChange={() => setPasswordDialog(true)} />
        </div>
      </div>

      {/* Change Password Dialog */}
      <ChangePasswordDialog
        open={passwordDialog}
        onOpenChange={setPasswordDialog}
        onConfirm={handlePasswordChange}
      />
    </div>
  );
}