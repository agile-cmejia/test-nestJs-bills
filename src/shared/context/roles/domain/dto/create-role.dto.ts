import { RoleDto } from './role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto implements Omit<RoleDto, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 400)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 50)
  tag: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  BackOfficeAccess?: boolean;

  @ApiProperty()
  SaasAccess?: boolean;

  @ApiProperty()
  tenantSpecific: boolean;

  @ApiProperty()
  tenantCreatorId?: number;

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypesIds?: number[];

  /* 
  @ApiProperty({ nullable: true, type: [Number] })
  aliases?: number[];
 */
}
