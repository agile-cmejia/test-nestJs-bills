import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty()
  id: number;

  @Length(2, 200)
  @ApiProperty()
  name: string;

  @Length(2, 400)
  @ApiProperty()
  description: string;

  @ApiProperty()
  parentId?: number;

  @ApiProperty()
  coverageZoneId: number;

  @IsNotEmpty()
  @Length(2, 100)
  @ApiProperty()
  url: string;

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
