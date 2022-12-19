import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { CreateRecordTypeDto } from './create-record-type.dto';

export class UpdateRecordTypeDto extends PartialType(CreateRecordTypeDto) {
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @Length(2, 200)
  @ApiProperty()
  botName?: string;

  @Length(2, 500)
  @ApiProperty()
  description: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  fieldVisibilityOptionIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  tenantTypeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  additionalRecordFieldIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  recordStatusIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  problemCodeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  appMenuItemsIds?: number[];
}
