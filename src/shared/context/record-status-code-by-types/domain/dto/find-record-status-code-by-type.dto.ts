import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRecordStatusCodeByTypeDto } from './create-record-status-code-by-type.dto';

export class FindRecordStatusCodeByTypeDto extends PartialType(CreateRecordStatusCodeByTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  recordTypeIds?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  values: string[];

  @ApiProperty()
  enabled?: boolean;
}
