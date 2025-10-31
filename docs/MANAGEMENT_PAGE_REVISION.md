# 🛠️ Management Page Feature Revision (Supplier Delivery Focus)

## Context

The current **Management Page** feature was implemented for **customer deliveries**, but this is incorrect.
It should instead manage **deliveries related to suppliers** — for example, tracking shipments from or to suppliers rather than customers.

This revision request focuses solely on correcting the management logic and data model.
There is **no user management system** (no RBAC) — access control or roles are **not part of this scope**.

---

## ❌ Current (Incorrect) Behavior

- The page currently treats deliveries as **customer shipments**.
- Fields and logic refer to **customer information** such as:
  - `customer_name`
  - `customer_address`
  - `delivery_status`
  - `tracking_number`
- This structure does not fit supplier-side operations.

---

## ✅ Expected (Corrected) Behavior

- The page should now manage **supplier deliveries**.
- The logic should focus on **receiving from** or **sending to** suppliers.
- All UI labels, backend models, and data flow should use **supplier terminology**.

### Updated Data Model Example

| Field                | Type                                                   | Description                                                                   |
| -------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `supplier_name`      | string                                                 | The supplier company name                                                     |
| `supplier_contact`   | string                                                 | Contact person or phone number                                                |
| `delivery_reference` | string                                                 | Internal tracking or reference code                                           |
| `delivery_type`      | enum(`incoming`, `outgoing`)                           | Defines whether delivery is inbound (from supplier) or outbound (to supplier) |
| `status`             | enum(`pending`, `in_transit`, `received`, `cancelled`) | Current delivery progress                                                     |
| `expected_date`      | date                                                   | Expected arrival or dispatch date                                             |
| `notes`              | string                                                 | Optional remarks about the delivery                                           |

---

## 🧩 Additional Notes

- **Remove any customer-related fields** in the management page.
- **No RBAC or user management** features are needed — this page is globally accessible within the internal dashboard.
- Ensure consistency between **frontend forms** and **backend endpoints** regarding supplier-based delivery management.
- Consider adding **filtering and sorting** by delivery type and status for better visibility.

---

## Goal

After this revision, the **Management Page** should accurately represent and manage **supplier-side deliveries**, aligning with the intended logistics flow of the system.
