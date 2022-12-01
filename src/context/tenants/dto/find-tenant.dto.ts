import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateTenantDto } from './create-tenant.dto';

export class FindTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  parentIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  coverageZoneIds: number[];

  @ApiProperty({ nullable: true, type: [String] })
  urls: string[];

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  userIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  childrenIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  roleAliasesIds?: number[];
}
