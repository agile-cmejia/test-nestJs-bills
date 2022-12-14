export class CoverageZoneDto {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantIds?: number[];
  locationIds?: number[];
}
