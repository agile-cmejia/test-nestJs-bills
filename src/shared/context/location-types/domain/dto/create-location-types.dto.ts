import { LocationTypeDto } from './location-types.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateLocationTypeDto implements Omit<LocationTypeDto, 'id' | 'createdAt' | 'updatedAt'> {
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
