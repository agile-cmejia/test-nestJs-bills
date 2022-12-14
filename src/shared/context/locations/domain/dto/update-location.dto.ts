import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @ApiProperty()
  parentId?: number | null;

  @ApiProperty({ nullable: true, type: [Number] })
  childrenIds?: number[];

  @IsNotEmpty()
  @ApiProperty()
  locationTypeId: number;

  @ApiProperty()
  enabled: boolean;
}
