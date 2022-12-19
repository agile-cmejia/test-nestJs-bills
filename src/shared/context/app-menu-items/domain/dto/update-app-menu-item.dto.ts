import { IssuerEnum } from './../../../../dataTypes/Enums';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppMenuItemDto } from './create-app-menu-item.dto';

export class UpdateAppMenuItemDto extends PartialType(CreateAppMenuItemDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ enum: IssuerEnum })
  application: IssuerEnum;

  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  route: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  hasRecordTypes?: boolean;

  @ApiProperty()
  @IsPositive()
  recordTypeId?: number;

  @ApiProperty({ nullable: true, type: [Number] })
  appSectionIds?: number[];
}
