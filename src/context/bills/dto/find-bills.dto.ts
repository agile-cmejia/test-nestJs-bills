import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus } from './bill-info.dto';

export class FindBillsDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Filter by Invoice Number',
    example: 'INV-2025-001',
  })
  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @ApiPropertyOptional({
    description: 'Filter by Vendor Name',
    example: 'Acme Corporation',
  })
  @IsOptional()
  @IsString()
  vendorName?: string;

  @ApiPropertyOptional({
    description: 'Filter by Invoice Status',
    enum: InvoiceStatus,
    example: InvoiceStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(InvoiceStatus)
  invoiceStatus?: InvoiceStatus;

  @ApiPropertyOptional({
    description: 'Filter by PO Number',
    example: 'PO-2025-001',
  })
  @IsOptional()
  @IsString()
  poNumber?: string;
}
