export class RoleDto {
  id: number;
  name: string;
  description: string;
  tag: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  BackOfficeAccess?: boolean;
  SaasAccess?: boolean;
  tenantSpecific: boolean;
  tenantCreatorId?: number;
  tenantTypesIds?: number[];
  aliases?: number[];
}
