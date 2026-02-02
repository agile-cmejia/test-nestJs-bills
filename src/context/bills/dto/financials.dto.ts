import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FinancialsDto {
  @ApiPropertyOptional({
    description: 'Invoice Total - source: record_additional_field_95',
    example: 10000.0,
  })
  @IsOptional()
  @IsNumber()
  invoiceTotal?: number;

  @ApiPropertyOptional({
    description: 'PO Total - source: record_additional_field_293',
    example: 9500.0,
  })
  @IsOptional()
  @IsNumber()
  poTotal?: number;

  @ApiPropertyOptional({
    description: 'Product Subtotal',
    example: 9000.0,
  })
  @IsOptional()
  @IsNumber()
  productSubtotal?: number;

  @ApiPropertyOptional({
    description: 'Discount Amount',
    example: 500.0,
  })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiPropertyOptional({
    description: 'Deposit Amount',
    example: 2000.0,
  })
  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @ApiPropertyOptional({
    description: 'Sales Tax - source: record_additional_field_111',
    example: 800.0,
  })
  @IsOptional()
  @IsNumber()
  salesTax?: number;

  @ApiPropertyOptional({
    description: 'Freight - source: record_additional_field_100',
    example: 150.0,
  })
  @IsOptional()
  @IsNumber()
  freight?: number;

  @ApiPropertyOptional({
    description: 'Freight 2 - source: record_additional_field_110',
    example: 50.0,
  })
  @IsOptional()
  @IsNumber()
  freight2?: number;

  @ApiPropertyOptional({
    description: 'Surcharge - source: record_additional_field_224',
    example: 100.0,
  })
  @IsOptional()
  @IsNumber()
  surcharge?: number;

  @ApiPropertyOptional({
    description: 'Tariff - source: record_additional_field_143',
    example: 75.0,
  })
  @IsOptional()
  @IsNumber()
  tariff?: number;

  @ApiPropertyOptional({
    description: 'Balance Due',
    example: 8000.0,
  })
  @IsOptional()
  @IsNumber()
  balanceDue?: number;

  @ApiPropertyOptional({
    description: 'Total Sale Amount',
    example: 10000.0,
  })
  @IsOptional()
  @IsNumber()
  totalSaleAmount?: number;

  @ApiPropertyOptional({
    description: 'Total Gross Profit',
    example: 2000.0,
  })
  @IsOptional()
  @IsNumber()
  totalGrossProfit?: number;

  @ApiPropertyOptional({
    description: 'Gross Margin %',
    example: '20%',
  })
  @IsOptional()
  @IsString()
  grossMarginPercentage?: string;

  @ApiPropertyOptional({
    description: 'Actual Percentage',
    example: '18%',
  })
  @IsOptional()
  @IsString()
  actualPercentage?: string;
}
