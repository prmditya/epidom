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

# Generate Prisma client (runs automatically on pnpm install)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Push schema changes without migrations (for prototyping)
npx prisma db push
```

## Environment Setup

Create a `.env` file based on `.env.example`:
```bash
NEXTAUTH_SECRET=generate-a-strong-random-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="postgresql://user:password@localhost:5432/epidom"
# For local development, you can use SQLite:
# DATABASE_URL="file:./dev.db"
```

## Architecture

### Route Structure

This app uses Next.js 15 App Router with four route groups:

- **Landing routes** (`/(landing)/*`) - Public marketing pages (`/`, `/services`, `/pricing`, `/contact`)
  - Uses `I18nProvider` for internationalization
  - Layout includes `SiteHeader`, `SiteFooter`, and `CookieConsentBar`
  - Uses Lato font from Google Fonts

- **Auth routes** (`/(auth)/*`) - Authentication pages (`/login`, `/register`)
  - Uses `I18nProvider` for internationalization
  - Simple layout with no navigation components
  - **Note:** Auth is PARTIALLY implemented with NextAuth + Credentials provider (see Authentication section below)

- **Stores routes** (`/(stores)/*`) - Store selection pages (`/stores`)
  - Uses `I18nProvider` for internationalization
  - Reuses `SiteHeader` with `variant="authenticated"` (logo + logout, no nav links)
  - Multi-store support: users select which store to manage
  - **Flow:** Login → Store Selection → Dashboard (per store)
  - Uses Lato font from Google Fonts (same as landing)

- **Dashboard routes** (`/(dashboard)/*`) - Application routes
  - Pages: `/dashboard`, `/tracking`, `/data`, `/management`, `/alerts`, `/profile`
  - Uses `I18nProvider` for internationalization
  - Wrapped in `PageShell` (Topbar + Sidebar + content area)
  - Session-based authentication via NextAuth
  - Each dashboard is scoped to a selected store (multi-store support)

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

Stores layout (src/app/(stores)/layout.tsx)
  └─ I18nProvider
      ├─ SiteHeader (variant="authenticated", showNav=false)
      └─ main content

Dashboard layout (src/app/(dashboard)/layout.tsx)
  └─ I18nProvider
      └─ PageShell (Topbar, Sidebar, main content)
          └─ page content
```

### Key Providers & Components

1. **I18nProvider** (`src/components/lang/i18n-provider.tsx`)
   - Used across all route groups (landing, auth, dashboard, stores)
   - Supports 3 languages: English (en), French (fr), Indonesian (id)
   - Stores locale in localStorage (key: `locale`)
   - Exports: `useI18n()` hook with `locale`, `setLocale()`, `t()` translation function
   - Translation dictionaries in `src/locales/` (en.ts, fr.ts, id.ts)
   - Supports nested keys with dot notation (e.g., `t("nav.dashboard")`)
   - Supports function values for dynamic content (e.g., footer copyright with year)

2. **SessionProvider** (`src/components/providers/session-provider.tsx`)
   - NextAuth session provider wrapper
   - Wraps the entire app to provide authentication context
   - Enables `useSession()` hook across all components

3. **ErrorBoundary** (`src/components/error-boundary.tsx`)
   - React error boundary for graceful error handling
   - Shows custom error UI with recovery options
   - Exports `useErrorHandler()` hook and `withErrorBoundary()` HOC
   - Logs errors in development mode

4. **SiteHeader** (`src/features/landing/components/site-header.tsx`)
   - Reusable header component for both landing and authenticated pages
   - Props:
     - `variant`: "landing" (default) | "authenticated"
     - `showNav`: true (default) | false
   - **Landing mode** (`variant="landing"`):
     - Shows nav links (Home, Services, Pricing, Contact)
     - Shows waitlist dialog button
   - **Authenticated mode** (`variant="authenticated"`):
     - Shows logout button instead of waitlist
     - Can hide nav links with `showNav={false}`
   - Always includes: Logo, language switcher, mobile menu

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

### Authentication

**Implementation Status: PARTIALLY IMPLEMENTED**

The app uses NextAuth v4 with Credentials provider for authentication:

**Key Files:**
- `src/lib/auth.ts` - NextAuth configuration with JWT strategy
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth route handler
- `src/app/api/auth/signup/route.ts` - User registration endpoint
- `src/lib/auth-client.ts` - Custom `useUser()` hook for client-side session access

**Authentication Flow:**
1. User registers via `/api/auth/signup` (password hashed with bcryptjs)
2. User logs in via NextAuth's `signIn("credentials", { email, password })`
3. Session stored as JWT with 30-day max age
4. Server-side routes verify session with `getServerSession(authOptions)`

**Client-Side Session Access:**
```typescript
import { useUser } from "@/lib/auth-client";
const { user, loading } = useUser(); // Returns { id, email, name, image }
```

**Server-Side Authorization Pattern:**
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ... authorized logic
}
```

**Current Limitations:**
- No OAuth providers configured (only Credentials)
- Email verification not implemented (schema supports it)
- Password reset flow not fully implemented

### Database Architecture

**ORM:** Prisma 6.17.1 with PostgreSQL (SQLite supported for local dev)

**Key Models and Relationships:**

```
User (1:1) ← Business (1:N) → Store
                              └─ (1:N) → Product (1:1) → Recipe
                              └─ (1:N) → Ingredient
                              └─ (1:N) → Order → OrderItem (N:N) → Product
                              └─ (1:N) → Supplier

Recipe (N:N via RecipeIngredient junction) ← Ingredient
Product → ProductionBatch
Ingredient/Product → StockMovement (audit trail)
User (1:1) → Subscription (Stripe integration)
User (1:N) → Alert (notifications)
```

**Important Model Details:**
- **Multi-store architecture**: Business → Store (1:N), all inventory scoped to Store
- **Recipe composition**: Product has one Recipe, which contains multiple Ingredients via junction table
- **Audit trail**: StockMovement tracks all inventory changes with timestamps
- **Enums**: ProductionStatus, MovementType, OrderStatus, AlertType, SubscriptionPlan
- **Decimal precision**: Prices and quantities use `@db.Decimal(10, 2)`
- **Soft deletes**: Consider using `isActive` boolean instead of hard deletes for audit purposes

**Schema Location:** `prisma/schema.prisma`

### API Routes

**Existing Endpoints:**
```
POST   /api/auth/signup              # Create new user account
POST   /api/auth/[...nextauth]       # NextAuth authentication
GET    /api/user/profile             # Get user profile (session required)
POST   /api/user/business            # Create business (session required)
PATCH  /api/user/business            # Update business (session required)
```

**API Patterns:**
- RESTful conventions (GET/POST/PATCH/DELETE)
- Session verification via `getServerSession(authOptions)`
- Standard HTTP status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 409 (Conflict), 500 (Error)
- JSON request/response bodies
- Error responses: `{ error: "Error message" }`

**Adding New API Routes:**
1. Create file in `src/app/api/[route-name]/route.ts`
2. Export async functions: `GET`, `POST`, `PATCH`, `DELETE`
3. Verify session for protected routes
4. Use Prisma client for database operations
5. Return `NextResponse.json()` with appropriate status codes

### State Management

**No global state library** (Redux, Zustand, etc.) - uses built-in React patterns:

1. **NextAuth sessions** - Authentication state via `useSession()` or `useUser()`
2. **React Context API** - I18nProvider for language/translations
3. **Component state** - `useState()` for local UI state
4. **Server state** - API routes + Prisma for data persistence

**Current Data Fetching:**
- Most components use **mock data** with TODO comments
- Example: `useAlertsCount()` hook uses `MOCK_ALERTS` array
- Future: Replace with API calls or add a proper data fetching library

**Adding New State:**
- For UI state: Use `useState()` in components
- For shared state: Create React Context provider in `src/components/providers/`
- For server data: Create API route + use `fetch()` or server actions

### Utilities

**Validation** (`src/lib/validation.ts`):
- Email validation with regex
- Name validation (2-50 characters)
- Waitlist form validation
- RateLimiter class for brute force protection

**Logger** (`src/lib/logger.ts`):
- Used by ErrorBoundary for error logging
- Development-friendly error output

**Auth Client** (`src/lib/auth-client.ts`):
- Custom `useUser()` hook wrapping NextAuth's `useSession()`
- Returns: `{ user: { id, email, name, image }, loading }`

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

**Current Implementation:**
- Forms use **server actions** with FormData API (not react-hook-form currently)
- Manual error state management with `useState()`
- NextAuth's `signIn()` function for authentication forms
- Basic validation in `src/lib/validation.ts`

**Pattern:**
```typescript
async function onSubmit(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate and process
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false
  });

  // Handle result
}

// In JSX:
<form action={onSubmit}>
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <button type="submit">Submit</button>
</form>
```

**Note:** react-hook-form and zod are in package.json but not currently used. Consider migrating forms to use these libraries for better validation and type safety.

## Important Notes

- **Clean Architecture**: Pages are thin (10-20 lines), components are extracted to feature folders
- **Feature-based structure**: Components organized by feature in `src/features/[feature-area]/[page-name]/components/`
- **Multi-store architecture**: One Business can have multiple Stores, each with separate inventory (see Database Architecture)
- **Authentication**: NextAuth with Credentials provider, JWT sessions, bcryptjs password hashing
- **Database**: Prisma + PostgreSQL (SQLite for local dev), comprehensive schema with audit trails
- **Mock data**: Many components use hardcoded mock data with TODO comments - needs API integration
- **Responsive design**: Uses Tailwind's responsive utilities, sidebar hidden on mobile
- **TypeScript strict mode**: Enabled in tsconfig.json
- **Vercel Analytics**: Integrated in root layout
- **Unified I18n system**: Single `I18nProvider` used across all routes with translations in `src/locales/`
- **Four route groups**: Landing (public), Auth (NextAuth), Stores (multi-store selector), Dashboard (per-store)
- **Error handling**: ErrorBoundary with custom fallback UI and recovery options

## Clean Architecture Best Practices

When adding new features or modifying existing pages:

1. **Keep pages minimal** - Pages should only import and compose components
2. **Extract early** - If a page component has >20 lines of JSX, extract it to a component
3. **Organize by page** - Page-specific components go in `src/features/[area]/[page]/components/`
4. **Share wisely** - Only move components to `src/features/[area]/components/` if used by multiple pages
5. **Name descriptively** - Component files should clearly describe their purpose (e.g., `pricing-cards.tsx`, not `cards.tsx`)
