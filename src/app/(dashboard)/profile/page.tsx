"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth-client";
import { ProfileHeader } from "@/features/dashboard/profile/components/profile-header";
import { PersonalInfoCard } from "@/features/dashboard/profile/components/personal-info-card";
import { BusinessInfoCard } from "@/features/dashboard/profile/components/business-info-card";
import { SubscriptionInfoCard } from "@/features/dashboard/profile/components/subscription-info-card";

interface ProfileData {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    phone: string | null;
    locale: string;
    timezone: string;
    currency: string;
    createdAt: Date;
  };
  business?: {
    id: string;
    name: string;
    address: string | null;
    city: string | null;
    country: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
  } | null;
  subscription?: {
    plan: string;
    status: string;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export default function ProfilePage() {
  const { user: sessionUser, loading: sessionLoading } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading && sessionUser) {
      fetchProfileData();
    }
  }, [sessionLoading, sessionUser]);

  if (sessionLoading || loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!sessionUser || !profileData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <ProfileHeader
        user={profileData.user}
        subscription={profileData.subscription}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalInfoCard user={profileData.user} onUpdate={fetchProfileData} />
        <SubscriptionInfoCard subscription={profileData.subscription} />
      </div>

      <BusinessInfoCard
        business={profileData.business}
        userId={profileData.user.id}
        onUpdate={fetchProfileData}
      />
    </div>
  );
}
