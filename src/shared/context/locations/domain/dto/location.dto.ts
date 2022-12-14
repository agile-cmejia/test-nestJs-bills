export class LocationDto {
  id: number;
  name: string;
  locationTypeId: number;
  parentId?: number | null;
  childrenIds?: number[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
