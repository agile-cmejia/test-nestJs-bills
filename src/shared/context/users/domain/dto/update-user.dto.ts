import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  fireBaseId?: string;

  @ApiProperty()
  validated: boolean;

  @ApiProperty()
  BackOfficeAccess?: boolean;

  @ApiProperty()
  SaasAccess?: boolean;

  @IsNotEmpty()
  @IsEmail()
  @Length(2, 200)
  @ApiProperty()
  email: string;

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  tenantsIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  rolesIds?: number[];
}
