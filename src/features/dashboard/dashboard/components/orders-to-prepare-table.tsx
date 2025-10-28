"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang/i18n-provider";
import type { Order } from "@/mocks";

interface OrdersToPrepareTableProps {
  orders: Order[];
}

export default function OrdersToPrepareTable({ orders }: OrdersToPrepareTableProps) {
  const { t } = useI18n();
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{t("pages.ordersToPrepare")}</CardTitle>
      </CardHeader>
      <CardContent className="-mx-4 overflow-x-auto sm:mx-0">
        <div className="min-w-[600px] px-4 sm:px-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">{t("tables.order")}</TableHead>
                <TableHead className="font-semibold">{t("tables.date")}</TableHead>
                <TableHead className="font-semibold">{t("tables.status")}</TableHead>
                <TableHead className="text-right font-semibold">{t("tables.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-4 transition-colors">
                      {t("actions.view")}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
