/**
 * Mock data for user management
 * TODO: Replace with real API calls to /api/users
 */

export interface UserRow {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Viewer";
}

export const MOCK_USERS: UserRow[] = [
  { id: "U-1", email: "mrcaoevan@gmail.com", role: "Admin" },
  { id: "U-2", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-3", email: "mrcaoevan@gmail.com", role: "Manager" },
  { id: "U-4", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-5", email: "mrcaoevan@gmail.com", role: "Viewer" },
  { id: "U-6", email: "mrcaoevan@gmail.com", role: "Viewer" },
];
