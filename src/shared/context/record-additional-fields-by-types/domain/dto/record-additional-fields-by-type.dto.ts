export class RecordAdditionalFieldsByTypeDto {
  id: number;
  name: string;
  description: string;
  dataType: string;
  botFieldName?: string;
  headerField?: boolean;
  required: boolean;
  gridEditable: boolean;
  createdAt: Date;
  updatedAt: Date;
  recordTypeIds?: number[];
}
