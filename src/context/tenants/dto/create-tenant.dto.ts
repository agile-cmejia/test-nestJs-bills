import { TenantDto } from './tenant.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateTenantDto implements Omit<TenantDto, 'id' | 'createdAt' | 'updatedAt'> {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 400)
  @ApiProperty()
  description: string;

  @ApiProperty()
  parentId?: number;

  @IsNotEmpty()
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
