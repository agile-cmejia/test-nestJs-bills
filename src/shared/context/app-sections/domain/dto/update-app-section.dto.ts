import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';
import { CreateAppSectionDto } from './create-app-section.dto';

export class UpdateAppSectionDto extends PartialType(CreateAppSectionDto) {
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

  @ApiProperty()
  enabled: boolean;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  appModuleId: number;

  @ApiProperty({ nullable: true, type: [Number] })
  menuItemIds?: number[];
}
