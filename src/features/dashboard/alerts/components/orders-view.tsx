"use client";

import { useI18n } from "@/components/lang/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ORDERS_SUPPLIERS, MOCK_SUPPLIERS, MOCK_MATERIALS } from "@/mocks";
import { Phone, Mail, MapPin, Package } from "lucide-react";

export function OrdersView() {
  const { t } = useI18n();

  return (
    <section className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {ORDERS_SUPPLIERS.map((orderSupplier, idx) => {
          // Find full supplier details from MOCK_SUPPLIERS
          const supplier = MOCK_SUPPLIERS.find((s) => s.name === orderSupplier.name);

          return (
            <Card key={idx} className="transition-shadow hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="from-primary/20 to-primary/10 text-primary bg-gradient-to-br text-lg font-bold">
                      {orderSupplier.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="truncate text-lg">{orderSupplier.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {orderSupplier.items.length}{" "}
                      {orderSupplier.items.length === 1 ? t("alerts.item") : t("alerts.items")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    {t("alerts.contactInfo")}
                  </h3>

                  {/* Phone */}
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Phone className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-sm">
                        {supplier?.phone || orderSupplier.contactLabel}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2"
                      onClick={() =>
                        window.open(`tel:${supplier?.phone || orderSupplier.contactLabel}`, "_self")
                      }
                    >
                      {t("alerts.actions.callSupplier")}
                    </Button>
                  </div>

                  {/* Email */}
                  {supplier?.email && (
                    <div className="flex items-center justify-between">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <Mail className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                        <span className="truncate text-sm">{supplier.email}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2"
                        onClick={() => window.open(`mailto:${supplier.email}`, "_blank")}
                      >
                        {t("alerts.actions.emailSupplier")}
                      </Button>
                    </div>
                  )}

                  {/* Address */}
                  {supplier?.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {supplier.address}, {supplier.city}, {supplier.country}
                      </span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Materials to Order */}
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Package className="h-4 w-4" />
                    {t("alerts.materialsToOrder")}
                  </h3>

                  <div className="space-y-2">
                    {orderSupplier.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="bg-muted/50 space-y-1 rounded-md p-3">
                        <p className="text-sm font-medium">{item.product}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">{t("alerts.current")}:</span>
                            <span className="ml-1 font-semibold text-red-600">{item.current}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{t("alerts.required")}:</span>
                            <span className="ml-1 font-semibold text-green-600">
                              {item.required}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{t("alerts.toOrder")}:</span>
                            <span className="ml-1 font-semibold text-orange-600">
                              {item.toOrder}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {ORDERS_SUPPLIERS.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">{t("alerts.noOrdersToPlace")}</h3>
            <p className="text-muted-foreground text-sm">{t("alerts.noOrdersDescription")}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
