# Database Change Request

## Date: 2026-02-02
## Requested By: BILLS-06 - BillsService findAll implementation

## New Entity Required

### Entity Name: `Bill`

### Table Name: `bills`

### Columns:
| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NO | uuid_generate_v4() | Primary key |
| tenant_id | integer | NO | - | Tenant ID for multi-tenancy isolation |
| data | jsonb | NO | - | Bill data matching bill_schema.json structure |
| created_at | timestamp | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | timestamp | NO | CURRENT_TIMESTAMP | Last update timestamp |

### Indexes:
- `IDX_BILLS_TENANT_ID` on `tenant_id` (non-unique) - For tenant isolation queries
- `IDX_BILLS_TENANT_INVOICE` on `(tenant_id, (data->>'billInfo'->>'invoiceNumber'))` (unique) - For unique invoice lookup per tenant

### Relations:
- `ManyToOne` to `Tenant` via `tenant_id` (if Tenant entity exists in avanto-db)

### Constraints:
- `NOT NULL` on all columns
- `UNIQUE` constraint on `(tenant_id, data->>'billInfo'->>'invoiceNumber')` for invoice uniqueness per tenant
- `FOREIGN KEY` to `tenants` table via `tenant_id` (if Tenant entity exists)

### JSONB Data Structure:
The `data` column stores bill information matching `bill_schema.json`:
- `billInfo` - Core bill header information (invoiceNumber, invoiceDate, invoiceStatus, poNumber, etc.)
- `vendor` - Vendor information (vendorName, vendorAddress, etc.)
- `lineItems` - Array of line items
- `dealer`, `billing`, `shipping`, `project`, `contract`, `financials`, `sourceDocument`, `workflow`, `warrantyInformation`, `metadata` - Optional sections

### Migration Notes:
- Create table with JSONB column for flexible bill data storage
- Add indexes for query performance (tenant isolation and invoice lookup)
- Ensure tenant_id is indexed for efficient filtering
- Consider GIN index on JSONB data column if complex JSON queries are needed

## Query Patterns Expected:
- Filter by `data->>'billInfo'->>'invoiceNumber'`
- Filter by `data->>'vendor'->>'vendorName'`
- Filter by `data->>'billInfo'->>'invoiceStatus'`
- Filter by `data->>'billInfo'->>'poNumber'`
- All queries must include `tenant_id` in WHERE clause for isolation
