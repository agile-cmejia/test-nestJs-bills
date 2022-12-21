import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { CreateRecordFieldsVisibilityByTypeDto } from './create-record-fields-visibility-by-type.dto';

export class UpdateRecordFieldsVisibilityByTypeDto extends PartialType(CreateRecordFieldsVisibilityByTypeDto) {
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
