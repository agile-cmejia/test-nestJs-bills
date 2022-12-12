export class TenantTypeDto {
  id: number;
  name: string;
  description: string;
  tag: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  recordTypesId?: number[];
  childrenId?: number[];
  rolesId?: number[];
}
