import {
  LayoutDashboard,
  UserRound,
  Boxes,
  PackageSearch,
  Database,
  Bell,
  type LucideIcon,
} from "lucide-react";

/**
 * Navigation Configuration
 *
 * Centralized navigation structure following Open/Closed Principle.
 * To add new navigation items, simply add them to this config.
 */

export interface NavItem {
  href: string;
  labelKey: string; // i18n translation key
  icon: LucideIcon;
  showBadge?: boolean;
  badgeKey?: string; // Optional key for badge count (e.g., "alerts")
}

export interface NavSection {
  title?: string; // Optional section title
  items: NavItem[];
}

/**
 * Dashboard navigation items
 */
export const dashboardNavigation: NavSection[] = [
  {
    items: [
      {
        href: "/profile",
        labelKey: "nav.profile",
        icon: UserRound,
        showBadge: false,
      },
      {
        href: "/dashboard",
        labelKey: "nav.dashboard",
        icon: LayoutDashboard,
        showBadge: false,
      },
      {
        href: "/management",
        labelKey: "nav.management",
        icon: Boxes,
        showBadge: false,
      },
      {
        href: "/tracking",
        labelKey: "nav.tracking",
        icon: PackageSearch,
        showBadge: false,
      },
      {
        href: "/data",
        labelKey: "nav.data",
        icon: Database,
        showBadge: false,
      },
      {
        href: "/alerts",
        labelKey: "nav.alerts",
        icon: Bell,
        showBadge: true,
        badgeKey: "alerts",
      },
    ],
  },
];

/**
 * Landing page navigation items
 */
export const landingNavigation: NavItem[] = [
  {
    href: "/",
    labelKey: "nav.home",
    icon: LayoutDashboard, // Placeholder
  },
  {
    href: "/services",
    labelKey: "nav.services",
    icon: Boxes,
  },
  {
    href: "/pricing",
    labelKey: "nav.pricing",
    icon: Database,
  },
  {
    href: "/contact",
    labelKey: "nav.contact",
    icon: UserRound,
  },
];

/**
 * Get all navigation items flattened
 */
export function getAllDashboardNavItems(): NavItem[] {
  return dashboardNavigation.flatMap((section) => section.items);
}
