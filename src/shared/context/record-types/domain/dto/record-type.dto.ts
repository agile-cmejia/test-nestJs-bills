export class RecordTypeDto {
  id: number;
  name: string;
  botName?: string;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  fieldVisibilityOptionIds?: number[];
  tenantTypeIds?: number[];
  additionalRecordFieldIds?: number[];
  recordStatusIds?: number[];
  problemCodeIds?: number[];
  appMenuItemsIds?: number[];
}
