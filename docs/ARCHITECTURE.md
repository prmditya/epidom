# Epidom Dashboard - Architecture Documentation

## Table of Contents
- [Overview](#overview)
- [SOLID Principles Implementation](#solid-principles-implementation)
- [Architecture Layers](#architecture-layers)
- [Folder Structure](#folder-structure)
- [Data Flow](#data-flow)
- [Adding New Features](#adding-new-features)
- [Best Practices](#best-practices)

## Overview

The Epidom Dashboard follows a **clean, layered architecture** implementing SOLID principles and modern React patterns. The codebase is organized to be maintainable, testable, and scalable.

### Key Architectural Decisions

1. **Layered Architecture**: Separation of concerns across multiple layers
2. **SOLID Principles**: Every layer follows Single Responsibility, Open/Closed, etc.
3. **Type Safety**: End-to-end TypeScript with Zod runtime validation
4. **Configuration-Driven**: Navigation, security, and app settings in config files
5. **Feature-Based Organization**: Code organized by feature, not by type

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
Each module has one reason to change:
- **Repositories**: Only handle database operations
- **Services**: Only contain business logic
- **API Routes**: Only handle HTTP request/response
- **Components**: Only handle UI rendering

### Open/Closed Principle (OCP)
Open for extension, closed for modification:
- **Navigation**: Add new routes in `config/navigation.config.ts` without modifying Sidebar
- **Validation**: Add new schemas without modifying validation logic
- **Services**: Extend via inheritance or composition

### Liskov Substitution Principle (LSP)
- **Repositories**: All extend `BaseRepository` and can be substituted
- **API Clients**: Consistent interface across all API methods

### Interface Segregation Principle (ISP)
- **DTOs**: Specific types for each use case (UserDto, UserProfileDto, UserRefDto)
- **Props**: Components only receive props they need

### Dependency Inversion Principle (DIP)
- **Services depend on Repository abstractions**, not concrete Prisma implementations
- **Components depend on API Client abstractions**, not fetch calls
- **Dependency injection** via constructor parameters (testable!)

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                     React Components                     │
│                  (UI Layer - Presentation)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    Custom Hooks                          │
│            (Business Logic - Client Side)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    API Client Layer                      │
│           (Type-safe HTTP requests with TanStack Query)  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓  HTTP
┌─────────────────────────────────────────────────────────┐
│                    API Routes                            │
│            (Request handling, validation)                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   Service Layer                          │
│             (Business logic, orchestration)              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  Repository Layer                        │
│              (Database access only)                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                   Prisma ORM                             │
│                  (PostgreSQL)                            │
└─────────────────────────────────────────────────────────┘
```

### Layer Descriptions

#### 1. Component Layer (`src/features/*/components/`)
**Responsibility**: UI rendering and user interaction

**Rules**:
- No business logic
- No direct API calls
- Use custom hooks for data fetching
- Keep components small and focused

**Example**:
```tsx
export function ProfileCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <Skeleton />;

  return <div>{profile.name}</div>;
}
```

#### 2. Custom Hooks Layer (`src/features/*/hooks/`)
**Responsibility**: Client-side business logic and state management

**Rules**:
- Use TanStack Query for data fetching
- Handle loading/error states
- Call API client methods
- Contain reusable logic

**Example**:
```tsx
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile(),
  });
}
```

#### 3. API Client Layer (`src/lib/api/`)
**Responsibility**: Type-safe HTTP communication

**Rules**:
- One class per resource (UserApi, BusinessApi, etc.)
- Type-safe methods
- Handle request/response transformation
- Throw ApiClientError on failures

**Example**:
```tsx
export class UserApi {
  async getProfile(): Promise<UserProfileDto> {
    return apiClient.get('/user/profile');
  }
}
```

#### 4. API Routes Layer (`src/app/api/`)
**Responsibility**: HTTP request/response handling

**Rules**:
- Validate input with Zod schemas
- Call service layer methods
- Return standardized responses (ApiResponse)
- Handle authentication/authorization
- Never access database directly

**Example**:
```tsx
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      createErrorResponse(ApiErrorCode.UNAUTHORIZED, "Unauthorized"),
      { status: 401 }
    );
  }

  const profile = await userService.getProfile(session.user.id);

  return NextResponse.json(createSuccessResponse(profile));
}
```

#### 5. Service Layer (`src/lib/services/`)
**Responsibility**: Business logic and orchestration

**Rules**:
- Contains all business rules
- Orchestrates repository calls
- Handles transactions
- Never imports from UI layer
- Throws descriptive errors

**Example**:
```tsx
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getProfile(userId: string): Promise<UserProfileDto> {
    const profile = await this.userRepo.getProfile(userId);
    if (!profile) {
      throw new Error("User not found");
    }
    return profile;
  }
}
```

#### 6. Repository Layer (`src/lib/repositories/`)
**Responsibility**: Database access only

**Rules**:
- Only CRUD operations
- No business logic
- Return Prisma models or null
- All extend BaseRepository
- Support transactions

**Example**:
```tsx
export class UserRepository extends BaseRepository {
  async findById(userId: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id: userId },
    });
  }
}
```

## Folder Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth route group
│   ├── (dashboard)/              # Dashboard route group
│   ├── (landing)/                # Public pages route group
│   ├── (stores)/                 # Store selection route group
│   ├── api/                      # API routes
│   └── layout.tsx                # Root layout with providers
│
├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui primitives
│   ├── lang/                     # i18n components
│   ├── providers/                # React providers
│   │   ├── session-provider.tsx
│   │   └── query-provider.tsx
│   └── error-boundary.tsx
│
├── features/                     # Feature-based organization
│   ├── auth/
│   │   ├── login/
│   │   │   ├── components/       # Login-specific components
│   │   │   ├── hooks/            # Login-specific hooks
│   │   │   └── lib/              # Login-specific utilities
│   │   └── register/
│   │       └── components/
│   ├── dashboard/
│   │   ├── components/           # Shared dashboard components
│   │   ├── dashboard/
│   │   │   └── components/       # Dashboard page components
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   └── hooks/            # useProfile, useUpdateProfile
│   │   └── alerts/
│   │       ├── components/
│   │       └── hooks/            # useAlertsCount
│   └── landing/
│       ├── components/           # Shared landing components
│       ├── pricing/
│       │   └── components/
│       └── services/
│           └── components/
│
├── lib/                          # Shared utilities and infrastructure
│   ├── api/                      # API client layer
│   │   ├── client.ts             # Base API client
│   │   ├── auth.api.ts
│   │   ├── user.api.ts
│   │   └── business.api.ts
│   ├── repositories/             # Data access layer
│   │   ├── base.repository.ts
│   │   ├── user.repository.ts
│   │   ├── business.repository.ts
│   │   └── store.repository.ts
│   ├── services/                 # Business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── business.service.ts
│   ├── validation/               # Zod schemas
│   │   ├── common.schemas.ts
│   │   ├── auth.schemas.ts
│   │   ├── business.schemas.ts
│   │   └── inventory.schemas.ts
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Utility functions
│
├── config/                       # Application configuration
│   ├── app.config.ts             # App settings
│   ├── navigation.config.ts      # Navigation structure
│   └── security.config.ts        # Security settings
│
├── types/                        # TypeScript types
│   ├── api/                      # API response types
│   │   └── responses.ts
│   ├── dto/                      # Data Transfer Objects
│   │   ├── user.dto.ts
│   │   ├── inventory.dto.ts
│   │   └── order.dto.ts
│   └── next-auth.d.ts
│
├── hooks/                        # Shared React hooks
│   ├── use-toast.tsx
│   └── use-intersection-observer.ts
│
└── locales/                      # i18n translations
    └── index.ts
```

## Data Flow

### Reading Data (GET)

```
1. User interacts with Component
   ↓
2. Component uses custom hook (useProfile)
   ↓
3. Hook calls API Client (userApi.getProfile)
   ↓
4. API Client makes HTTP request (GET /api/user/profile)
   ↓
5. API Route validates session
   ↓
6. API Route calls Service (userService.getProfile)
   ↓
7. Service calls Repository (userRepo.getProfile)
   ↓
8. Repository queries Prisma
   ↓
9. Data flows back up the chain
   ↓
10. Component renders with data
```

### Writing Data (POST/PATCH)

```
1. User submits form in Component
   ↓
2. Component uses mutation hook (useUpdateProfile)
   ↓
3. Hook calls API Client (userApi.updateProfile)
   ↓
4. API Client makes HTTP request (PATCH /api/user/profile)
   ↓
5. API Route validates input with Zod
   ↓
6. API Route calls Service (userService.updateProfile)
   ↓
7. Service applies business rules
   ↓
8. Service calls Repository (userRepo.update)
   ↓
9. Repository updates via Prisma
   ↓
10. Success response flows back
   ↓
11. TanStack Query invalidates cache
   ↓
12. Component re-renders with fresh data
```

## Adding New Features

### Example: Adding a Products Feature

#### 1. Create DTOs (`src/types/dto/product.dto.ts`)
```typescript
export interface ProductDto {
  id: string;
  name: string;
  price: Decimal;
  // ... other fields
}
```

#### 2. Create Validation Schemas (`src/lib/validation/product.schemas.ts`)
```typescript
export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  // ... other fields
});
```

#### 3. Create Repository (`src/lib/repositories/product.repository.ts`)
```typescript
export class ProductRepository extends BaseRepository {
  async findById(id: string): Promise<Product | null> {
    return this.db.product.findUnique({ where: { id } });
  }

  async create(data: CreateProductData): Promise<Product> {
    return this.db.product.create({ data });
  }
}
```

#### 4. Create Service (`src/lib/services/product.service.ts`)
```typescript
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async createProduct(storeId: string, input: CreateProductInput): Promise<ProductDto> {
    // Business logic here
    return this.productRepo.create({
      storeId,
      ...input,
    });
  }
}
```

#### 5. Create API Route (`src/app/api/products/route.ts`)
```typescript
export async function POST(request: Request) {
  // Validate session
  // Parse input with Zod
  // Call service
  // Return standardized response
}
```

#### 6. Create API Client (`src/lib/api/product.api.ts`)
```typescript
export class ProductApi {
  async createProduct(input: CreateProductInput): Promise<ProductDto> {
    return apiClient.post('/products', input);
  }
}
```

#### 7. Create Custom Hook (`src/features/dashboard/products/hooks/use-products.ts`)
```typescript
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProductInput) => productApi.createProduct(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

#### 8. Create Components (`src/features/dashboard/products/components/`)
```typescript
export function ProductList() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### 9. Add Navigation (`src/config/navigation.config.ts`)
```typescript
export const dashboardNavigation: NavSection[] = [
  {
    items: [
      // ... existing items
      {
        href: "/products",
        labelKey: "nav.products",
        icon: Package,
      },
    ],
  },
];
```

## Best Practices

### 1. Type Safety
- ✅ Use Zod for runtime validation
- ✅ Define DTOs for all data structures
- ✅ Use TypeScript strict mode
- ❌ Avoid `any` type

### 2. Error Handling
- ✅ Use standardized error responses (ApiErrorResponse)
- ✅ Throw descriptive errors in services
- ✅ Handle errors at the API route level
- ✅ Show user-friendly error messages in UI

### 3. Data Fetching
- ✅ Use TanStack Query for all server state
- ✅ Set appropriate staleTime and gcTime
- ✅ Invalidate queries after mutations
- ✅ Handle loading and error states

### 4. Component Organization
- ✅ Keep components small (< 200 lines)
- ✅ Extract reusable logic to hooks
- ✅ Use feature-based folder structure
- ✅ Colocate related files

### 5. Testing Strategy
- **Unit Tests**: Services, repositories, utilities
- **Integration Tests**: API routes
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright for critical flows

### 6. Performance
- ✅ Use React.memo for expensive components
- ✅ Implement proper query caching
- ✅ Use Next.js Image component
- ✅ Code split with dynamic imports

### 7. Security
- ✅ Validate all user input with Zod
- ✅ Use middleware for authentication
- ✅ Sanitize error messages
- ✅ Follow rate limiting rules from config

## Migration Guide

If you have existing code that doesn't follow this architecture:

### Migrating an API Route

**Before**:
```typescript
export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json({ user });
}
```

**After**:
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = createUserSchema.parse(body);

    const user = await userService.createUser(input);

    return NextResponse.json(createSuccessResponse(user));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        createErrorResponse(ApiErrorCode.VALIDATION_ERROR, "Invalid input"),
        { status: 400 }
      );
    }
    // ... handle other errors
  }
}
```

### Migrating a Component

**Before**:
```typescript
export function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}
```

**After**:
```typescript
export function Profile() {
  const { data: user, isLoading } = useProfile();

  if (isLoading) return <Skeleton />;

  return <div>{user?.name}</div>;
}
```

## Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## Support

For questions or issues with the architecture, please:
1. Review this documentation
2. Check the `/docs` folder for additional guides
3. Open an issue on GitHub with the `architecture` label
