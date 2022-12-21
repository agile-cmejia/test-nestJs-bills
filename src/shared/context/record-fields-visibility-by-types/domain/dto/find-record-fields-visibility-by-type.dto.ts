import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRecordFieldsVisibilityByTypeDto } from './create-record-fields-visibility-by-type.dto';

export class FindRecordFieldsVisibilityByTypeDto extends PartialType(CreateRecordFieldsVisibilityByTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  recordTypeIds?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  values: string[];

  @ApiProperty()
  enabled?: boolean;
}
