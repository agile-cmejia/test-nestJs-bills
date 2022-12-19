import { IssuerEnum } from './../../../../dataTypes/Enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length, Max, Min } from 'class-validator';
import { AppModuleDto } from './app-module.dto';

export class CreateAppModuleDto implements Omit<AppModuleDto, 'id' | 'createdAt' | 'updatedAt'> {
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
