import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FindUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  firstNames: string[];

  @ApiProperty({ nullable: true, type: [String] })
  lastNames: string[];

  @ApiProperty()
  fireBaseId?: string;

  @ApiProperty()
  validated: boolean;

  @ApiProperty()
  BackOfficeAccess?: boolean;

  @ApiProperty()
  SaasAccess?: boolean;

  @ApiProperty({ nullable: true, type: [String] })
  emails: string[];

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  tenantsIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  rolesIds?: number[];
}
