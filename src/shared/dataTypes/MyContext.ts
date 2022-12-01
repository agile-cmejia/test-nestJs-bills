import { Request, Response } from 'express';
import { IssuerEnum } from './Enums';

export type ContextPayload = {
  userId: number;
  fireBaseId?: string;
  issuer: IssuerEnum;
  backOfficeRole?: number;
  tenants?: TenantData[];
};

export interface MyContext {
  req: Request;
  res?: Response;
  payload?: ContextPayload;
}

export type TenantData = {
  tenantId: number;
  tenantTypes: TenantTypeData[] | undefined;
  role?: number;
};

export type TenantTypeData = {
  tenantTypeId: number;
  recordType: number[] | undefined;
};
