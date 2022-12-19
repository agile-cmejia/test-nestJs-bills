import { IssuerEnum } from './../../../../dataTypes/Enums';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateAppModuleDto } from './create-app-module.dto';

export class FindAppModuleDto extends PartialType(CreateAppModuleDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  tags?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  routes?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  orders?: number[];

  @ApiProperty({ enum: IssuerEnum })
  application: IssuerEnum;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  appSectionIds?: number[];
}
