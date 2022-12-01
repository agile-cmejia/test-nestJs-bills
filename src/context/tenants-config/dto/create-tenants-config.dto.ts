import { TenantsConfigDto } from './tenants-config.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantsConfigDto implements Omit<TenantsConfigDto, 'id' | 'createdAt' | 'updatedAt'> {
  /*   @ApiProperty()
  tenantId: number;
 */
  @ApiProperty()
  association: number;

  @ApiProperty()
  hasRoleAliases: boolean;
}
