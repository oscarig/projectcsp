import type { UserRole } from "./user";

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
}

export interface ProfileUpdateData {
  full_name?: string;
  avatar_url?: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  bio: string;
  location: string;
  timezone: string;
  language: string;
  avatarUrl: string;
}