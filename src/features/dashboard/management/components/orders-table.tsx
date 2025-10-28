"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import type { Order } from "@/mocks";

interface OrdersTableProps {
  orders: Order[];
  selectedOrder: Order | null;
  onOrderSelect: (order: Order) => void;
}

export function OrdersTable({ orders, selectedOrder, onOrderSelect }: OrdersTableProps) {
  const { t } = useI18n();

  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg lg:col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t("pages.ordersSectionTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input placeholder={t("actions.searchPlaceholder")} className="w-full sm:max-w-sm" />
          <Button variant="secondary">{t("actions.filter")}</Button>
        </div>
        <div className="-mx-4 overflow-x-auto rounded-md sm:mx-0">
          <div className="min-w-[560px] px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tables.name")}</TableHead>
                  <TableHead>{t("tables.date")}</TableHead>
                  <TableHead>{t("tables.status")}</TableHead>
                  <TableHead className="text-right">{t("tables.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.id} onClick={() => onOrderSelect(o)} className="cursor-pointer">
                    <TableCell className="font-medium">{o.name}</TableCell>
                    <TableCell>{o.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-primary text-sm underline underline-offset-4">
                        {t("actions.details")}
                      </button>
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
