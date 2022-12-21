import { RecordProblemCodeByTypeDto } from './record-problem-code-by-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRecordProblemCodeByTypeDto
  implements Omit<RecordProblemCodeByTypeDto, 'id' | 'createdAt' | 'updatedAt'>
{
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
