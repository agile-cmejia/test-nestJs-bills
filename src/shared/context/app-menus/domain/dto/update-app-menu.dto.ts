import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';
import { CreateAppMenuDto } from './create-app-menu.dto';

export class UpdateAppMenuDto extends PartialType(CreateAppMenuDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty()
  tag: string;

  @ApiProperty()
  backOfficeModule: boolean;

  @ApiProperty()
  SaasModule: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  @IsPositive()
  appSectionIds?: number[];

  @ApiProperty()
  enabled: boolean;
}
