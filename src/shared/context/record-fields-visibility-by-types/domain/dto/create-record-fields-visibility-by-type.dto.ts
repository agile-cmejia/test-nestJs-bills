import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { RecordFieldsVisibilityByTypeDto } from './record-fields-visibility-by-type.dto';

export class CreateRecordFieldsVisibilityByTypeDto
  implements Omit<RecordFieldsVisibilityByTypeDto, 'id' | 'createdAt' | 'updatedAt'>
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
