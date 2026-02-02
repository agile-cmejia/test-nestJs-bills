import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export enum InvoiceStatus {
  PENDING = 'Pending',
  IN_REVIEW = 'InReview',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
  CANCELLED = 'Cancelled',
}

export class BillInfoDto {
  @ApiProperty({
    description: 'Invoice Number - source: record_additional_field_93',
    example: 'INV-2025-001',
  })
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @ApiProperty({
    description: 'Invoice Date - source: record_additional_field_94',
    example: '2025-01-15',
  })
  @IsNotEmpty()
  @IsDateString()
  invoiceDate: string;

  @ApiPropertyOptional({
    description: 'Invoice Type',
    example: 'Standard',
  })
  @IsOptional()
  @IsString()
  invoiceType?: string;

  @ApiPropertyOptional({
    description: 'Acknowledgement Number',
    example: 'ACK-2025-001',
  })
  @IsOptional()
  @IsString()
  acknowledgementNumber?: string;

  @ApiPropertyOptional({
    description: 'PO Number - source: record_additional_field_96',
    example: 'PO-2025-001',
  })
  @IsOptional()
  @IsString()
  poNumber?: string;

  @ApiPropertyOptional({
    description: 'PO Date',
    example: '2025-01-10',
  })
  @IsOptional()
  @IsDateString()
  poDate?: string;

  @ApiPropertyOptional({
    description: 'Due Date - source: record_additional_field_99',
    example: '2025-02-15',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Discount Due Date',
    example: '2025-02-01',
  })
  @IsOptional()
  @IsDateString()
  discountDueDate?: string;

  @ApiPropertyOptional({
    description: 'Discount Terms - source: record_additional_field_105',
    example: '2/10 Net 30',
  })
  @IsOptional()
  @IsString()
  discountTerms?: string;

  @ApiPropertyOptional({
    description: 'Terms - source: record_additional_field_97',
    example: 'Net 30',
  })
  @IsOptional()
  @IsString()
  terms?: string;

  @ApiPropertyOptional({
    description: 'Date Paid',
    example: '2025-02-10',
  })
  @IsOptional()
  @IsDateString()
  datePaid?: string;

  @ApiPropertyOptional({
    description: 'Ship Date - source: record_additional_field_109',
    example: '2025-01-20',
  })
  @IsOptional()
  @IsDateString()
  shipDate?: string;

  @ApiPropertyOptional({
    description: 'Shipment Number',
    example: 'SHIP-001',
  })
  @IsOptional()
  @IsString()
  shipmentNumber?: string;

  @ApiPropertyOptional({
    description: 'Tracking Number',
    example: 'TRACK123456789',
  })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiPropertyOptional({
    description: 'Universal Number',
    example: 'UNIV-001',
  })
  @IsOptional()
  @IsString()
  universalNumber?: string;

  @ApiPropertyOptional({
    description: 'Current high-level status of the bill',
    enum: InvoiceStatus,
    example: InvoiceStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  invoiceStatus?: InvoiceStatus;
}
