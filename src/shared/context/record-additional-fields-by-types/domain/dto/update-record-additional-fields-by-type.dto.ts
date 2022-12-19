import { AdditionalFieldDataTypeEnum } from 'src/shared/dataTypes/Enums';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { CreateRecordAdditionalFieldsByTypeDto } from './create-record-additional-fields-by-type.dto';

export class UpdateRecordAdditionalFieldsByTypeDto extends PartialType(CreateRecordAdditionalFieldsByTypeDto) {
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @Length(2, 500)
  @ApiProperty()
  description: string;

  @Length(2, 50)
  @ApiProperty({ enum: AdditionalFieldDataTypeEnum })
  dataType: AdditionalFieldDataTypeEnum;

  @Length(2, 500)
  @ApiProperty()
  botFieldName?: string;

  @ApiProperty()
  headerField?: boolean;

  @ApiProperty()
  required: boolean;

  @ApiProperty()
  gridEditable: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypeIds?: number[];
}
