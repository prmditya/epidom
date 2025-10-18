# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Epidom Dashboard MVP - An open-source ERP system for small food manufacturers. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. Uses shadcn/ui components (New York style).

## Development Commands

```bash
# Start development server (opens at http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Route Structure

This app uses Next.js 15 App Router with three route groups:

- **Landing routes** (`/(landing)/*`) - Public marketing pages (`/`, `/services`, `/pricing`, `/contact`)
  - Uses `I18nProvider` for internationalization
  - Layout includes `SiteHeader`, `SiteFooter`, and `CookieConsentBar`
  - Uses Lato font from Google Fonts

- **Auth routes** (`/(auth)/*`) - Authentication pages (`/login`, `/register`)
  - Uses `I18nProvider` for internationalization
  - Simple layout with no navigation components
  - **Note:** Auth is NOT implemented yet - forms currently just redirect

- **Dashboard routes** (`/(dashboard)/*`) - Application routes
  - Pages: `/dashboard`, `/tracking`, `/data`, `/management`, `/alerts`, `/profile`
  - Uses `I18nProvider` for internationalization
  - Wrapped in `PageShell` (Topbar + Sidebar + content area)
  - **Note:** Currently no authentication - will be added later

### Layout Hierarchy

```
Root layout (src/app/layout.tsx)
  └─ Analytics
  └─ children (route group layouts)

Landing layout (src/app/(landing)/layout.tsx)
  └─ I18nProvider
      ├─ SiteHeader
      ├─ main content
      ├─ SiteFooter
      └─ CookieConsentBar

Auth layout (src/app/(auth)/layout.tsx)
  └─ I18nProvider
      └─ page content

Dashboard layout (src/app/(dashboard)/layout.tsx)
  └─ I18nProvider
      └─ PageShell (Topbar, Sidebar, main content)
          └─ page content
```

### Key Providers

1. **I18nProvider** (`src/components/lang/i18n-provider.tsx`)
   - Used across all route groups (landing, auth, dashboard)
   - Supports 3 languages: English (en), French (fr), Indonesian (id)
   - Stores locale in localStorage (key: `locale`)
   - Exports: `useI18n()` hook with `locale`, `setLocale()`, `t()` translation function
   - Translation dictionaries in `src/locales/` (en.ts, fr.ts, id.ts)
   - Supports nested keys with dot notation (e.g., `t("nav.dashboard")`)
   - Supports function values for dynamic content (e.g., footer copyright with year)

### Component Organization

The codebase follows a **clean architecture** with feature-based organization:

**Folder Structure Pattern:**
```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives (do not modify)
│   └── lang/            # Shared i18n providers
├── features/
│   ├── [feature-area]/
│   │   ├── components/  # Shared components across feature
│   │   └── [page-name]/
│   │       └── components/  # Page-specific components
```

**Key Principles:**
1. **Pages are thin** - They only import and compose components
2. **Page-specific components** go in `src/features/[feature-area]/[page-name]/components/`
3. **Shared feature components** go in `src/features/[feature-area]/components/`
4. **Pages** in `src/app/` should be minimal (typically 10-20 lines)

**Examples:**
- `src/features/dashboard/dashboard/components/` - Components for the dashboard page
- `src/features/dashboard/components/` - Shared across all dashboard pages (PageShell, Topbar, Sidebar)
- `src/features/landing/pricing/components/` - Components for the pricing page
- `src/features/landing/components/` - Shared across all landing pages (SiteHeader, SiteFooter)
- `src/features/auth/login/components/` - Components for the login page

### Styling

- Tailwind CSS 4 with inline theme definitions in `src/app/globals.css`
- Uses OKLCH color space for better color consistency
- Dark mode support via `.dark` class
- Custom design tokens for shadcn/ui components (card, popover, primary, etc.)
- Multiple font systems:
  - **Dashboard/Auth**: Geist Sans and Geist Mono from Vercel
  - **Landing pages**: Lato from Google Fonts

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to `./src/*`

### Component Library

Using shadcn/ui with configuration in `components.json`:
- Style: "new-york"
- Icon library: lucide-react
- RSC: true (React Server Components enabled)
- Additional aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

## Adding New Features

### Adding UI Components

Use shadcn CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```

Components will be added to `src/components/ui/` automatically.

### Adding Translations

The app uses a unified translation system across all routes:

1. Add keys to all three language dictionaries in `src/locales/` (en.ts, fr.ts, id.ts)
2. Use dot notation for nested keys (e.g., `t("nav.dashboard")`, `t("services.heroTitle")`)
3. Keep all three translations synchronized (en, fr, id)
4. Use the `useI18n()` hook from `I18nProvider`
5. For dynamic values, use function syntax (e.g., `rights: (year: number) => 'Copyright ${year}'`)

### Adding Dashboard Routes

Following the clean architecture pattern:

1. **Create the page** in `src/app/(dashboard)/[route-name]/page.tsx` (keep it thin, ~10-20 lines)
2. **Create components directory**: `src/features/dashboard/[route-name]/components/`
3. **Extract components**: Create page-specific components in the components directory
4. **Import in page**: Import and compose components in the page file
5. **Add navigation**: Update `src/features/dashboard/components/sidebar.tsx`
6. **Add translations**: Update `src/components/lang/i18n-dictionaries.ts`

**Example structure:**
```
src/app/(dashboard)/inventory/page.tsx (imports components)
src/features/dashboard/inventory/components/
  ├── inventory-table.tsx
  ├── add-item-dialog.tsx
  └── stock-alerts.tsx
```

### Adding Landing Pages

Following the clean architecture pattern:

1. **Create the page** in `src/app/(landing)/[route-name]/page.tsx` (keep it thin, ~10-20 lines)
2. **Create components directory**: `src/features/landing/[route-name]/components/`
3. **Extract components**: Create page-specific components (sections, forms, etc.)
4. **Import in page**: Import and compose components in the page file
5. **Add navigation**: Update `src/features/landing/components/site-header.tsx`
6. **Add translations**: Update `src/locales/` files (en.ts, fr.ts, id.ts)

**Example structure:**
```
src/app/(landing)/about/page.tsx (imports components)
src/features/landing/about/components/
  ├── about-hero.tsx
  ├── team-section.tsx
  └── company-history.tsx
```

### Adding Auth Pages

Following the clean architecture pattern:

1. **Create the page** in `src/app/(auth)/[route-name]/page.tsx` (keep it thin)
2. **Create components directory**: `src/features/auth/[route-name]/components/`
3. **Extract components**: Create form components and other UI elements
4. **Import in page**: Import and compose components in the page file
5. **Add translations**: Update `src/locales/` files (en.ts, fr.ts, id.ts)

### Working with Forms

- Forms use `react-hook-form` with `@hookform/resolvers`
- Validation with `zod` schemas
- Form components from shadcn/ui (label, input, etc.)

## Important Notes

- **Clean Architecture**: Pages are thin (10-20 lines), components are extracted to feature folders
- **Feature-based structure**: Components organized by feature in `src/features/[feature-area]/[page-name]/components/`
- **No authentication**: Auth is NOT implemented - forms just redirect for now (will be added later)
- **No database**: This is an MVP with hardcoded/mocked data
- **Responsive design**: Uses Tailwind's responsive utilities, sidebar hidden on mobile
- **TypeScript strict mode**: enabled in tsconfig.json
- **Vercel Analytics**: Integrated in root layout
- **Unified I18n system**: Single `I18nProvider` used across all routes with translations in `src/locales/`
- **Three route groups**: Landing (public), Auth (placeholder), Dashboard (public for now)

## Clean Architecture Best Practices

When adding new features or modifying existing pages:

1. **Keep pages minimal** - Pages should only import and compose components
2. **Extract early** - If a page component has >20 lines of JSX, extract it to a component
3. **Organize by page** - Page-specific components go in `src/features/[area]/[page]/components/`
4. **Share wisely** - Only move components to `src/features/[area]/components/` if used by multiple pages
5. **Name descriptively** - Component files should clearly describe their purpose (e.g., `pricing-cards.tsx`, not `cards.tsx`)
