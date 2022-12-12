export class TenantDto {
  id: number;
  name: string;
  description: string;
  parentId?: number;
  coverageZoneId: number;
  url: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  userIds?: number[];
  tenantTypeIds?: number[];
  childrenIds?: number[];
  roleAliasesIds?: number[];
}
