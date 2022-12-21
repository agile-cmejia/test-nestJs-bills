import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRecordProblemCodeByTypeDto } from './create-record-problem-code-by-type.dto';

export class FindRecordProblemCodeByTypeDto extends PartialType(CreateRecordProblemCodeByTypeDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  recordTypeIds?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  values: string[];

  @ApiProperty()
  enabled?: boolean;
}
