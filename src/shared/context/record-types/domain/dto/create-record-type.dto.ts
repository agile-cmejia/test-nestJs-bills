import { RecordTypeDto } from './record-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRecordTypeDto implements Omit<RecordTypeDto, 'id' | 'createdAt' | 'updatedAt'> {
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty()
  name: string;

  @Length(2, 200)
  @ApiProperty()
  botName?: string;

  @IsNotEmpty()
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
