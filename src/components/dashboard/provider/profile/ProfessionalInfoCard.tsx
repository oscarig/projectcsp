import { ProfileData } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfessionalInfoCardProps {
  profile: ProfileData;
  onUpdate: (field: keyof ProfileData, value: string) => void;
}

export function ProfessionalInfoCard({ profile, onUpdate }: ProfessionalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => onUpdate("company", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={profile.position}
              onChange={(e) => onUpdate("position", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={profile.location}
            onChange={(e) => onUpdate("location", e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </CardContent>
    </Card>
  );
}