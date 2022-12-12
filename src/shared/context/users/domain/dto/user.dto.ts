export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  fireBaseId?: string;
  validated: boolean;
  BackOfficeAccess?: boolean;
  SaasAccess?: boolean;
  email: string;
  enabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantsIds?: number[];
  rolesIds?: number[];
}
