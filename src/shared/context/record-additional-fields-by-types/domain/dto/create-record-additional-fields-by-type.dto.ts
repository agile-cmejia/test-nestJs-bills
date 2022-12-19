import { RecordAdditionalFieldsByTypeDto } from './record-additional-fields-by-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { AdditionalFieldDataTypeEnum } from 'src/shared/dataTypes/Enums';

export class CreateRecordAdditionalFieldsByTypeDto
  implements Omit<RecordAdditionalFieldsByTypeDto, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(2, 500)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @Length(2, 50)
  @ApiProperty({ enum: AdditionalFieldDataTypeEnum })
  dataType: AdditionalFieldDataTypeEnum;

  @IsNotEmpty()
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
