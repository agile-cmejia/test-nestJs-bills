import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class DealerDto {
  @ApiPropertyOptional({
    description: 'Dealer Company',
    example: 'Dealer Company Name',
  })
  @IsOptional()
  @IsString()
  dealerCompany?: string;

  @ApiPropertyOptional({
    description: 'Customer Number',
    example: 'CUST-001',
  })
  @IsOptional()
  @IsString()
  customerNumber?: string;

  @ApiPropertyOptional({
    description: 'Customer Email',
    example: 'customer@example.com',
  })
  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @ApiPropertyOptional({
    description: 'Dealer Phone 1',
    example: '+1-555-123-4567',
  })
  @IsOptional()
  @IsString()
  dealerPhone1?: string;

  @ApiPropertyOptional({
    description: 'End Customer Name - source: record_additional_field_173',
    example: 'End Customer Name',
  })
  @IsOptional()
  @IsString()
  endCustomerName?: string;

  @ApiPropertyOptional({
    description: 'End User PO',
    example: 'EU-PO-001',
  })
  @IsOptional()
  @IsString()
  endUserPo?: string;
}
