import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { CoverageZoneDto } from './coverage-zone.dto';

export class CreateCoverageZoneDto implements Omit<CoverageZoneDto, 'id' | 'createdAt' | 'updatedAt'> {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 400)
  @ApiProperty()
  description: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  tenantIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  locationIds?: number[];
}
