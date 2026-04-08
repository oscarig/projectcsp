import { ProfileData } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Building2,
  MapPin,
  Calendar,
  Upload,
  Shield
} from "lucide-react";

interface ProfileOverviewCardProps {
  profile: ProfileData;
  getInitials: () => string;
}

export function ProfileOverviewCard({ profile, getInitials }: ProfileOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>

        <Separator />

        {/* Quick Info */}
        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-muted-foreground">{profile.position}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{profile.company}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{profile.location}</span>
          </div>
        </div>

        <Separator />

        {/* Role & Permissions */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Role & Permissions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Admin</Badge>
            <Badge variant="secondary">Full Access</Badge>
          </div>
        </div>

        {/* Member Since */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Member Since</span>
          </div>
          <p className="text-sm text-muted-foreground">January 15, 2023</p>
        </div>
      </CardContent>
    </Card>
  );
}