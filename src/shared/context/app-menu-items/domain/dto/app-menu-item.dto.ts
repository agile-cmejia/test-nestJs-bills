import { IssuerEnum } from './../../../../dataTypes/Enums';

export class AppMenuItemDto {
  id: number;
  name: string;
  application: IssuerEnum;
  route: string;
  enabled: boolean;
  hasRecordTypes?: boolean;
  recordTypeId?: number;
  appSectionIds?: number[];
  createdAt: Date;
  updatedAt: Date;
}
