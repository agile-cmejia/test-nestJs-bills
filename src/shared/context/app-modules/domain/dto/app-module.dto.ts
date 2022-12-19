import { IssuerEnum } from './../../../../dataTypes/Enums';

export class AppModuleDto {
  id: number;
  name: string;
  tag: string;
  route: string;
  order: number;
  application: IssuerEnum;
  enabled: boolean;
  appSectionIds?: number[];
  createdAt: Date;
  updatedAt: Date;
}
