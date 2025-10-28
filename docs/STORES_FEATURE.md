# 🏪 Multi-Store Feature - Implementation Documentation

## Overview

The Stores feature enables **multi-outlet/multi-store management** for food manufacturers. One business can manage multiple stores/outlets, each with separate inventory, orders, and production tracking.

## Architecture Decision

**Scenario 1: Multi-Store ERP** ✅ (Implemented)

- One Business → Multiple Stores (1-to-many)
- Each store has independent inventory tracking
- User flow: Login → Store Selection → Dashboard (scoped to store)
- All data (products, ingredients, orders, etc.) are per-store

## Database Schema Changes

### New Store Model

```prisma
model Store {
  id          String   @id @default(cuid())
  businessId  String
  business    Business @relation(fields: [businessId], references: [id])

  name        String
  address     String?
  city        String?
  country     String?
  phone       String?
  email       String?
  image       String?

  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations - all store data
  products         Product[]
  ingredients      Ingredient[]
  recipes          Recipe[]
  suppliers        Supplier[]
  orders           Order[]
  productionBatches ProductionBatch[]
}
```

### Updated Relations

All inventory-related models now reference `storeId` instead of `businessId`:

- ✅ Product
- ✅ Ingredient
- ✅ Recipe
- ✅ Supplier
- ✅ Order
- ✅ ProductionBatch

## UI/UX Implementation

### Route Structure

**New Route Group:** `/(stores)/*`

```
src/app/(stores)/
├── layout.tsx              # Layout with StoresHeader
└── stores/
    └── page.tsx            # Store selection page
```

### Components Architecture

Following **clean architecture** principles:

```
src/features/stores/
└── stores/
    └── components/
        ├── stores-container.tsx    # Main container
        ├── store-card.tsx          # Individual store card
        └── create-store-button.tsx # Create store dialog
```

**Note:** Stores page reuses the global `SiteHeader` component from landing pages with `variant="authenticated"` and `showNav={false}` props. This follows **DRY** and **KISS** principles.

### UI Components

#### 1. SiteHeader (Reused)

- Global navbar from landing pages
- Configured with `variant="authenticated"` to show logout button
- `showNav={false}` to hide navigation links
- EPIDOM logo + logout button + language switcher
- Consistent styling across app

#### 2. StoresContainer

- Page title: "Vos boutiques"
- Create store button (black, rounded, with + icon)
- Responsive grid layout (1 → 2 → 3 columns)
- Empty state for no stores

#### 3. StoreCard

- Store image (aspect ratio 16:9)
- Store name (bold, prominent)
- City info
- Hover effects (shadow, scale)
- Click to select store → redirects to dashboard

#### 4. CreateStoreButton

- Dialog form with store name + city fields
- Form validation
- Mock API integration (TODO: connect to backend)

## Translations

Added to all three languages (EN, FR, ID):

```typescript
stores: {
  title: "Your Stores" / "Vos boutiques" / "Toko Anda",
  createStore: "Create a store" / "Créer une boutique" / "Buat toko",
  storeName: "Store Name" / "Nom de la Boutique" / "Nama Toko",
  city: "City" / "Ville" / "Kota",
  noStores: "No stores yet",
  createFirst: "Create your first store to get started",
}
```

## User Flow

```
1. User logs in → /stores
2. User sees list of their stores
3. User clicks on a store → /dashboard?storeId=XXX
4. Dashboard loads data for selected store
5. All operations are scoped to that store
```

OR

```
1. User logs in → /stores
2. No stores exist
3. User clicks "Create a store"
4. Dialog opens with form
5. User enters store name + city
6. Store created → appears in list
7. User clicks store → dashboard
```

## Mock Data

Currently using 3 mock stores:

1. "Boutique boulangerie n°1" - Bali
2. "test" - paris
3. "Mur Mur" - Canggu

Mock data stored in: `src/features/stores/stores/components/stores-container.tsx`

## Next Steps (TODO)

### Backend Integration

- [ ] Create API route: `POST /api/stores` (create store)
- [ ] Create API route: `GET /api/stores` (list stores)
- [ ] Create API route: `PUT /api/stores/:id` (update store)
- [ ] Create API route: `DELETE /api/stores/:id` (delete store)
- [ ] Run Prisma migrations to update database schema
- [ ] Connect frontend to real API

### Enhanced Features

- [ ] Store image upload
- [ ] Edit store functionality
- [ ] Delete/archive store
- [ ] Store settings (timezone, currency per store)
- [ ] Store statistics on cards (# products, # orders)
- [ ] Search/filter stores
- [ ] Store switching in dashboard (dropdown in topbar)

### Authentication & Authorization

- [ ] Protect /stores route (require login)
- [ ] Store selection persistence (localStorage/session)
- [ ] Auto-redirect to last selected store
- [ ] Multi-user: role-based access per store

## Technical Details

### Dependencies Used

- **shadcn/ui**: Card, Dialog, Button, Input, Label
- **lucide-react**: Plus icon
- **Next.js**: Image, Link
- **i18n**: Custom provider with translations

### Styling

- Tailwind CSS with neutral color palette
- Responsive grid (mobile → tablet → desktop)
- Smooth transitions and hover effects
- Rounded corners for modern look
- Shadow elevation for depth

### Performance Considerations

- Server components where possible
- Client components only when needed (form state, dialogs)
- Image optimization with Next.js Image
- Lazy loading with Next.js dynamic imports

## Files Created/Modified

### Created Files

```
src/app/(stores)/layout.tsx
src/app/(stores)/stores/page.tsx
src/features/stores/stores/components/stores-container.tsx
src/features/stores/stores/components/store-card.tsx
src/features/stores/stores/components/create-store-button.tsx
REPOS/epidom-mvp/STORES_FEATURE.md
```

### Modified Files

```
prisma/schema.prisma (added Store model, updated relations)
src/features/landing/components/site-header.tsx (added variant prop for reuse)
src/locales/en.ts (added stores translations)
src/locales/fr.ts (added stores translations)
src/locales/id.ts (added stores translations)
SELF/SHORT_IMPORTANT_MEMORY.md (updated architecture docs)
REPOS/epidom-mvp/CLAUDE.md (updated route groups)
```

## Best Practices Applied

✅ **Clean Architecture**: Pages are thin, logic in components  
✅ **KISS**: Simple, straightforward implementation  
✅ **YAGNI**: Only built what's needed, no over-engineering  
✅ **DRY**: Reusable components, shared translations  
✅ **Feature-based organization**: All store code in `/features/stores/`  
✅ **Type safety**: Full TypeScript with proper interfaces  
✅ **Responsive design**: Mobile-first approach  
✅ **Accessibility**: Semantic HTML, proper labels  
✅ **i18n support**: 3 languages from day one

## Summary

✨ **Multi-store architecture implemented**  
🎨 **Beautiful UI matching the design**  
📱 **Fully responsive**  
🌍 **i18n ready (EN, FR, ID)**  
🏗️ **Clean architecture principles**  
📊 **Database schema updated**  
📝 **Comprehensive documentation**  
🚀 **Ready for backend integration**

---

**Status**: ✅ Frontend Complete | ⏳ Backend Pending  
**Route**: `/stores`  
**Migration needed**: Yes (run `npx prisma migrate dev`)
