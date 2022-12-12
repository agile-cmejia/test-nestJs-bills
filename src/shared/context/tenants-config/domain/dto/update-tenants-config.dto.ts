import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTenantsConfigDto } from './create-tenants-config.dto';

export class UpdateTenantsConfigDto extends PartialType(CreateTenantsConfigDto) {
  @ApiProperty()
  id: number;

  /*   @ApiProperty()
  tenantId: number;
 */
  @ApiProperty()
  association: number;

  @ApiProperty()
  hasRoleAliases: boolean;
}
