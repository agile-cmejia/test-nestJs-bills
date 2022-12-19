import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateAppMenuItemDto } from './create-app-menu-item.dto';

export class FindAppMenuItemDto extends PartialType(CreateAppMenuItemDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  routes?: string[];

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  hasRecordTypes?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  recordTypeIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  appSectionIds?: number[];
}
