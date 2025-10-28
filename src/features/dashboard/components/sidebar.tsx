"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserRound,
  Boxes,
  PackageSearch,
  Database,
  Bell,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/lang/i18n-provider";
import { useAlertsCount } from "@/hooks/use-alerts-count";

const itemDefs = [
  { href: "/profile", key: "nav.profile", icon: UserRound, showBadge: false },
  {
    href: "/dashboard",
    key: "nav.dashboard",
    icon: LayoutDashboard,
    showBadge: false,
  },
  { href: "/management", key: "nav.management", icon: Boxes, showBadge: false },
  {
    href: "/tracking",
    key: "nav.tracking",
    icon: PackageSearch,
    showBadge: false,
  },
  { href: "/data", key: "nav.data", icon: Database, showBadge: false },
  { href: "/alerts", key: "nav.alerts", icon: Bell, showBadge: true },
] as const;

function isMobile(mode: string) {
  return mode === "mobile"
    ? "flex md:hidden h-full mt-12"
    : "hidden md:flex w-full";
}

export function Sidebar({ mode = "desktop" }: { mode?: "desktop" | "mobile" }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const alertsCount = useAlertsCount();

  return (
    <aside className={cn(isMobile(mode))}>
      <div className="flex h-[100%] w-full flex-col overflow-y-auto rounded-xl border bg-card shadow-sm">
        {mode === "mobile" && (
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/70" />
              <Input
                placeholder={t("actions.searchPlaceholder")}
                aria-label={t("actions.searchPlaceholder")}
                className="pl-9 h-9 rounded-full"
              />
            </div>
          </div>
        )}
        <nav className="flex-1 p-3">
          <ul className="space-y-1.5">
            {itemDefs.map(({ href, key, icon: Icon, showBadge }) => {
              const active = pathname === href;
              const label = t(key);
              const badge = showBadge ? alertsCount : null;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                      active
                        ? "bg-muted/60 text-foreground shadow-inner"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="size-4" aria-hidden />
                    <span className="flex items-center gap-1.5">
                      {label}
                      {badge !== null && badge > 0 && (
                        <span
                          className="text-xs font-medium text-muted-foreground"
                          aria-label={`${badge} alerts`}
                        >
                          ({badge})
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-3 text-xs text-muted-foreground">
          {t("sidebar.inventoryProduction")}
        </div>
      </div>
    </aside>
  );
}
