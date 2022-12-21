import { CreateRecordStatusCodeByTypeDto } from './create-record-status-code-by-type.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateRecordStatusCodeByTypeDto extends PartialType(CreateRecordStatusCodeByTypeDto) {
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
