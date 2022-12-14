import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class FindLocationDto extends PartialType(CreateLocationDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  parentIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  childrenIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  locationTypeIds?: number[];

  @ApiProperty()
  enabled?: boolean;
}
