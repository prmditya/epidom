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

This app uses Next.js 15 App Router with route groups:

- **Root routes** (`/login`, `/register`) - Public authentication pages
- **App routes** (`/(app)/*`) - Protected routes wrapped in `AuthGate` requiring authentication
  - Routes automatically redirect to `/login` if user is not authenticated
  - All app routes share the `PageShell` layout (Topbar + Sidebar + content area)

### Layout Hierarchy

```
Root layout (src/app/layout.tsx)
  ├─ I18nProvider (multi-language support)
  ├─ AuthProvider (authentication state)
  └─ children
      └─ App layout (src/app/(app)/layout.tsx)
          ├─ AuthGate (redirects to /login if unauthenticated)
          └─ PageShell (Topbar, Sidebar, main content)
              └─ page content
```

### Key Providers

1. **AuthProvider** (`src/components/epidom/auth-provider.tsx`)
   - Manages authentication state with localStorage persistence (key: `epidom_auth_v1`)
   - Currently uses mocked authentication (no backend)
   - Exports: `useAuth()`, `useRequireAuth(redirectTo)`
   - User type includes: name, email, businessName, address, avatarUrl

2. **I18nProvider** (`src/components/epidom/i18n-provider.tsx`)
   - Supports 3 languages: English (en), French (fr), Indonesian (id)
   - Stores locale in localStorage (key: `locale`)
   - Exports: `useI18n()` hook with `locale`, `setLocale()`, `t()` translation function
   - Translation dictionaries in `src/components/epidom/i18n-dictionaries.ts`

### Component Organization

- **UI components** (`src/components/ui/*`) - shadcn/ui primitives, do not modify these directly
- **Epidom components** (`src/components/epidom/*`) - App-specific components
  - `page-shell.tsx` - Main layout wrapper with responsive sidebar
  - `topbar.tsx`, `sidebar.tsx` - Navigation components
  - `lang-switcher.tsx` - Language selector
  - Auth-related components: `auth-provider.tsx`
  - Tracking components: `tracking-view-active.tsx`, `tracking-view-orders.tsx`, `tracking-toggle.tsx`, `alerts-toggle.tsx`
  - Management components in `management/` subdirectory

### Styling

- Tailwind CSS 4 with inline theme definitions in `src/app/globals.css`
- Uses OKLCH color space for better color consistency
- Dark mode support via `.dark` class
- Custom design tokens for shadcn/ui components (card, popover, primary, etc.)
- Geist Sans and Geist Mono fonts from Vercel

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

When adding new translatable text:
1. Add keys to all three language dictionaries in `src/components/epidom/i18n-dictionaries.ts`
2. Use dot notation for nested keys (e.g., `t("nav.dashboard")`)
3. Keep all three translations synchronized (en, fr, id)

### Adding Protected Routes

1. Create page in `src/app/(app)/[route-name]/page.tsx`
2. No additional auth setup needed - `AuthGate` in app layout handles protection
3. Add route to sidebar navigation in `src/components/epidom/sidebar.tsx`
4. Add translations for the new route in dictionaries

### Working with Forms

- Forms use `react-hook-form` with `@hookform/resolvers`
- Validation with `zod` schemas
- Form components from shadcn/ui (label, input, etc.)

## Important Notes

- **Mock authentication**: All auth is client-side only with localStorage
- **No database**: This is an MVP with hardcoded/mocked data
- **Responsive design**: Uses Tailwind's responsive utilities, sidebar hidden on mobile
- **TypeScript strict mode**: enabled in tsconfig.json
- **Vercel Analytics**: Integrated in root layout
