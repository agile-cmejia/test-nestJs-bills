import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCoverageZoneDto } from './create-coverage-zone.dto';

export class FindCoverageZoneDto extends PartialType(CreateCoverageZoneDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  tenantIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  locationIds?: number[];

  @ApiProperty()
  enabled?: boolean;
}
