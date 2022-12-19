import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRecordTypeDto } from './create-record-type.dto';

export class FindRecordTypeDto extends PartialType(CreateRecordTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  botNames?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions?: string[];

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  fieldVisibilityOptionIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  recordFieldIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  recordStatusIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  problemCodeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  appMenuItemsIds?: number[];
}
