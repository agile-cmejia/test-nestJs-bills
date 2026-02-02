import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class VendorDto {
  @ApiProperty({
    description: 'Vendor Name - source: record_additional_field_16',
    example: 'Acme Corporation',
  })
  @IsNotEmpty()
  @IsString()
  vendorName: string;

  @ApiPropertyOptional({
    description: 'Vendor ID - source: record_additional_field_149',
    example: 'VENDOR-001',
  })
  @IsOptional()
  @IsString()
  vendorId?: string;

  @ApiPropertyOptional({
    description: 'Vendor Internal Number',
    example: 'INT-001',
  })
  @IsOptional()
  @IsString()
  vendorInternalNumber?: string;

  @ApiPropertyOptional({
    description: 'Vendor PO Number',
    example: 'VPO-001',
  })
  @IsOptional()
  @IsString()
  vendorPoNumber?: string;

  @ApiPropertyOptional({
    description: 'Vendor Sales Order Number',
    example: 'VSO-001',
  })
  @IsOptional()
  @IsString()
  vendorSalesOrderNumber?: string;

  @ApiPropertyOptional({
    description: 'Manufacturer',
    example: 'Manufacturer Name',
  })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiPropertyOptional({
    description: 'Region - source: record_additional_field_248',
    example: 'North America',
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    description: 'Facility Partner - source: list_id=68 + lists_values',
    example: 'Facility Partner Name',
  })
  @IsOptional()
  @IsString()
  facilityPartner?: string;
}
