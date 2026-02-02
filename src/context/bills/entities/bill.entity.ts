/**
 * Bill Entity Interface
 *
 * This is a placeholder interface for the Bill entity that will be fully implemented in BILLS-11.
 * The actual entity will be created with TypeORM decorators and will match this structure.
 *
 * Entity Structure (to be implemented in BILLS-11):
 * - id: UUID (Primary Key)
 * - tenantId: number (for tenant isolation)
 * - data: JSONB (stores bill data matching bill_schema.json structure)
 * - createdAt: Date
 * - updatedAt: Date
 */
export interface Bill {
  id: string;
  tenantId: number;
  data: {
    billInfo?: {
      invoiceNumber?: string;
      invoiceDate?: string;
      invoiceStatus?: string;
      poNumber?: string;
    };
    vendor?: {
      vendorName?: string;
    };
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}
