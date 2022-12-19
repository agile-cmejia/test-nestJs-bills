import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateAppSectionDto } from './create-app-section.dto';

export class FindAppSectionDto extends PartialType(CreateAppSectionDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  tags?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  routes?: string[];

  @ApiProperty({ nullable: true, type: [Number] })
  orders?: number[];

  @ApiProperty()
  enabled?: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  appModuleIds?: number[];

  @ApiProperty({ nullable: true, type: [Number] })
  menuItemIds?: number[];
}
