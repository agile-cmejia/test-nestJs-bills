import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ContractDto {
  @ApiPropertyOptional({
    description: 'Contract #',
    example: 'CONTRACT-001',
  })
  @IsOptional()
  @IsString()
  contractNumber?: string;

  @ApiPropertyOptional({
    description: 'Contract Name',
    example: 'Master Service Agreement',
  })
  @IsOptional()
  @IsString()
  contractName?: string;
}
