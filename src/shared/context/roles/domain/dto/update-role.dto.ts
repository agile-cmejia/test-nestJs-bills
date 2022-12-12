import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  @Length(2, 100)
  name?: string;

  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  @Length(2, 400)
  description?: string;

  @ApiProperty({ nullable: true })
  @IsNotEmpty()
  @Length(2, 50)
  tag?: string;

  @ApiProperty({ nullable: true })
  enabled?: boolean;

  @ApiProperty({ nullable: true })
  BackOfficeAccess?: boolean;

  @ApiProperty({ nullable: true })
  SaasAccess?: boolean;

  @ApiProperty({ nullable: true })
  tenantSpecific?: boolean;

  @ApiProperty({ nullable: true })
  tenantCreatorId?: number;

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypesIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  aliases?: number[];
}
