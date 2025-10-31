# API Specification

Complete REST API documentation for Epidom Dashboard backend implementation.

## Base URL

```
Production: https://api.epidom.com/v1
Development: http://localhost:3000/api
```

## Authentication

All API requests require authentication via NextAuth session cookie or JWT token.

```typescript
// Headers
Authorization: Bearer <token>
Cookie: next-auth.session-token=<session>
```

## Common Response Format

```typescript
// Success Response
{
  success: true,
  data: T,
  meta?: PaginationMeta
}

// Error Response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}

// Pagination Meta
{
  page: number,
  limit: number,
  total: number,
  totalPages: number
}
```

## Common Query Parameters

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `sortBy` (string): Field to sort by
- `sortOrder` ("asc" | "desc"): Sort order (default: "asc")
- `search` (string): Search term for full-text search

---

## Materials API

### GET /api/materials

List all materials with filtering and pagination.

**Query Parameters:**

- Common pagination params
- `category` (MaterialCategory | MaterialCategory[]): Filter by category
- `supplierId` (string): Filter by supplier
- `stockStatus` ("critical" | "low" | "ok" | "excess"): Filter by stock status
- `search` (string): Search by name, SKU, or description

**Response:** `PaginatedResponse<Material>`

### GET /api/materials/:id

Get single material with full details.

**Response:** `ApiResponse<Material & { stockMovements: StockMovement[] }>`

### POST /api/materials

Create new material.

**Request Body:** `CreateMaterialDto`

```typescript
{
  name: string,
  sku?: string,
  category: MaterialCategory,
  description?: string,
  supplierId: string,
  unit: string,
  costPerUnit: number,
  minStock: number,
  maxStock: number,
  location?: string,
  barcode?: string,
  imageUrl?: string
}
```

**Response:** `ApiResponse<Material>` (201 Created)

### PATCH /api/materials/:id

Update material.

**Request Body:** `UpdateMaterialDto` (all fields optional)

**Response:** `ApiResponse<Material>`

### DELETE /api/materials/:id

Delete material (soft delete recommended).

**Response:** `ApiResponse<{ deleted: boolean }>`

### POST /api/materials/bulk

Bulk operations (create, update, delete).

**Request Body:**

```typescript
{
  operation: "create" | "update" | "delete",
  items: Array<CreateMaterialDto | UpdateMaterialDto | { id: string }>
}
```

**Response:** `ApiResponse<BulkOperationResult>`

### GET /api/materials/export

Export materials data.

**Query Parameters:**

- `format` ("csv" | "excel" | "pdf")
- All filter params from GET /api/materials

**Response:** File download

---

## Recipes API

### GET /api/recipes

List recipes with ingredients.

**Query Parameters:**

- Common pagination params
- `category` (string): Filter by category
- `search` (string): Search by name or description

**Response:** `PaginatedResponse<Recipe>`

### GET /api/recipes/:id

Get recipe with full ingredients list and cost breakdown.

**Response:** `ApiResponse<Recipe & { totalCost: number }>`

### POST /api/recipes

Create recipe with ingredients.

**Request Body:** `CreateRecipeDto`

```typescript
{
  name: string,
  description?: string,
  category?: string,
  yieldQuantity: number,
  yieldUnit: string,
  productionTimeMinutes: number,
  instructions?: string,
  ingredients: Array<{
    materialId: string,
    quantity: number,
    unit: string,
    notes?: string
  }>
}
```

**Response:** `ApiResponse<Recipe>` (201 Created)

### PATCH /api/recipes/:id

Update recipe.

**Request Body:** `UpdateRecipeDto`

**Response:** `ApiResponse<Recipe>`

### DELETE /api/recipes/:id

Delete recipe.

**Response:** `ApiResponse<{ deleted: boolean }>`

### POST /api/recipes/:id/duplicate

Duplicate recipe with new name.

**Request Body:**

```typescript
{
  newName: string;
}
```

**Response:** `ApiResponse<Recipe>` (201 Created)

---

## Products API

### GET /api/products

List products.

**Query Parameters:**

- Common pagination params
- `category` (string): Filter by category
- `hasRecipe` (boolean): Filter products with/without recipe
- `search` (string)

**Response:** `PaginatedResponse<Product>`

### GET /api/products/:id

Get product with recipe and sales history.

**Response:** `ApiResponse<Product & { salesHistory?: any[] }>`

### POST /api/products

Create product.

**Request Body:** `CreateProductDto`

**Response:** `ApiResponse<Product>` (201 Created)

### PATCH /api/products/:id

Update product.

**Request Body:** `UpdateProductDto`

**Response:** `ApiResponse<Product>`

### DELETE /api/products/:id

Delete product.

**Response:** `ApiResponse<{ deleted: boolean }>`

---

## Suppliers API

### GET /api/suppliers

List suppliers.

**Query Parameters:**

- Common pagination params
- `city` (string)
- `country` (string)
- `rating` (number): Minimum rating
- `search` (string)

**Response:** `PaginatedResponse<Supplier>`

### GET /api/suppliers/:id

Get supplier with materials and performance metrics.

**Response:**

```typescript
ApiResponse<
  Supplier & {
    materials: Material[];
    performanceMetrics: {
      totalOrders: number;
      onTimeDeliveryRate: number;
      averageRating: number;
    };
  }
>;
```

### GET /api/suppliers/:id/orders

Get order history with supplier.

**Query Parameters:** Common pagination params

**Response:** `PaginatedResponse<Order>`

### POST /api/suppliers

Create supplier.

**Request Body:** `CreateSupplierDto`

**Response:** `ApiResponse<Supplier>` (201 Created)

### PATCH /api/suppliers/:id

Update supplier.

**Request Body:** `UpdateSupplierDto`

**Response:** `ApiResponse<Supplier>`

### DELETE /api/suppliers/:id

Delete supplier.

**Response:** `ApiResponse<{ deleted: boolean }>`

---

## Orders API

### GET /api/orders

List orders.

**Query Parameters:**

- Common pagination params
- `status` (OrderStatus | OrderStatus[]): Filter by status
- `paymentStatus` (PaymentStatus | PaymentStatus[]): Filter by payment status
- `dateFrom` (ISO date string): Filter from date
- `dateTo` (ISO date string): Filter to date
- `search` (string): Search by order number, customer name

**Response:** `PaginatedResponse<Order>`

### GET /api/orders/:id

Get order with items and status history.

**Response:**

```typescript
ApiResponse<
  Order & {
    items: OrderItem[];
    statusHistory: OrderStatusHistory[];
  }
>;
```

### POST /api/orders

Create order.

**Request Body:** `CreateOrderDto`

**Response:** `ApiResponse<Order>` (201 Created)

### PATCH /api/orders/:id

Update order.

**Request Body:** `UpdateOrderDto`

**Response:** `ApiResponse<Order>`

### PATCH /api/orders/:id/status

Update order status.

**Request Body:**

```typescript
{
  status: OrderStatus,
  notes?: string
}
```

**Response:** `ApiResponse<Order>`

### POST /api/orders/:id/schedule-delivery

Schedule delivery.

**Request Body:**

```typescript
{
  deliveryDate: ISO date string,
  driverId?: string,
  notes?: string
}
```

**Response:** `ApiResponse<Order>`

### DELETE /api/orders/:id

Cancel/delete order.

**Response:** `ApiResponse<{ deleted: boolean }>`

---

## Stock/Inventory API

### GET /api/stock

Get current stock levels for all materials and products.

**Query Parameters:**

- Common pagination params
- `type` ("material" | "product")
- `category` (string)
- `stockStatus` ("critical" | "low" | "ok" | "excess")
- `search` (string)

**Response:**

```typescript
PaginatedResponse<{
  id: string;
  name: string;
  type: "material" | "product";
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  status: "critical" | "low" | "ok" | "excess";
}>;
```

### GET /api/stock/movements

Get stock movement history.

**Query Parameters:**

- Common pagination params
- `materialId` (string)
- `productId` (string)
- `type` (MovementType)
- `dateFrom` (ISO date string)
- `dateTo` (ISO date string)

**Response:** `PaginatedResponse<StockMovement>`

### POST /api/stock/adjust

Manual stock adjustment.

**Request Body:** `StockAdjustmentDto`

```typescript
{
  materialId?: string,
  productId?: string,
  type: MovementType,
  quantity: number,
  reason?: string,
  notes?: string
}
```

**Response:** `ApiResponse<StockMovement>` (201 Created)

### GET /api/stock/low-stock

Get items below minimum stock level.

**Response:** `ApiResponse<Array<Material | Product>>`

### GET /api/stock/export

Export stock data.

**Query Parameters:**

- `format` ("csv" | "excel" | "pdf")
- All filter params from GET /api/stock

**Response:** File download

---

## Production API

### GET /api/production/batches

List production batches.

**Query Parameters:**

- Common pagination params
- `status` (ProductionStatus | ProductionStatus[])
- `recipeId` (string)
- `dateFrom` (ISO date string)
- `dateTo` (ISO date string)
- `search` (string): Search by batch number

**Response:** `PaginatedResponse<ProductionBatch>`

### GET /api/production/batches/:id

Get batch details with materials consumed.

**Response:**

```typescript
ApiResponse<
  ProductionBatch & {
    materialsConsumed: Array<{
      materialId: string;
      materialName: string;
      quantityUsed: number;
      unit: string;
    }>;
  }
>;
```

### POST /api/production/batches

Start new production batch.

**Request Body:** `CreateProductionBatchDto`

```typescript
{
  recipeId: string,
  quantityPlanned: number,
  operatorId?: string,
  operatorName?: string
}
```

**Response:** `ApiResponse<ProductionBatch>` (201 Created)

### PATCH /api/production/batches/:id

Update batch status.

**Request Body:** `UpdateProductionBatchDto`

```typescript
{
  status?: ProductionStatus,
  quantityProduced?: number,
  qualityScore?: number,
  qualityNotes?: string
}
```

**Response:** `ApiResponse<ProductionBatch>`

### GET /api/production/history

Get production history with metrics.

**Query Parameters:**

- `dateFrom` (ISO date string)
- `dateTo` (ISO date string)
- `recipeId` (string)
- `groupBy` ("day" | "week" | "month")

**Response:**

```typescript
ApiResponse<{
  data: Array<{
    date: string;
    quantity: number;
    revenue?: number;
  }>;
  summary: {
    totalProduced: number;
    averageQuality: number;
    efficiency: number;
  };
}>;
```

---

## Alerts API

### GET /api/alerts

List alerts.

**Query Parameters:**

- Common pagination params
- `type` (AlertType | AlertType[])
- `priority` (AlertPriority | AlertPriority[])
- `status` (AlertStatus | AlertStatus[])
- `dateFrom` (ISO date string)
- `dateTo` (ISO date string)

**Response:** `PaginatedResponse<Alert>`

### GET /api/alerts/:id

Get alert details.

**Response:** `ApiResponse<Alert>`

### PATCH /api/alerts/:id/resolve

Mark alert as resolved.

**Request Body:** `ResolveAlertDto`

```typescript
{
  resolutionNotes?: string
}
```

**Response:** `ApiResponse<Alert>`

### POST /api/alerts/bulk-resolve

Bulk resolve alerts.

**Request Body:**

```typescript
{
  alertIds: string[],
  resolutionNotes?: string
}
```

**Response:** `ApiResponse<BulkOperationResult>`

---

## Analytics/Reports API

### GET /api/analytics/dashboard

Get dashboard statistics.

**Query Parameters:**

- `storeId` (string): Filter by store
- `dateFrom` (ISO date string)
- `dateTo` (ISO date string)

**Response:** `ApiResponse<DashboardStats>`

### GET /api/analytics/production-history

Get production history chart data.

**Query Parameters:**

- `period` ("week" | "month" | "quarter" | "year")
- `recipeId` (string): Optional filter

**Response:**

```typescript
ApiResponse<{
  data: ProductionHistoryData[];
  period: string;
}>;
```

### POST /api/reports/generate

Generate custom report.

**Request Body:**

```typescript
{
  type: "inventory" | "production" | "orders" | "financial",
  format: "csv" | "excel" | "pdf",
  dateRange: {
    from: ISO date string,
    to: ISO date string
  },
  filters?: Record<string, any>,
  emailTo?: string
}
```

**Response:**

```typescript
ApiResponse<{
  reportId: string;
  downloadUrl?: string;
  emailSent?: boolean;
}>;
```

---

## Error Codes

| Code                 | Description                       |
| -------------------- | --------------------------------- |
| `AUTH_REQUIRED`      | Authentication required           |
| `FORBIDDEN`          | Insufficient permissions          |
| `NOT_FOUND`          | Resource not found                |
| `VALIDATION_ERROR`   | Request validation failed         |
| `DUPLICATE_ENTRY`    | Resource already exists           |
| `DEPENDENCY_EXISTS`  | Cannot delete due to dependencies |
| `INSUFFICIENT_STOCK` | Not enough stock for operation    |
| `INTERNAL_ERROR`     | Server error                      |

---

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per user
- Bulk operations count as single request

## Webhooks

Configure webhooks for real-time notifications:

- `alert.created` - New alert created
- `order.status_changed` - Order status updated
- `stock.low` - Stock below minimum
- `production.batch_completed` - Batch completed

---

## Notes for Backend Implementation

1. All timestamps should be in ISO 8601 format
2. Implement soft deletes for audit trail
3. Use transactions for operations affecting multiple tables
4. Log all data modifications for audit
5. Implement proper indexing for search and filter fields
6. Cache frequently accessed data (materials, recipes)
7. Validate stock availability before production/orders
8. Send notifications for critical alerts
9. Generate unique identifiers for orders, batches, etc.
10. Store monetary values as integers (cents) to avoid floating-point errors
