import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class OptionsDto {
  @ApiPropertyOptional({
    description: 'Option Number (ON)',
    example: 'OPT-001',
  })
  @IsOptional()
  @IsString()
  optionNumber?: string;

  @ApiPropertyOptional({
    description: 'Option Description (OD)',
    example: 'Extended Warranty',
  })
  @IsOptional()
  @IsString()
  optionDescription?: string;

  @ApiPropertyOptional({
    description: 'Option Group (OG)',
    example: 'Warranty Options',
  })
  @IsOptional()
  @IsString()
  optionGroup?: string;
}

export class LineItemDto {
  @ApiProperty({
    description: 'Product Number (PN) / Item Number - source: line_item_id=12',
    example: 'PROD-001',
  })
  @IsNotEmpty()
  @IsString()
  productNumber: string;

  @ApiProperty({
    description: 'Product Description (PD) / Item Description - source: line_item_id=12',
    example: 'Office Chair',
  })
  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @ApiProperty({
    description: 'Catalog Code (MC) / Line Catalogue - source: line_item_id=13',
    example: 'CAT-001',
  })
  @IsNotEmpty()
  @IsString()
  catalogCode: string;

  @ApiPropertyOptional({
    description: 'Manufacturer Code (EC) / Line Manufacturer - source: line_item_id=13',
    example: 'MFG-001',
  })
  @IsOptional()
  @IsString()
  manufacturerCode?: string;

  @ApiPropertyOptional({
    description: 'All tag fields TG, GC, T3, T4, T5, L1, L2, L3',
    type: [String],
    example: ['TAG1', 'TAG2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Line Item Quantity (QT) / QTY Ordered - source: line_item_id=13',
    example: 10,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({
    description: 'Product List Price (PL) / Unit List Price - source: line_item_id=13',
    example: 100.0,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  productList?: number;

  @ApiProperty({
    description: 'Product Sell Price (SP / PS)',
    example: 90.0,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productSell: number;

  @ApiPropertyOptional({
    description: 'Product Cost (BP / PB) / Unit Net Price - source: line_item_id=12',
    example: 70.0,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  productCost?: number;

  @ApiPropertyOptional({
    description: 'Sell Discount Percentage (S-)',
    example: 10,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  sellDiscount?: number;

  @ApiPropertyOptional({
    description: 'Purchase Discount Percentage (P%)',
    example: 5,
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  purchaseDiscount?: number;

  @ApiPropertyOptional({
    description: 'Line total product amount (PT-like)',
    example: 700.0,
  })
  @IsOptional()
  @IsNumber()
  totalProduct?: number;

  @ApiPropertyOptional({
    description: 'Line total list amount (TL-like)',
    example: 1000.0,
  })
  @IsOptional()
  @IsNumber()
  totalList?: number;

  @ApiPropertyOptional({
    description: 'Line total sell amount (TS-like)',
    example: 900.0,
  })
  @IsOptional()
  @IsNumber()
  totalSell?: number;

  @ApiPropertyOptional({
    description: 'Line total purchase amount (TP-like)',
    example: 665.0,
  })
  @IsOptional()
  @IsNumber()
  totalPurchase?: number;

  @ApiPropertyOptional({
    description: 'Option information (ON, OD, OG)',
    type: OptionsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OptionsDto)
  options?: OptionsDto;

  @ApiPropertyOptional({
    description: 'Customer Order Line Item # - source: line_item_id=12',
    example: 'COLI-001',
  })
  @IsOptional()
  @IsString()
  customerOrderLineItemNumber?: string;

  @ApiPropertyOptional({
    description: 'Extended List Price - source: line_item_id=13',
    example: 1000.0,
  })
  @IsOptional()
  @IsNumber()
  extendedListPrice?: number;

  @ApiPropertyOptional({
    description: 'Extended Net Price - source: line_item_id=12',
    example: 700.0,
  })
  @IsOptional()
  @IsNumber()
  extendedNetPrice?: number;

  @ApiPropertyOptional({
    description: 'GL Account - source: line_item_id=3',
    example: 'GL-001',
  })
  @IsOptional()
  @IsString()
  glAccount?: string;

  @ApiPropertyOptional({
    description: 'Line Comments - source: line_item_id=13',
    example: 'Special handling required',
  })
  @IsOptional()
  @IsString()
  lineComments?: string;

  @ApiPropertyOptional({
    description: 'Line Number - source: line_item_id=13',
    example: '1',
  })
  @IsOptional()
  @IsString()
  lineNumber?: string;

  @ApiPropertyOptional({
    description: 'Line Status - source: line_item_id=13',
    example: 'Active',
  })
  @IsOptional()
  @IsString()
  lineStatus?: string;

  @ApiPropertyOptional({
    description: 'QTY Backordered - source: line_item_id=12',
    example: '2',
  })
  @IsOptional()
  @IsString()
  qtyBackordered?: string;

  @ApiPropertyOptional({
    description: 'QTY Shipped - source: line_item_id=12',
    example: '8',
  })
  @IsOptional()
  @IsString()
  qtyShipped?: string;

  @ApiPropertyOptional({
    description: 'SKU/Part Number - source: line_item_id=13',
    example: 'SKU-001',
  })
  @IsOptional()
  @IsString()
  skuPartNumber?: string;
}
