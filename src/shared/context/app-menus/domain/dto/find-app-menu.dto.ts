import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateAppMenuDto } from './create-app-menu.dto';

export class FindAppMenuDto extends PartialType(CreateAppMenuDto) {
  @ApiProperty({ nullable: true, type: [Number] })
  ids?: number[];

  @ApiProperty({ nullable: true, type: [String] })
  names?: string[];

  @ApiProperty({ nullable: true, type: [String] })
  tags?: string[];

  @ApiProperty()
  backOfficeModule: boolean;

  @ApiProperty()
  SaasModule: boolean;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty({ nullable: true, type: [Number] })
  appSectionIds?: number[];
}
