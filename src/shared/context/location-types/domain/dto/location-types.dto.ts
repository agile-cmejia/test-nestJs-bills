export class LocationTypeDto {
  id: number;
  name: string;
  description: string;
  parentId?: number;
  childrenIds?: number[];
  locationIds?: number[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
