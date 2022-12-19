import { IssuerEnum } from './../../../../dataTypes/Enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateAppModuleDto } from './create-app-module.dto';

export class UpdateAppModuleDto extends PartialType(CreateAppModuleDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty()
  tag: string;

  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  route: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(1000)
  @ApiProperty()
  order: number;

  @IsNotEmpty()
  @ApiProperty({ enum: IssuerEnum })
  application: IssuerEnum;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  appSectionIds?: number[];
}
