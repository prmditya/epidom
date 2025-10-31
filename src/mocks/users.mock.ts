/**
 * Mock data for users and team management
 * TODO: Replace with real API calls to /api/users, /api/team
 */

import { User, TeamMember, UserRole } from "@/types/entities";

// ============================================================================
// USERS
// ============================================================================

export const MOCK_USERS: User[] = [
  {
    id: "USER-001",
    email: "admin@epidom.com",
    name: "Admin User",
    phone: "+33 1 23 45 67 89",
    imageUrl: "/images/avatars/admin.jpg",
    role: UserRole.OWNER,
    locale: "en",
    timezone: "Europe/Paris",
    currency: "EUR",
    businessId: "BUS-001",
    permissions: ["*"],
    lastLoginAt: new Date("2024-10-28T08:30:00"),
    createdAt: new Date("2024-01-01T00:00:00"),
    updatedAt: new Date("2024-10-28T08:30:00"),
  },
  {
    id: "USER-002",
    email: "jean@epidom.com",
    name: "Baker Jean",
    phone: "+33 1 98 76 54 32",
    imageUrl: "/images/avatars/jean.jpg",
    role: UserRole.OPERATOR,
    locale: "fr",
    timezone: "Europe/Paris",
    currency: "EUR",
    businessId: "BUS-001",
    permissions: ["production.create", "production.update", "inventory.view"],
    lastLoginAt: new Date("2024-10-28T05:00:00"),
    createdAt: new Date("2024-01-15T00:00:00"),
    updatedAt: new Date("2024-10-28T05:00:00"),
  },
  {
    id: "USER-003",
    email: "marie@epidom.com",
    name: "Manager Marie",
    phone: "+33 4 56 78 90 12",
    imageUrl: "/images/avatars/marie.jpg",
    role: UserRole.MANAGER,
    locale: "fr",
    timezone: "Europe/Paris",
    currency: "EUR",
    businessId: "BUS-001",
    permissions: [
      "inventory.*",
      "orders.*",
      "production.view",
      "reports.view",
      "alerts.*",
    ],
    lastLoginAt: new Date("2024-10-27T16:30:00"),
    createdAt: new Date("2024-01-20T00:00:00"),
    updatedAt: new Date("2024-10-27T16:30:00"),
  },
  {
    id: "USER-004",
    email: "sophie@epidom.com",
    name: "Baker Sophie",
    phone: "+33 2 34 56 78 90",
    imageUrl: "/images/avatars/sophie.jpg",
    role: UserRole.OPERATOR,
    locale: "fr",
    timezone: "Europe/Paris",
    currency: "EUR",
    businessId: "BUS-001",
    permissions: ["production.create", "production.update", "inventory.view"],
    lastLoginAt: new Date("2024-10-28T09:30:00"),
    createdAt: new Date("2024-02-01T00:00:00"),
    updatedAt: new Date("2024-10-28T09:30:00"),
  },
  {
    id: "USER-005",
    email: "pierre@epidom.com",
    name: "Viewer Pierre",
    phone: "+33 3 45 67 89 01",
    role: UserRole.VIEWER,
    locale: "fr",
    timezone: "Europe/Paris",
    currency: "EUR",
    businessId: "BUS-001",
    permissions: ["*.view"],
    lastLoginAt: new Date("2024-10-26T14:00:00"),
    createdAt: new Date("2024-03-10T00:00:00"),
    updatedAt: new Date("2024-10-26T14:00:00"),
  },
];

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "TM-001",
    userId: "USER-001",
    storeId: "STORE-001",
    role: UserRole.OWNER,
    permissions: ["*"],
    invitedBy: "SYSTEM",
    invitedAt: new Date("2024-01-01T00:00:00"),
    acceptedAt: new Date("2024-01-01T00:00:00"),
  },
  {
    id: "TM-002",
    userId: "USER-002",
    storeId: "STORE-001",
    role: UserRole.OPERATOR,
    permissions: ["production.create", "production.update", "inventory.view"],
    invitedBy: "USER-001",
    invitedAt: new Date("2024-01-15T00:00:00"),
    acceptedAt: new Date("2024-01-15T12:00:00"),
  },
  {
    id: "TM-003",
    userId: "USER-003",
    storeId: "STORE-001",
    role: UserRole.MANAGER,
    permissions: [
      "inventory.*",
      "orders.*",
      "production.view",
      "reports.view",
      "alerts.*",
    ],
    invitedBy: "USER-001",
    invitedAt: new Date("2024-01-20T00:00:00"),
    acceptedAt: new Date("2024-01-20T14:30:00"),
  },
  {
    id: "TM-004",
    userId: "USER-004",
    storeId: "STORE-001",
    role: UserRole.OPERATOR,
    permissions: ["production.create", "production.update", "inventory.view"],
    invitedBy: "USER-001",
    invitedAt: new Date("2024-02-01T00:00:00"),
    acceptedAt: new Date("2024-02-01T10:00:00"),
  },
  {
    id: "TM-005",
    userId: "USER-005",
    storeId: "STORE-001",
    role: UserRole.VIEWER,
    permissions: ["*.view"],
    invitedBy: "USER-003",
    invitedAt: new Date("2024-03-10T00:00:00"),
    acceptedAt: new Date("2024-03-10T16:00:00"),
  },
];

// ============================================================================
// USER ACTIVITY LOG
// ============================================================================

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export const MOCK_USER_ACTIVITY: UserActivity[] = [
  {
    id: "ACT-001",
    userId: "USER-002",
    userName: "Baker Jean",
    action: "production.batch.completed",
    resource: "production_batch",
    resourceId: "BATCH-001",
    details: "Completed batch BT-2024-1028-001 with 29 units",
    ipAddress: "192.168.1.45",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-28T09:15:00"),
  },
  {
    id: "ACT-002",
    userId: "USER-004",
    userName: "Baker Sophie",
    action: "production.batch.started",
    resource: "production_batch",
    resourceId: "BATCH-003",
    details: "Started batch BT-2024-1028-002",
    ipAddress: "192.168.1.46",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-28T09:30:00"),
  },
  {
    id: "ACT-003",
    userId: "USER-003",
    userName: "Manager Marie",
    action: "stock.adjustment",
    resource: "stock_movement",
    resourceId: "MOV-004",
    details: "Recorded waste of 0.5kg dark chocolate",
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-27T14:20:00"),
  },
  {
    id: "ACT-004",
    userId: "USER-001",
    userName: "Admin User",
    action: "material.created",
    resource: "material",
    resourceId: "MAT-008",
    details: "Added new material: Salt",
    ipAddress: "192.168.1.10",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-02-10T10:30:00"),
  },
  {
    id: "ACT-005",
    userId: "USER-003",
    userName: "Manager Marie",
    action: "order.created",
    resource: "order",
    resourceId: "ORD-005",
    details: "Created order ORD-1205 for Supermarché Bio Plus",
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-27T09:00:00"),
  },
  {
    id: "ACT-006",
    userId: "USER-002",
    userName: "Baker Jean",
    action: "order.status.updated",
    resource: "order",
    resourceId: "ORD-001",
    details: "Updated order status to Processing",
    ipAddress: "192.168.1.45",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-26T06:00:00"),
  },
  {
    id: "ACT-007",
    userId: "USER-001",
    userName: "Admin User",
    action: "user.invited",
    resource: "team_member",
    resourceId: "TM-005",
    details: "Invited pierre@epidom.com to join as Viewer",
    ipAddress: "192.168.1.10",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-03-10T00:00:00"),
  },
  {
    id: "ACT-008",
    userId: "USER-003",
    userName: "Manager Marie",
    action: "alert.resolved",
    resource: "alert",
    resourceId: "ALT-006",
    details: "Resolved quality issue alert for dark chocolate",
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0...",
    createdAt: new Date("2024-10-27T16:00:00"),
  },
];

// ============================================================================
// PERMISSION DEFINITIONS
// ============================================================================

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export const MOCK_PERMISSIONS: Permission[] = [
  {
    id: "inventory.view",
    name: "View Inventory",
    description: "View materials, products, and stock levels",
    category: "Inventory",
  },
  {
    id: "inventory.create",
    name: "Create Inventory Items",
    description: "Add new materials and products",
    category: "Inventory",
  },
  {
    id: "inventory.update",
    name: "Update Inventory",
    description: "Edit materials and products",
    category: "Inventory",
  },
  {
    id: "inventory.delete",
    name: "Delete Inventory Items",
    description: "Remove materials and products",
    category: "Inventory",
  },
  {
    id: "production.view",
    name: "View Production",
    description: "View recipes and production batches",
    category: "Production",
  },
  {
    id: "production.create",
    name: "Create Production",
    description: "Start new production batches",
    category: "Production",
  },
  {
    id: "production.update",
    name: "Update Production",
    description: "Update production batch status",
    category: "Production",
  },
  {
    id: "orders.view",
    name: "View Orders",
    description: "View customer orders",
    category: "Orders",
  },
  {
    id: "orders.create",
    name: "Create Orders",
    description: "Create new customer orders",
    category: "Orders",
  },
  {
    id: "orders.update",
    name: "Update Orders",
    description: "Edit and update order status",
    category: "Orders",
  },
  {
    id: "orders.delete",
    name: "Delete Orders",
    description: "Cancel and delete orders",
    category: "Orders",
  },
  {
    id: "alerts.view",
    name: "View Alerts",
    description: "View system alerts",
    category: "Alerts",
  },
  {
    id: "alerts.resolve",
    name: "Resolve Alerts",
    description: "Mark alerts as resolved",
    category: "Alerts",
  },
  {
    id: "reports.view",
    name: "View Reports",
    description: "Access analytics and reports",
    category: "Reports",
  },
  {
    id: "reports.export",
    name: "Export Reports",
    description: "Export data and generate reports",
    category: "Reports",
  },
  {
    id: "team.view",
    name: "View Team",
    description: "View team members",
    category: "Team",
  },
  {
    id: "team.manage",
    name: "Manage Team",
    description: "Invite and manage team members",
    category: "Team",
  },
];
