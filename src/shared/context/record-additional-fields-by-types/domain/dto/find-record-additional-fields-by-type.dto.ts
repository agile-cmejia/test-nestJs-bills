import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRecordAdditionalFieldsByTypeDto } from './create-record-additional-fields-by-type.dto';

export class FindRecordAdditionalFieldsByTypeDto extends PartialType(CreateRecordAdditionalFieldsByTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names: string[];

  @ApiProperty({ nullable: true, type: [String] })
  botFieldNames?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  descriptions: string[];

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty()
  headerField?: boolean;

  @ApiProperty()
  required?: boolean;

  @ApiProperty()
  gridEditable?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypeIds?: number[];
}
