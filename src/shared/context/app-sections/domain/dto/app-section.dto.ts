export class AppSectionDto {
  id: number;
  name: string;
  tag: string;
  route: string;
  enabled: boolean;
  appModuleId: number;
  menuItemIds?: number[];
  createdAt: Date;
  updatedAt: Date;
}
