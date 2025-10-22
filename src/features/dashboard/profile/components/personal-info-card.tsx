"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditPersonalInfoDialog } from "./edit-personal-info-dialog";
import { useI18n } from "@/components/lang/i18n-provider";

interface PersonalInfoCardProps {
  user: {
    id: string;
    name?: string | null;
    email: string;
    phone?: string | null;
    locale: string;
    timezone: string;
    currency: string;
  };
  onUpdate: () => void;
}

export function PersonalInfoCard({ user, onUpdate }: PersonalInfoCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const { t } = useI18n();

  const infoItems = [
    { label: t("auth.name"), value: user.name || "—" },
    { label: t("auth.email"), value: user.email },
    { label: "Phone", value: user.phone || "—" },
    { label: "Language", value: user.locale.toUpperCase() },
    { label: "Timezone", value: user.timezone },
    { label: "Currency", value: user.currency },
  ];

  return (
    <>
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-base font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditPersonalInfoDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        user={user}
        onUpdate={onUpdate}
      />
    </>
  );
}
