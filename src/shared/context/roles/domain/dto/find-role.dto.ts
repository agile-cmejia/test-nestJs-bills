import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class FindRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  @IsNotEmpty()
  @Length(2, 100)
  ids: number[];

  @ApiProperty({ nullable: true, type: [String] })
  @IsNotEmpty()
  @Length(2, 100)
  names: string[];

  @ApiProperty({ nullable: true, type: [String] })
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 400)
  descriptions: string[];

  @ApiProperty({ nullable: true, type: [String] })
  @IsNotEmpty()
  @Length(2, 50)
  tags: string[];

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  BackOfficeAccess?: boolean;

  @ApiProperty()
  SaasAccess?: boolean;

  @ApiProperty()
  tenantSpecific: boolean;

  @ApiProperty()
  tenantCreatorIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  aliasIds?: number[];
}
