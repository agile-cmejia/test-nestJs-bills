import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { TenantTypeDto } from './tenant-type.dto';

export class CreateTenantTypeDto implements Omit<TenantTypeDto, 'id' | 'createdAt' | 'updatedAt'> {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 500)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty()
  tag: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypesId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  childrenId?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  rolesId?: number[];
}
