import { IsNotEmpty, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateLocationTypeDto } from './create-location-types.dto';

export class UpdateLocationTypeDto extends PartialType(CreateLocationTypeDto) {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @ApiProperty()
  parentId?: number;

  @ApiProperty({ nullable: true, type: [Number] })
  childrenIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  locationIds?: number[];

  @IsNotEmpty()
  @Length(2, 400)
  @ApiProperty()
  description: string;

  @ApiProperty()
  enabled: boolean;
}
