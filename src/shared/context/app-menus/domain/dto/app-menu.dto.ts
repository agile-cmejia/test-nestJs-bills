export class AppMenuDto {
  id: number;
  name: string;
  tag: string;
  backOfficeModule: boolean;
  SaasModule: boolean;
  appSectionIds?: number[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
