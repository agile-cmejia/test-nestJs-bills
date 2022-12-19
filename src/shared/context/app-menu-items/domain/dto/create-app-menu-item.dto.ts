import { AppMenuItemDto } from './app-menu-item.dto';
import { IssuerEnum } from './../../../../dataTypes/Enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';

export class CreateAppMenuItemDto implements Omit<AppMenuItemDto, 'id' | 'createdAt' | 'updatedAt'> {
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
