import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateLocationTypeDto } from './create-location-types.dto';

export class FindLocationTypeDto extends PartialType(CreateLocationTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  parentIds?: number[];

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  childrenIds?: number[];
}
