import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { TenantTypeDto } from './tenant-type.dto';

export class UpdateTenantTypeDto extends PartialType(TenantTypeDto) {
  @Length(2, 200)
  @ApiProperty()
  name?: string;

  @Length(2, 500)
  @ApiProperty()
  description?: string;

  @Length(2, 50)
  @ApiProperty()
  tag?: string;

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypesId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  childrenId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  rolesId?: number[];
}
