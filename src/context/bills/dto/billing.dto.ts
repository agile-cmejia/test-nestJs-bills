import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BillingDto {
  @ApiPropertyOptional({
    description: 'Property Address',
    example: '123 Main St, City, State 12345',
  })
  @IsOptional()
  @IsString()
  propertyAddress?: string;

  @ApiPropertyOptional({
    description: 'GL Code',
    example: 'GL-001',
  })
  @IsOptional()
  @IsString()
  glCode?: string;

  @ApiPropertyOptional({
    description: 'Optional override GL Code (if used)',
    example: 'GL-OVERRIDE-001',
  })
  @IsOptional()
  @IsString()
  glCodeOverride?: string;
}
