import { CreateRecordProblemCodeByTypeDto } from './create-record-problem-code-by-type.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateRecordProblemCodeByTypeDto extends PartialType(CreateRecordProblemCodeByTypeDto) {
  @IsNotEmpty()
  @ApiProperty()
  recordTypeId: number;

  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @ApiProperty()
  enabled: boolean;
}
