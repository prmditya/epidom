"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/components/lang/i18n-provider";
import type { UserRow } from "@/mocks";

interface UsersTableProps {
  users: UserRow[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [query, setQuery] = useState("");
  const { t } = useI18n();

  const filteredUsers = users.filter((u) => u.email.toLowerCase().includes(query.toLowerCase()));

  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t("pages.usersList")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("actions.searchByEmail")}
            className="w-full sm:max-w-xs"
          />
          <Button variant="secondary">{t("actions.invite")}</Button>
        </div>
        <div className="-mx-4 overflow-x-auto rounded-md sm:mx-0">
          <div className="min-w-[520px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tables.email")}</TableHead>
                  <TableHead>{t("tables.role")}</TableHead>
                  <TableHead className="text-right">{t("tables.action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="secondary">
                        {t("actions.manage")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
