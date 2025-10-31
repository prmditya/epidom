"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/lang/i18n-provider";
import { useAlertsCount } from "@/features/dashboard/alerts/hooks/use-alerts-count";
import { dashboardNavigation, type NavSection } from "@/config/navigation.config";

/**
 * Get badge count for a navigation item
 */
function useBadgeCount(badgeKey?: string): number | null {
  const alertsCount = useAlertsCount();

  if (!badgeKey) return null;

  // Map badge keys to their respective counts
  const badgeCounts: Record<string, number> = {
    alerts: alertsCount,
    // Add more badge keys here as needed
  };

  return badgeCounts[badgeKey] ?? null;
}

interface SidebarProps {
  mode?: "desktop" | "mobile";
  navigation?: NavSection[]; // Allow custom navigation
}

/**
 * Sidebar Component
 *
 * Renders navigation links from config following Open/Closed Principle.
 * Navigation items are defined in config/navigation.config.ts
 */
export function Sidebar({ mode = "desktop", navigation = dashboardNavigation }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside
      className={cn(
        mode === "desktop"
          ? "sticky top-[5rem] hidden h-[calc(100vh-5.25rem-1rem)] w-full self-start md:flex"
          : "mt-12 flex h-full md:hidden"
      )}
    >
      <div className="bg-card flex h-full w-full flex-col overflow-y-auto rounded-xl border shadow-sm">
        {mode === "mobile" && (
          <div className="border-b p-3">
            <div className="relative">
              <Search className="text-foreground/70 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder={t("actions.searchPlaceholder")}
                aria-label={t("actions.searchPlaceholder")}
                className="h-9 rounded-full pl-9"
              />
            </div>
          </div>
        )}
        <nav className="flex-1 p-3">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex > 0 ? "mt-4" : ""}>
              {section.title && (
                <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  const label = t(item.labelKey);
                  const Icon = item.icon;
                  const badge = useBadgeCount(item.badgeKey);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
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
                              className="text-muted-foreground text-xs font-medium"
                              aria-label={`${badge} ${item.badgeKey}`}
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
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
