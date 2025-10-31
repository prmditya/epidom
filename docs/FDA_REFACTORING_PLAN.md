# Feature Driven Architecture (FDA) Refactoring Plan

**Document Version:** 1.0
**Created:** 2025-10-31
**Status:** 🟡 In Progress
**Overall FDA Compliance:** 7.5/10

---

## Executive Summary

This document provides a comprehensive plan for refactoring the Epidom Dashboard codebase to fully comply with Feature Driven Architecture (FDA) principles as defined in `CLAUDE.md`.

### Key Findings

✅ **What's Working:**
- All components properly use shadcn/ui (no raw HTML elements)
- Recent migration to `shared/` folders for cross-feature components
- Page-specific component organization mostly correct
- No dead/unused code detected

❌ **What Needs Fixing:**
- 7 structural violations identified
- 1 duplicate component (Add Material Dialog)
- 2 pages too thick (alerts: 103 lines, tracking-view: 428 lines)
- Services components misplaced in `shared/` instead of page-specific folder
- Git deleted files need staging

### Effort Estimate

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| Phase 1: Quick Wins | Git commits, move files, delete duplicates | 1 hour | 🔴 High |
| Phase 2: Page Refactoring | Extract alerts-view, profile types | 1 hour | 🔴 High |
| Phase 3: Major Refactor | Split tracking-view into 3 components | 3-4 hours | 🟡 Medium |
| **Total** | | **5-6 hours** | |

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Issues Identified](#2-issues-identified)
3. [Priority-Based Action Plan](#3-priority-based-action-plan)
4. [Detailed Refactoring Steps](#4-detailed-refactoring-steps)
5. [Files Checklist](#5-files-checklist)
6. [Testing Checklist](#6-testing-checklist)
7. [Additional Findings](#7-additional-findings)
8. [FDA Compliance Scorecard](#8-fda-compliance-scorecard)

---

## 1. Current State Analysis

### 1.1 Folder Structure Review

#### ✅ Dashboard Structure - Mostly Compliant

```
src/features/dashboard/
├── shared/                    ✅ NEW - Cross-dashboard components
│   ├── page-shell.tsx        ✅ Used by all dashboard pages
│   ├── sidebar.tsx           ✅ Used by all dashboard pages
│   └── topbar.tsx            ✅ Used by all dashboard pages
│
├── alerts/components/         ✅ Page-specific components
│   ├── alerts-table.tsx
│   ├── alert-details-dialog.tsx
│   ├── place-order-dialog.tsx
│   └── orders-view.tsx
│
├── dashboard/components/      ✅ Page-specific components
│   ├── add-material-dialog.tsx    ❌ DUPLICATE (see Issue #4)
│   ├── low-stock-alerts.tsx
│   ├── orders-to-prepare-table.tsx
│   ├── production-status-card.tsx
│   ├── quick-actions.tsx
│   └── stats-cards.tsx
│
├── data/                      ✅ Sub-feature organization
│   ├── materials/components/
│   ├── recipes/components/
│   ├── products/components/
│   └── suppliers/components/
│
├── management/                ✅ Sub-feature organization
│   ├── delivery/
│   ├── edit-stock/
│   ├── production-history/
│   └── recipe-production/
│
├── tracking/components/       ✅ Page-specific components
│   └── tracking-view.tsx      ❌ TOO LARGE (428 lines, see Issue #6)
│
└── profile/components/        ✅ Page-specific components
```

#### ✅ Landing Structure - Recently Improved

```
src/features/landing/
├── shared/                    ✅ NEW - Cross-landing components
│   ├── components/
│   │   ├── site-header.tsx   ✅ Used by all landing pages
│   │   ├── site-footer.tsx   ✅ Used by all landing pages
│   │   ├── cookie-consent-bar.tsx ✅ Used by all landing pages
│   │   ├── waitlist-dialog.tsx ✅ Used by header
│   │   ├── hero.tsx          ✅ Used by home page
│   │   └── countdown.tsx     ✅ Used by home page
│   │
│   └── services/components/   ❌ WRONG LOCATION (see Issue #2)
│       ├── hero-section.tsx
│       ├── dashboard-preview-section.tsx
│       └── ... (7 more files)
│
├── contact/components/        ✅ Page-specific
├── pricing/components/        ✅ Page-specific
└── payments/components/       ✅ Page-specific
```

### 1.2 Component Consistency - Excellent!

**Searched for raw HTML elements:**

| Element | Status | Notes |
|---------|--------|-------|
| `<button>` | ✅ Clean | All use `<Button>` from shadcn/ui |
| `<input>` | ✅ Clean | All use `<Input>` from shadcn/ui |
| `<table>` | ✅ Clean | All use `<Table>` from shadcn/ui |
| `<select>` | ✅ Clean | All use `<Select>` from shadcn/ui |

**Exception:** One raw `<button>` in `site-header.tsx:184` inside `<SheetClose asChild>` wrapper (may be required for Sheet functionality).

### 1.3 Git Status - Unstaged Changes

The following files were deleted from old structure and recreated in `shared/`:

```
Deleted (old structure):
  src/features/dashboard/components/*
  src/features/landing/components/*
  src/features/landing/services/components/*

Untracked (new structure):
  src/features/dashboard/shared/
  src/features/landing/shared/
```

**Action Required:** Stage and commit the new `shared/` folders to complete migration.

---

## 2. Issues Identified

### Issue #1: Git Deleted Files Need Staging
**Priority:** 🔴 High
**Effort:** 5 minutes

**Problem:**
The migration to `shared/` folders is complete but not committed to git. This creates confusion about which structure is current.

**Git Status Shows:**
```
deleted:    src/features/dashboard/components/page-shell.tsx
deleted:    src/features/dashboard/components/sidebar.tsx
deleted:    src/features/dashboard/components/topbar.tsx
deleted:    src/features/landing/components/* (6 files)
deleted:    src/features/landing/services/components/* (9 files)

Untracked:
??  src/features/dashboard/shared/
??  src/features/landing/shared/
```

**Solution:**
```bash
git add src/features/dashboard/shared/
git add src/features/landing/shared/
git add src/features/dashboard/components/  # Stage deletions
git add src/features/landing/components/    # Stage deletions
git commit -m "refactor: migrate shared components to shared/ folder following FDA pattern"
```

---

### Issue #2: Services Components in Wrong Location
**Priority:** 🔴 High
**Effort:** 15 minutes

**Problem:**
All components in `src/features/landing/shared/services/components/` are used ONLY by the `/services` page, not shared across landing pages. This violates FDA principle: "Components used by only ONE page should be page-specific."

**Current (WRONG):**
```
src/features/landing/shared/services/components/
├── hero-section.tsx
├── dashboard-preview-section.tsx
├── management-row-one.tsx
├── management-row-two.tsx
├── tracking-preview-section.tsx
├── data-row-one.tsx
├── data-row-two.tsx
├── alerts-preview-section.tsx
└── safe-image.tsx
```

**Evidence:**
```tsx
// src/app/(landing)/services/page.tsx
// ALL 9 imports come from shared/services - but only used by THIS page!
import { HeroSection } from "@/features/landing/shared/services/components/hero-section";
import { DashboardPreviewSection } from "@/features/landing/shared/services/components/dashboard-preview-section";
// ... 7 more imports
```

**Correct Structure:**
```
src/features/landing/
├── services/
│   └── components/           ← Move ALL here
│       ├── hero-section.tsx
│       ├── dashboard-preview-section.tsx
│       ├── management-row-one.tsx
│       ├── management-row-two.tsx
│       ├── tracking-preview-section.tsx
│       ├── data-row-one.tsx
│       ├── data-row-two.tsx
│       ├── alerts-preview-section.tsx
│       └── safe-image.tsx
│
└── shared/
    └── components/           ← Keep ONLY truly shared
        ├── site-header.tsx   ✅ (all pages)
        ├── site-footer.tsx   ✅ (all pages)
        └── ... (5 more truly shared)
```

**Solution Steps:**
1. Create `src/features/landing/services/components/`
2. Move all 9 files from `shared/services/components/` to `services/components/`
3. Update imports in `src/app/(landing)/services/page.tsx`
4. Delete empty `shared/services/` directory

---

### Issue #3: Alerts Page Too Thick
**Priority:** 🔴 High
**Effort:** 30 minutes

**Problem:**
`src/app/(dashboard)/alerts/page.tsx` is 103 lines. FDA guideline: pages should be ~10-20 lines (thin composition layer only).

**Current Structure:**
```tsx
// src/app/(dashboard)/alerts/page.tsx (103 lines)
export default function AlertsPage() {
  // 📍 State management (25 lines)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // 📍 URL state management (10 lines)
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOrders = searchParams.get("view") === "orders";

  // 📍 Event handlers (30 lines)
  const handleToggle = useCallback(() => { ... });
  const handleViewDetails = (alert: Alert) => { ... };
  const handleCreateOrder = (alert: Alert) => { ... };

  // 📍 JSX (38 lines)
  return ( ... );
}
```

**FDA Violation:**
- Too much state management
- Too many event handlers
- Business logic in page file

**Recommended Structure:**
```tsx
// ✅ src/app/(dashboard)/alerts/page.tsx (4 lines - THIN)
import { AlertsView } from "@/features/dashboard/alerts/components/alerts-view";

export default function AlertsPage() {
  return <AlertsView />;
}
```

```tsx
// ✅ src/features/dashboard/alerts/components/alerts-view.tsx (NEW)
export function AlertsView() {
  // Move ALL state, hooks, handlers, and JSX here
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  // ... rest of current page.tsx logic

  return ( ... );
}
```

**Solution Steps:**
1. Create `src/features/dashboard/alerts/components/alerts-view.tsx`
2. Move all logic from page.tsx to alerts-view.tsx
3. Update page.tsx to only import and render `<AlertsView />`
4. Test alerts functionality

---

### Issue #4: Duplicate Add Material Dialog
**Priority:** 🔴 High
**Effort:** 10 minutes

**Problem:**
Two separate implementations of Add Material Dialog with different validation approaches.

**File 1 (WORSE):** `src/features/dashboard/dashboard/components/add-material-dialog.tsx`
- Manual state management
- Uses `formData` state object
- Manual validation
- Used by: Quick Actions component

**File 2 (BETTER):** `src/features/dashboard/data/materials/components/add-material-dialog.tsx`
- Uses `react-hook-form` + Zod
- Schema-based validation
- More robust
- Used by: Materials Section

**Impact:**
- Inconsistent UX
- Double maintenance burden
- Different validation logic
- Potential bugs from divergent implementations

**Solution:**
1. **Keep:** `src/features/dashboard/data/materials/components/add-material-dialog.tsx` (better implementation)
2. **Delete:** `src/features/dashboard/dashboard/components/add-material-dialog.tsx`
3. **Update Import:** In `quick-actions.tsx`:

```tsx
// Before
import AddMaterialDialog from "./add-material-dialog";

// After
import AddMaterialDialog from "../../data/materials/components/add-material-dialog";
```

---

### Issue #5: Profile Page Borderline Thick
**Priority:** 🟡 Medium
**Effort:** 10 minutes

**Problem:**
`src/app/(dashboard)/profile/page.tsx` is 107 lines, including:
- 40-line TypeScript interface definition
- API fetch logic
- Loading states and error handling

**While not as severe as alerts page, this could be improved.**

**Solution Option A (Conservative):**
Extract only the type definition:

```tsx
// src/features/dashboard/profile/types.ts (NEW)
export interface ProfileData {
  id: string;
  name: string | null;
  email: string;
  // ... (40-line interface)
}
```

**Solution Option B (FDA Strict):**
Extract everything into ProfileView component:

```tsx
// src/app/(dashboard)/profile/page.tsx (4 lines)
import { ProfileView } from "@/features/dashboard/profile/components/profile-view";

export default function ProfilePage() {
  return <ProfileView />;
}
```

**Recommendation:** Start with **Option A** (extract types). If more logic gets added, upgrade to Option B.

---

### Issue #6: TrackingView Extremely Large
**Priority:** 🟡 Medium
**Effort:** 2-3 hours

**Problem:**
`src/features/dashboard/tracking/components/tracking-view.tsx` is **428 lines** - the largest component in the entire codebase. Violates Single Responsibility Principle.

**Current Structure:**
```tsx
export function TrackingView() {
  // 📍 Stock Levels State (8 lines)
  // 📍 Movement History State (10 lines)
  // 📍 Pagination State (5 lines)
  // 📍 Dialog State (5 lines)
  // 📍 Filter Handlers (20 lines)
  // 📍 Selection Handlers (30 lines)
  // 📍 Export Data (20 lines)
  // 📍 JSX - Stock Levels Tab (150 lines)
  // 📍 JSX - Movement History Tab (150 lines)
  // 📍 JSX - Dialogs (30 lines)
}
```

**FDA Violation:**
One component doing the work of 3-4 components.

**Recommended Refactor:**
```
src/features/dashboard/tracking/components/
├── tracking-view.tsx              ← Main container (50 lines max)
│   └── Tabs wrapper + state coordination
│
├── stock-levels-tab.tsx           ← NEW (150 lines)
│   └── Stock table + selection + export logic
│
├── movement-history-tab.tsx       ← NEW (150 lines)
│   └── Movements table + filters + export logic
│
├── tracking-dialogs.tsx           ← NEW (50 lines)
│   └── Restock + History dialogs with state
│
└── [existing files remain]
```

**Solution Steps:**
1. Create `stock-levels-tab.tsx` and extract stock table JSX + state
2. Create `movement-history-tab.tsx` and extract movements table JSX + state
3. Create `tracking-dialogs.tsx` and extract all dialog JSX + state
4. Keep only Tabs wrapper and prop passing in `tracking-view.tsx`
5. Test thoroughly (most complex refactor)

---

### Issue #7: One Raw Button in SiteHeader
**Priority:** 🟢 Low
**Effort:** 15 minutes

**Problem:**
`src/features/landing/shared/components/site-header.tsx:184-200` contains a raw `<button>` element instead of shadcn `<Button>`.

**Code:**
```tsx
<SheetClose asChild>
  <button
    className="hover:bg-muted/50 bg-muted/20 flex h-8 w-8 items-center..."
    aria-label={t("common.nav.closeMenu")}
  >
    <X className="h-4 w-4" />
  </button>
</SheetClose>
```

**Possible Reason:**
The `<SheetClose asChild>` pattern may require a raw button for proper Sheet functionality.

**Solution:**
1. Investigate if `<Button variant="ghost">` can be used with `SheetClose asChild`
2. If yes: Replace with `<Button>`
3. If no: Add comment documenting why raw button is necessary

```tsx
{/* Note: Raw button required by SheetClose asChild pattern */}
<SheetClose asChild>
  <button ...>
```

---

## 3. Priority-Based Action Plan

### 🔴 Phase 1: Quick Wins (1 hour)

**Goal:** Fix critical structural issues with minimal risk.

| Task | File(s) | Time | Complexity |
|------|---------|------|------------|
| 1. Stage shared folders | Git commands | 5 min | Easy |
| 2. Move services components | 9 files + 1 import update | 15 min | Easy |
| 3. Delete duplicate dialog | 1 file + 1 import update | 10 min | Easy |
| 4. Extract alerts-view | Create 1 file, update page | 30 min | Medium |

**Deliverables:**
- ✅ Clean git status
- ✅ Services components in correct location
- ✅ No duplicate dialogs
- ✅ Alerts page thinned to ~4 lines

---

### 🟡 Phase 2: Medium Priority (3 hours)

**Goal:** Major refactoring for long-term maintainability.

| Task | File(s) | Time | Complexity |
|------|---------|------|------------|
| 5. Split tracking-view | Create 3 files, update main | 2-3 hours | Hard |
| 6. Extract profile types | Create 1 file, update imports | 10 min | Easy |

**Deliverables:**
- ✅ Tracking components properly separated
- ✅ Profile types extracted
- ✅ All components <200 lines

---

### 🟢 Phase 3: Nice to Have (Optional)

**Goal:** Polish and standardization.

| Task | Time | Complexity |
|------|------|------------|
| 7. Fix SiteHeader button | 15 min | Easy |
| 8. Standardize export patterns | 1 hour | Medium |
| 9. Split other large components | 4-6 hours | Hard |

**Deliverables:**
- ✅ Consistent component exports
- ✅ No raw HTML elements
- ✅ All components follow single responsibility

---

## 4. Detailed Refactoring Steps

### Step 1: Stage Shared Folders (5 min)

**Commands:**
```bash
# Stage new shared folders
git add src/features/dashboard/shared/
git add src/features/landing/shared/

# Stage deletions of old structure
git add src/features/dashboard/components/
git add src/features/landing/components/
git add src/features/landing/services/components/

# Commit
git commit -m "refactor: migrate shared components to shared/ folder following FDA pattern

- Move dashboard shared components (page-shell, sidebar, topbar) to dashboard/shared/
- Move landing shared components (site-header, site-footer, etc.) to landing/shared/
- Remove old components/ directories
- Follows Feature Driven Architecture pattern from CLAUDE.md"
```

**Verification:**
```bash
git status  # Should show clean working directory
```

---

### Step 2: Move Services Components (15 min)

**2.1 Create Directory:**
```bash
mkdir -p src/features/landing/services/components
```

**2.2 Move Files:**

Move these 9 files from `src/features/landing/shared/services/components/` to `src/features/landing/services/components/`:

1. `hero-section.tsx`
2. `dashboard-preview-section.tsx`
3. `management-row-one.tsx`
4. `management-row-two.tsx`
5. `tracking-preview-section.tsx`
6. `data-row-one.tsx`
7. `data-row-two.tsx`
8. `alerts-preview-section.tsx`
9. `safe-image.tsx`

**2.3 Update Imports:**

**File:** `src/app/(landing)/services/page.tsx`

**Before:**
```tsx
import { HeroSection } from "@/features/landing/shared/services/components/hero-section";
import { DashboardPreviewSection } from "@/features/landing/shared/services/components/dashboard-preview-section";
import { ManagementRowOne } from "@/features/landing/shared/services/components/management-row-one";
import { ManagementRowTwo } from "@/features/landing/shared/services/components/management-row-two";
import { TrackingPreviewSection } from "@/features/landing/shared/services/components/tracking-preview-section";
import { DataRowOne } from "@/features/landing/shared/services/components/data-row-one";
import { DataRowTwo } from "@/features/landing/shared/services/components/data-row-two";
import { AlertsPreviewSection } from "@/features/landing/shared/services/components/alerts-preview-section";
import { SafeImage } from "@/features/landing/shared/services/components/safe-image";
```

**After:**
```tsx
import { HeroSection } from "@/features/landing/services/components/hero-section";
import { DashboardPreviewSection } from "@/features/landing/services/components/dashboard-preview-section";
import { ManagementRowOne } from "@/features/landing/services/components/management-row-one";
import { ManagementRowTwo } from "@/features/landing/services/components/management-row-two";
import { TrackingPreviewSection } from "@/features/landing/services/components/tracking-preview-section";
import { DataRowOne } from "@/features/landing/services/components/data-row-one";
import { DataRowTwo } from "@/features/landing/services/components/data-row-two";
import { AlertsPreviewSection } from "@/features/landing/services/components/alerts-preview-section";
import { SafeImage } from "@/features/landing/services/components/safe-image";
```

**2.4 Delete Empty Directory:**
```bash
rm -rf src/features/landing/shared/services/
```

**2.5 Test:**
```bash
pnpm build  # Should succeed
# Navigate to /services page and verify it renders correctly
```

---

### Step 3: Delete Duplicate Add Material Dialog (10 min)

**3.1 Delete File:**
```bash
rm src/features/dashboard/dashboard/components/add-material-dialog.tsx
```

**3.2 Update Import:**

**File:** `src/features/dashboard/dashboard/components/quick-actions.tsx`

**Before:**
```tsx
import AddMaterialDialog from "./add-material-dialog";
```

**After:**
```tsx
import AddMaterialDialog from "../../data/materials/components/add-material-dialog";
```

**3.3 Test:**
```bash
pnpm build  # Should succeed
# Navigate to /dashboard and test "Add Material" button in Quick Actions
```

---

### Step 4: Extract Alerts View (30 min)

**4.1 Create New Component:**

**File:** `src/features/dashboard/alerts/components/alerts-view.tsx`

```tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/lang/i18n-provider";
import { AlertsTable } from "./alerts-table";
import { AlertDetailsDialog } from "./alert-details-dialog";
import { PlaceOrderDialog } from "./place-order-dialog";
import { OrdersView } from "./orders-view";
import type { Alert } from "@/types/entities";
import { ShoppingCart, ListOrdered } from "lucide-react";

export function AlertsView() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOrders = searchParams.get("view") === "orders";

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const handleToggle = useCallback(() => {
    const newView = isOrders ? "alerts" : "orders";
    router.push(`/alerts?view=${newView}`);
  }, [isOrders, router]);

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailsDialogOpen(true);
  };

  const handleCreateOrder = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsOrderDialogOpen(true);
  };

  const handleOrderCreated = () => {
    setIsOrderDialogOpen(false);
    setSelectedAlert(null);
    router.push("/alerts?view=orders");
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isOrders ? t("alerts.ordersTitle") : t("alerts.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isOrders
              ? t("alerts.ordersDescription")
              : t("alerts.description")}
          </p>
        </div>
        <Button onClick={handleToggle} variant="outline">
          {isOrders ? (
            <>
              <ListOrdered className="mr-2 h-4 w-4" />
              {t("alerts.viewAlerts")}
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t("alerts.viewOrders")}
            </>
          )}
        </Button>
      </div>

      {isOrders ? (
        <OrdersView />
      ) : (
        <AlertsTable
          onViewDetails={handleViewDetails}
          onCreateOrder={handleCreateOrder}
        />
      )}

      <AlertDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        alert={selectedAlert}
        onCreateOrder={() => {
          setIsDetailsDialogOpen(false);
          handleCreateOrder(selectedAlert!);
        }}
      />

      <PlaceOrderDialog
        open={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        alert={selectedAlert}
        onSuccess={handleOrderCreated}
      />
    </>
  );
}
```

**4.2 Update Page File:**

**File:** `src/app/(dashboard)/alerts/page.tsx`

**Before:** (103 lines of state, handlers, JSX)

**After:**
```tsx
import { AlertsView } from "@/features/dashboard/alerts/components/alerts-view";

export default function AlertsPage() {
  return <AlertsView />;
}
```

**4.3 Test:**
```bash
pnpm build  # Should succeed
# Navigate to /alerts
# Test: View details, create order, toggle to orders view
```

---

### Step 5: Extract Profile Types (10 min)

**5.1 Create Types File:**

**File:** `src/features/dashboard/profile/types.ts`

```tsx
export interface ProfileData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  business: {
    id: string;
    name: string;
    industry: string | null;
    createdAt: Date;
  } | null;
}

export interface ProfileFormData {
  name: string;
  email: string;
  businessName?: string;
  industry?: string;
}
```

**5.2 Update Page Imports:**

**File:** `src/app/(dashboard)/profile/page.tsx`

**Before:**
```tsx
interface ProfileData {
  id: string;
  name: string | null;
  // ... (40 lines)
}
```

**After:**
```tsx
import type { ProfileData } from "@/features/dashboard/profile/types";
```

**5.3 Test:**
```bash
pnpm build  # Should succeed
# Navigate to /profile and verify it renders correctly
```

---

### Step 6: Split TrackingView (2-3 hours)

**This is the most complex refactor. Proceed carefully.**

#### 6.1 Create Stock Levels Tab

**File:** `src/features/dashboard/tracking/components/stock-levels-tab.tsx`

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/components/lang/i18n-provider";
import { MOCK_MATERIALS } from "@/mocks";
import { ExportButton } from "@/components/ui/export-button";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle } from "lucide-react";

interface StockLevelsTabProps {
  onRestockClick: (materialId: string) => void;
  onHistoryClick: (materialId: string) => void;
}

export function StockLevelsTab({
  onRestockClick,
  onHistoryClick,
}: StockLevelsTabProps) {
  const { t } = useI18n();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(MOCK_MATERIALS.map((m) => m.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  // Export data preparation
  const exportData = MOCK_MATERIALS.map((material) => ({
    [t("tracking.stockLevels.table.material")]: material.name,
    [t("tracking.stockLevels.table.current")]: material.currentStock,
    [t("tracking.stockLevels.table.minimum")]: material.minStock,
    [t("tracking.stockLevels.table.unit")]: material.unit,
    [t("tracking.stockLevels.table.status")]:
      material.currentStock < material.minStock
        ? t("tracking.stockLevels.status.low")
        : t("tracking.stockLevels.status.adequate"),
  }));

  const getStockStatus = (current: number, min: number) => {
    if (current < min) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          {t("tracking.stockLevels.status.low")}
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="gap-1">
        <Package className="h-3 w-3" />
        {t("tracking.stockLevels.status.adequate")}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground text-sm">
          {t("tracking.stockLevels.description")}
        </p>
        <ExportButton
          data={exportData}
          filename="stock-levels"
          sheetName={t("tracking.stockLevels.title")}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.size === MOCK_MATERIALS.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>{t("tracking.stockLevels.table.material")}</TableHead>
              <TableHead className="text-right">
                {t("tracking.stockLevels.table.current")}
              </TableHead>
              <TableHead className="text-right">
                {t("tracking.stockLevels.table.minimum")}
              </TableHead>
              <TableHead>{t("tracking.stockLevels.table.status")}</TableHead>
              <TableHead className="text-right">
                {t("common.table.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_MATERIALS.map((material) => (
              <TableRow key={material.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.has(material.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(material.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell className="text-right">
                  {material.currentStock} {material.unit}
                </TableCell>
                <TableCell className="text-right">
                  {material.minStock} {material.unit}
                </TableCell>
                <TableCell>
                  {getStockStatus(material.currentStock, material.minStock)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onHistoryClick(material.id)}
                  >
                    {t("tracking.actions.viewHistory")}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onRestockClick(material.id)}
                  >
                    {t("tracking.actions.restock")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

#### 6.2 Create Movement History Tab

**File:** `src/features/dashboard/tracking/components/movement-history-tab.tsx`

```tsx
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { ExportButton } from "@/components/ui/export-button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/lang/i18n-provider";
import { formatDateTime } from "@/lib/utils/formatting";
import { MOCK_STOCK_MOVEMENTS, MOCK_MATERIALS } from "@/mocks";
import { MovementType } from "@/types/entities";
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

const ITEMS_PER_PAGE = 10;

interface MovementHistoryTabProps {}

export function MovementHistoryTab({}: MovementHistoryTabProps) {
  const { t } = useI18n();

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter options
  const typeOptions = [
    { value: MovementType.STOCK_IN, label: t("tracking.movementHistory.types.stockIn") },
    { value: MovementType.STOCK_OUT, label: t("tracking.movementHistory.types.stockOut") },
    { value: MovementType.ADJUSTMENT, label: t("tracking.movementHistory.types.adjustment") },
  ];

  const materialOptions = MOCK_MATERIALS.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  // Filtered data
  const filteredMovements = useMemo(() => {
    return MOCK_STOCK_MOVEMENTS.filter((movement) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(movement.type)) {
        return false;
      }
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(movement.materialId)) {
        return false;
      }
      if (dateRange) {
        const movementDate = new Date(movement.createdAt);
        if (movementDate < dateRange.from || movementDate > dateRange.to) {
          return false;
        }
      }
      return true;
    });
  }, [selectedTypes, selectedMaterials, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);
  const paginatedMovements = filteredMovements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Export data
  const exportData = filteredMovements.map((movement) => {
    const material = MOCK_MATERIALS.find((m) => m.id === movement.materialId);
    return {
      [t("tracking.movementHistory.table.date")]: formatDateTime(movement.createdAt),
      [t("tracking.movementHistory.table.material")]: material?.name || "Unknown",
      [t("tracking.movementHistory.table.type")]: t(`tracking.movementHistory.types.${movement.type}`),
      [t("tracking.movementHistory.table.quantity")]: `${movement.quantity} ${material?.unit || ""}`,
      [t("tracking.movementHistory.table.reference")]: movement.reference || "-",
      [t("tracking.movementHistory.table.notes")]: movement.notes || "-",
    };
  });

  const getMovementIcon = (type: MovementType) => {
    switch (type) {
      case MovementType.STOCK_IN:
        return <ArrowUp className="h-4 w-4" />;
      case MovementType.STOCK_OUT:
        return <ArrowDown className="h-4 w-4" />;
      case MovementType.ADJUSTMENT:
        return <RefreshCw className="h-4 w-4" />;
    }
  };

  const getMovementBadge = (type: MovementType) => {
    const variants = {
      [MovementType.STOCK_IN]: "default",
      [MovementType.STOCK_OUT]: "secondary",
      [MovementType.ADJUSTMENT]: "outline",
    } as const;

    return (
      <Badge variant={variants[type]} className="gap-1">
        {getMovementIcon(type)}
        {t(`tracking.movementHistory.types.${type}`)}
      </Badge>
    );
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedMaterials([]);
    setDateRange(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <MultiSelect
          options={typeOptions}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder={t("tracking.movementHistory.filters.type")}
        />
        <MultiSelect
          options={materialOptions}
          selected={selectedMaterials}
          onChange={setSelectedMaterials}
          placeholder={t("tracking.movementHistory.filters.material")}
        />
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <Button variant="outline" onClick={handleResetFilters}>
          {t("common.actions.reset")}
        </Button>
        <ExportButton
          data={exportData}
          filename="movement-history"
          sheetName={t("tracking.movementHistory.title")}
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("tracking.movementHistory.table.date")}</TableHead>
              <TableHead>{t("tracking.movementHistory.table.material")}</TableHead>
              <TableHead>{t("tracking.movementHistory.table.type")}</TableHead>
              <TableHead className="text-right">
                {t("tracking.movementHistory.table.quantity")}
              </TableHead>
              <TableHead>{t("tracking.movementHistory.table.reference")}</TableHead>
              <TableHead>{t("tracking.movementHistory.table.notes")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMovements.map((movement) => {
              const material = MOCK_MATERIALS.find((m) => m.id === movement.materialId);
              return (
                <TableRow key={movement.id}>
                  <TableCell>{formatDateTime(movement.createdAt)}</TableCell>
                  <TableCell className="font-medium">{material?.name || "Unknown"}</TableCell>
                  <TableCell>{getMovementBadge(movement.type)}</TableCell>
                  <TableCell className="text-right">
                    {movement.quantity} {material?.unit || ""}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {movement.reference || "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {movement.notes || "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {t("common.pagination.showing", {
              from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
              to: Math.min(currentPage * ITEMS_PER_PAGE, filteredMovements.length),
              total: filteredMovements.length,
            })}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              {t("common.pagination.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              {t("common.pagination.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### 6.3 Create Tracking Dialogs

**File:** `src/features/dashboard/tracking/components/tracking-dialogs.tsx`

```tsx
"use client";

import { RestockDialog } from "./restock-dialog";
import { StockHistoryDialog } from "./stock-history-dialog";

interface TrackingDialogsProps {
  isRestockOpen: boolean;
  onRestockOpenChange: (open: boolean) => void;
  selectedMaterialId: string | null;

  isHistoryOpen: boolean;
  onHistoryOpenChange: (open: boolean) => void;
}

export function TrackingDialogs({
  isRestockOpen,
  onRestockOpenChange,
  selectedMaterialId,
  isHistoryOpen,
  onHistoryOpenChange,
}: TrackingDialogsProps) {
  return (
    <>
      <RestockDialog
        open={isRestockOpen}
        onOpenChange={onRestockOpenChange}
        materialId={selectedMaterialId}
      />

      <StockHistoryDialog
        open={isHistoryOpen}
        onOpenChange={onHistoryOpenChange}
        materialId={selectedMaterialId}
      />
    </>
  );
}
```

#### 6.4 Update TrackingView (Main Container)

**File:** `src/features/dashboard/tracking/components/tracking-view.tsx`

**Before:** 428 lines of mixed logic

**After:**
```tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/components/lang/i18n-provider";
import { StockLevelsTab } from "./stock-levels-tab";
import { MovementHistoryTab } from "./movement-history-tab";
import { TrackingDialogs } from "./tracking-dialogs";
import { Package, History } from "lucide-react";

export function TrackingView() {
  const { t } = useI18n();

  // Dialog state
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const handleRestockClick = (materialId: string) => {
    setSelectedMaterialId(materialId);
    setIsRestockOpen(true);
  };

  const handleHistoryClick = (materialId: string) => {
    setSelectedMaterialId(materialId);
    setIsHistoryOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="stock-levels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stock-levels" className="gap-2">
            <Package className="h-4 w-4" />
            {t("tracking.stockLevels.title")}
          </TabsTrigger>
          <TabsTrigger value="movement-history" className="gap-2">
            <History className="h-4 w-4" />
            {t("tracking.movementHistory.title")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock-levels" className="space-y-4">
          <StockLevelsTab
            onRestockClick={handleRestockClick}
            onHistoryClick={handleHistoryClick}
          />
        </TabsContent>

        <TabsContent value="movement-history" className="space-y-4">
          <MovementHistoryTab />
        </TabsContent>
      </Tabs>

      <TrackingDialogs
        isRestockOpen={isRestockOpen}
        onRestockOpenChange={setIsRestockOpen}
        selectedMaterialId={selectedMaterialId}
        isHistoryOpen={isHistoryOpen}
        onHistoryOpenChange={setIsHistoryOpen}
      />
    </>
  );
}
```

#### 6.5 Test Tracking Refactor

```bash
pnpm build  # Should succeed

# Manual testing checklist:
# 1. Navigate to /tracking
# 2. Test Stock Levels tab:
#    - Select all checkbox
#    - Individual selection
#    - Restock button → dialog opens
#    - View history button → dialog opens
#    - Export button
# 3. Test Movement History tab:
#    - Type filter
#    - Material filter
#    - Date range filter
#    - Reset filters
#    - Pagination
#    - Export button
# 4. Test dialogs:
#    - Restock dialog form submission
#    - History dialog data display
```

---

### Step 7: Fix SiteHeader Button (15 min)

**Option A: Try Button Component**

**File:** `src/features/landing/shared/components/site-header.tsx:184`

**Before:**
```tsx
<SheetClose asChild>
  <button
    className="hover:bg-muted/50 bg-muted/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors"
    aria-label={t("common.nav.closeMenu")}
  >
    <X className="h-4 w-4" />
  </button>
</SheetClose>
```

**Try:**
```tsx
<SheetClose asChild>
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    aria-label={t("common.nav.closeMenu")}
  >
    <X className="h-4 w-4" />
  </Button>
</SheetClose>
```

**Test:**
- Open mobile menu
- Click close button
- Verify Sheet closes properly

**Option B: If Button Doesn't Work, Document Why**

```tsx
{/* Note: Raw button required by SheetClose asChild pattern.
    Button component causes hydration issues with Sheet component. */}
<SheetClose asChild>
  <button ...>
```

---

## 5. Files Checklist

### 📁 Files to Create (7 new files)

- [ ] `src/features/landing/services/components/` (directory)
- [ ] `src/features/dashboard/alerts/components/alerts-view.tsx`
- [ ] `src/features/dashboard/tracking/components/stock-levels-tab.tsx`
- [ ] `src/features/dashboard/tracking/components/movement-history-tab.tsx`
- [ ] `src/features/dashboard/tracking/components/tracking-dialogs.tsx`
- [ ] `src/features/dashboard/profile/types.ts`

### 🚚 Files to Move (9 files)

Move from `src/features/landing/shared/services/components/` to `src/features/landing/services/components/`:

- [ ] `hero-section.tsx`
- [ ] `dashboard-preview-section.tsx`
- [ ] `management-row-one.tsx`
- [ ] `management-row-two.tsx`
- [ ] `tracking-preview-section.tsx`
- [ ] `data-row-one.tsx`
- [ ] `data-row-two.tsx`
- [ ] `alerts-preview-section.tsx`
- [ ] `safe-image.tsx`

### 🗑️ Files to Delete (2 files)

- [ ] `src/features/dashboard/dashboard/components/add-material-dialog.tsx`
- [ ] `src/features/landing/shared/services/` (empty directory)

### ✏️ Files to Update Imports (6 files)

- [ ] `src/app/(landing)/services/page.tsx` (9 imports from shared/services → services)
- [ ] `src/features/dashboard/dashboard/components/quick-actions.tsx` (1 import to data/materials)
- [ ] `src/app/(dashboard)/alerts/page.tsx` (refactor to use alerts-view)
- [ ] `src/app/(dashboard)/profile/page.tsx` (import types from profile/types)
- [ ] `src/features/dashboard/tracking/components/tracking-view.tsx` (complete refactor)
- [ ] `src/features/landing/shared/components/site-header.tsx` (optional button fix)

### ♻️ Files to Refactor (3 major files)

- [ ] `src/app/(dashboard)/alerts/page.tsx` (103 → 4 lines)
- [ ] `src/features/dashboard/tracking/components/tracking-view.tsx` (428 → 50 lines)
- [ ] `src/app/(dashboard)/profile/page.tsx` (107 → extract types, optionally extract view)

---

## 6. Testing Checklist

### 6.1 Build Verification

```bash
# After each major change, run:
pnpm build

# Should output:
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages
```

### 6.2 Page-by-Page Testing

#### Landing Pages

- [ ] `/` - Home page renders correctly
- [ ] `/services` - Services page with all 8 sections renders after moving components
- [ ] `/pricing` - Pricing page renders
- [ ] `/contact` - Contact page renders
- [ ] All pages: Header, footer, language switcher work

#### Auth Pages

- [ ] `/login` - Login form works
- [ ] `/register` - Register form works

#### Dashboard Pages

**Alerts Page (after refactor):**
- [ ] `/alerts` - Alerts table displays
- [ ] Click "View Details" → Alert details dialog opens
- [ ] Click "Create Order" → Place order dialog opens
- [ ] Toggle to "Orders" view → Orders list displays
- [ ] Create order → Redirects to orders view

**Tracking Page (after refactor):**
- [ ] `/tracking` - Page loads
- [ ] Stock Levels tab:
  - [ ] Table displays materials
  - [ ] Select all checkbox works
  - [ ] Individual checkboxes work
  - [ ] "Restock" button → Dialog opens with correct material
  - [ ] "View History" button → Dialog opens with correct material
  - [ ] Export button downloads XLSX
- [ ] Movement History tab:
  - [ ] Table displays movements
  - [ ] Type filter works
  - [ ] Material filter works
  - [ ] Date range filter works
  - [ ] Reset filters button works
  - [ ] Pagination works
  - [ ] Export button downloads XLSX

**Profile Page:**
- [ ] `/profile` - Profile displays
- [ ] Edit profile form works
- [ ] Business section displays

**Other Pages:**
- [ ] `/dashboard` - Quick Actions "Add Material" button works (after fixing duplicate)
- [ ] `/data` - Materials section "Add Material" button works
- [ ] `/management` - All tabs render
- [ ] All pages: Sidebar, topbar render correctly

### 6.3 TypeScript Type Checking

```bash
# Run TypeScript compiler without emitting files
pnpm tsc --noEmit

# Should output: No errors
```

### 6.4 Git Status

```bash
git status

# Should show:
# - New files staged (shared/ folders, new components)
# - Old files deleted (old components/ folders, duplicate dialog)
# - Modified files (updated imports, refactored pages)
```

---

## 7. Additional Findings

### 7.1 Large Component Files (>400 lines)

These are correctly placed per FDA but could benefit from further splitting in future:

| Lines | File | Notes |
|-------|------|-------|
| 807 | `management/delivery/edit-order-dialog.tsx` | Could extract form sections |
| 767 | `data/recipes/components/add-recipe-dialog.tsx` | Could extract ingredient list |
| 691 | `management/delivery/orders-table.tsx` | Could extract row component |
| 599 | `data/products/components/products-section.tsx` | Could extract table |
| 573 | `data/suppliers/components/suppliers-section.tsx` | Could extract table |
| 566 | `management/delivery/update-order-status-dialog.tsx` | Could extract status steps |
| 555 | `data/recipes/components/recipes-section.tsx` | Could extract table |
| 555 | `data/materials/components/materials-section.tsx` | Could extract table |
| 549 | `management/delivery/schedule-delivery-dialog.tsx` | Could extract calendar |
| 502 | `management/production-history/production-history.tsx` | Could extract table |
| 500 | `management/edit-stock/edit-stock.tsx` | Could extract tabs |
| 493 | `management/edit-stock/bulk-adjustment-dialog.tsx` | Could extract form sections |

**Recommendation:** These are not urgent. Tackle them only if they become hard to maintain.

### 7.2 TODO Comments (50+ instances)

Found 50+ TODO comments indicating future work. **These are not structural issues.**

**Categories:**
1. **TanStack Query Migration** (17 instances) - Replace useEffect with useQuery
2. **API Integration** (25 instances) - Replace mock data with real API calls
3. **Feature Implementation** (8 instances) - CSV import, PDF generation, etc.

**Examples:**
```tsx
// src/features/dashboard/tracking/components/tracking-view.tsx:66
// TODO: Replace with TanStack Query hook for fetching movements

// src/features/dashboard/management/delivery/edit-order-dialog.tsx:222
// TODO: API call to update order

// src/features/dashboard/management/edit-stock/edit-stock.tsx:170
// TODO: Implement CSV import functionality
```

**Recommendation:** These are fine for now. They're properly marked and indicate future work.

### 7.3 Export Pattern Inconsistency (Minor)

Most components use **named exports** (`export function ComponentName`), but a few use **default exports** (`export default ComponentName`).

**Examples:**
- Named: `export function AlertsTable() { ... }`
- Default: `export default function AlertsPage() { ... }`

**Recommendation:** Consider standardizing to all named exports for consistency (low priority).

---

## 8. FDA Compliance Scorecard

### Current State (Before Refactoring)

| Aspect | Status | Score | Issues |
|--------|--------|-------|--------|
| **Folder Structure** | 🟡 Partial | 7/10 | Services in wrong location, git unstaged |
| **Component Placement** | 🟡 Partial | 7/10 | Mostly correct, but alerts page too thick |
| **Page Thinness** | 🟡 Partial | 6/10 | 2 pages too thick (alerts, tracking-view) |
| **No Duplicates** | 🔴 Issues | 5/10 | Add Material Dialog duplicated |
| **shadcn/ui Usage** | 🟢 Excellent | 10/10 | All components use shadcn (1 exception) |
| **Dead Code** | 🟢 Clean | 10/10 | No unused files |
| **Documentation** | 🟢 Good | 8/10 | 50+ TODOs properly marked |

**Overall: 7.5/10** - Good foundation, needs targeted fixes

### Target State (After Refactoring)

| Aspect | Target Score | Improvements |
|--------|--------------|--------------|
| **Folder Structure** | 10/10 | Services moved, git clean |
| **Component Placement** | 10/10 | All components in correct locations |
| **Page Thinness** | 9/10 | All pages <20 lines (tracking-view exception at 50) |
| **No Duplicates** | 10/10 | Duplicate dialog removed |
| **shadcn/ui Usage** | 10/10 | 100% shadcn usage |
| **Dead Code** | 10/10 | Maintained clean state |
| **Documentation** | 9/10 | TODOs + this refactoring plan |

**Target Overall: 9.7/10** - Production-ready FDA compliance

---

## 9. Risk Assessment

### 🟢 Low Risk Refactors

- Git staging (no code changes)
- Moving services components (simple file move)
- Deleting duplicate dialog (straightforward)
- Extracting profile types (type-only)

### 🟡 Medium Risk Refactors

- Extracting alerts-view (state management)
- Fixing SiteHeader button (potential UI regression)

### 🔴 High Risk Refactors

- Splitting tracking-view (complex state, multiple components)

**Mitigation Strategy:**
1. Make one change at a time
2. Run `pnpm build` after each change
3. Test thoroughly before moving to next step
4. Keep backup/commit before major refactors
5. For tracking-view: Use git branch for the refactor

---

## 10. Next Steps

### Immediate (Do Now)

1. **Review this plan** - Ensure all stakeholders agree
2. **Create git branch** - `git checkout -b refactor/fda-compliance`
3. **Start Phase 1** - Quick wins (1 hour)
4. **Test and commit** - Verify each step works

### Short Term (This Week)

5. **Complete Phase 2** - Medium priority refactors (3 hours)
6. **Thorough testing** - All pages, all features
7. **Merge to main** - After full verification

### Long Term (Future)

8. **Monitor large components** - Split if they become unmaintainable
9. **TanStack Query migration** - Address TODOs gradually
10. **API integration** - Replace mock data with real APIs

---

## 11. Success Criteria

This refactoring will be considered successful when:

- [ ] Build completes with zero errors
- [ ] All pages render correctly
- [ ] All features work as before refactoring
- [ ] FDA compliance score: 9.5+/10
- [ ] No duplicate components
- [ ] All pages <20 lines (except tracking-view at ~50)
- [ ] Git history is clean and well-documented
- [ ] Team can easily understand new structure

---

## Appendix A: FDA Principles Reference

From `CLAUDE.md`:

1. **Pages are thin** - 10-20 lines, composition only
2. **Page-specific components** - `src/features/[area]/[page]/components/`
3. **Shared feature components** - `src/features/[area]/components/` or `shared/`
4. **Extract early** - If >20 lines of JSX, extract to component
5. **Name descriptively** - Component files clearly describe purpose

---

## Appendix B: Useful Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm lint                   # Run ESLint

# Git
git status                  # Check current changes
git add [files]             # Stage files
git commit -m "message"     # Commit changes
git checkout -b [branch]    # Create new branch

# File Operations
mkdir -p [path]             # Create directory
mv [from] [to]              # Move file
rm [file]                   # Delete file
rm -rf [dir]                # Delete directory

# Finding Large Files
find src -name "*.tsx" -exec wc -l {} + | sort -rn | head -20
```

---

**End of FDA Refactoring Plan**

**Last Updated:** 2025-10-31
**Version:** 1.0
**Status:** Ready for Implementation
