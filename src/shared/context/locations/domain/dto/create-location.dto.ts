import { LocationDto } from './location.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateLocationDto implements Omit<LocationDto, 'id' | 'createdAt' | 'updatedAt'> {
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
