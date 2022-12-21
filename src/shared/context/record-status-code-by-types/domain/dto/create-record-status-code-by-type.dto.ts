import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { RecordStatusCodeByTypeDto } from './record-status-code-by-type.dto';

export class CreateRecordStatusCodeByTypeDto
  implements Omit<RecordStatusCodeByTypeDto, 'id' | 'createdAt' | 'updatedAt'>
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
