import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class ShippingDto {
  @ApiPropertyOptional({
    description: 'Installation Address',
    example: '456 Installation St, City, State 12345',
  })
  @IsOptional()
  @IsString()
  installationAddress?: string;

  @ApiPropertyOptional({
    description: 'AT_Shipping Address - source: record_additional_field_458 + object_value',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  atShippingAddress?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Addresses - source: Addresses Object',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  addresses?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Location - source: list_id=10 + lists_values',
    example: 'Warehouse A',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Floor Number',
    example: 'Floor 3',
  })
  @IsOptional()
  @IsString()
  floorNumber?: string;

  @ApiPropertyOptional({
    description: 'State',
    example: 'CA',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Shipping Method - source: record_additional_field_101',
    example: 'Ground Shipping',
  })
  @IsOptional()
  @IsString()
  shippingMethod?: string;

  @ApiPropertyOptional({
    description: 'FOB Term',
    example: 'FOB Origin',
  })
  @IsOptional()
  @IsString()
  fobTerm?: string;
}
