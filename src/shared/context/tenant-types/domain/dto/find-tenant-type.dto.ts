import { PartialType, ApiProperty } from '@nestjs/swagger';
import { TenantTypeDto } from './tenant-type.dto';

export class FindTenantTypeDto extends PartialType(TenantTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  tags?: string[];

  @ApiProperty({ nullable: true })
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypesId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  childrenId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  rolesId?: number[];
}
