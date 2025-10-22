"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
    createdAt: Date;
  };
  subscription?: {
    plan: string;
    status: string;
  } | null;
}

export function ProfileHeader({ user, subscription }: ProfileHeaderProps) {
  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email[0].toUpperCase();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "CANCELED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "PAST_DUE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPlanBadge = (plan?: string) => {
    switch (plan) {
      case "PRO":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "ENTERPRISE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24 ring-4 ring-primary/10">
            <AvatarImage src={user.image || undefined} alt={user.name || user.email} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
              {subscription && (
                <div className="flex gap-2">
                  <Badge className={getPlanBadge(subscription.plan)}>
                    {subscription.plan}
                  </Badge>
                  <Badge className={getStatusColor(subscription.status)}>
                    {subscription.status}
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
