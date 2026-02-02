import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CaptureDataDto {
  @ApiPropertyOptional({
    description: 'Identifier for the batch process',
    example: 'BATCH-001',
  })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({
    description: 'Identifier for the workflow instance',
    example: 'WORKFLOW-001',
  })
  @IsOptional()
  @IsString()
  workflowId?: string;

  @ApiPropertyOptional({
    description: 'Unique identifier for the record within a system',
    example: 'RECORD-001',
  })
  @IsOptional()
  @IsString()
  recordId?: string;
}

export class ProcessingDto {
  @ApiPropertyOptional({
    description: 'Process Name - source: record_additional_field_186',
    example: 'Invoice Processing',
  })
  @IsOptional()
  @IsString()
  processName?: string;

  @ApiPropertyOptional({
    description: 'Processed On - source: record_additional_field_98',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  processedOn?: string;

  @ApiPropertyOptional({
    description: 'Client Processed On',
    example: '2025-01-15T09:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  clientProcessedOn?: string;
}

export class MigrationDto {
  @ApiPropertyOptional({
    description: 'BatchNameMigrated',
    example: 'Legacy Batch Name',
  })
  @IsOptional()
  @IsString()
  batchNameMigrated?: string;

  @ApiPropertyOptional({
    description: 'FilenameMigrated',
    example: 'legacy_file.pdf',
  })
  @IsOptional()
  @IsString()
  filenameMigrated?: string;

  @ApiPropertyOptional({
    description: 'OriginalFileNameMigrated',
    example: 'original_file.pdf',
  })
  @IsOptional()
  @IsString()
  originalFileNameMigrated?: string;

  @ApiPropertyOptional({
    description: 'PageCountMigrated',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  pageCountMigrated?: number;

  @ApiPropertyOptional({
    description: 'HashSignatureMigrated',
    example: 'abc123def456',
  })
  @IsOptional()
  @IsString()
  hashSignatureMigrated?: string;

  @ApiPropertyOptional({
    description: 'ItemHashMigrated',
    example: 'item_hash_123',
  })
  @IsOptional()
  @IsString()
  itemHashMigrated?: string;

  @ApiPropertyOptional({
    description: 'ItemIdMigrated',
    example: 'ITEM-001',
  })
  @IsOptional()
  @IsString()
  itemIdMigrated?: string;

  @ApiPropertyOptional({
    description: 'InternalRecordIdMigrated',
    example: 'INT-RECORD-001',
  })
  @IsOptional()
  @IsString()
  internalRecordIdMigrated?: string;

  @ApiPropertyOptional({
    description: 'StatusMigrated',
    example: 'Migrated',
  })
  @IsOptional()
  @IsString()
  statusMigrated?: string;

  @ApiPropertyOptional({
    description: 'ViewLinkMigrated',
    example: 'https://example.com/view/123',
  })
  @IsOptional()
  @IsString()
  viewLinkMigrated?: string;

  @ApiPropertyOptional({
    description: 'Index Date Migrated',
    example: '2025-01-15',
  })
  @IsOptional()
  @IsString()
  indexDateMigrated?: string;

  @ApiPropertyOptional({
    description: 'Date Captured Migrated',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dateCapturedMigrated?: string;

  @ApiPropertyOptional({
    description: 'Migrated Date Captured',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsString()
  migratedDateCaptured?: string;

  @ApiPropertyOptional({
    description: 'Migrated Tenant Name',
    example: 'Legacy Tenant',
  })
  @IsOptional()
  @IsString()
  migratedTenantName?: string;

  @ApiPropertyOptional({
    description: 'Problem Code Migrated',
    example: 'PROB-001',
  })
  @IsOptional()
  @IsString()
  problemCodeMigrated?: string;
}

export class MetadataDto {
  @ApiPropertyOptional({
    description: 'Comments - source: record_additional_field_14',
    example: 'General comments',
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiPropertyOptional({
    description: 'EmailFrom',
    example: 'sender@example.com',
  })
  @IsOptional()
  @IsString()
  emailFrom?: string;

  @ApiPropertyOptional({
    description: 'EmailTo',
    example: 'recipient@example.com',
  })
  @IsOptional()
  @IsString()
  emailTo?: string;

  @ApiPropertyOptional({
    description: 'EmailSubject',
    example: 'Invoice Notification',
  })
  @IsOptional()
  @IsString()
  emailSubject?: string;

  @ApiPropertyOptional({
    description: 'Attachment',
    example: 'invoice.pdf',
  })
  @IsOptional()
  @IsString()
  attachment?: string;

  @ApiPropertyOptional({
    description: 'Test URL again',
    example: 'https://example.com/test',
  })
  @IsOptional()
  @IsString()
  testUrlAgain?: string;

  @ApiPropertyOptional({
    description: 'Batch Number',
    example: 'BATCH-001',
  })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiPropertyOptional({
    description: 'Run Number - source: record_additional_field_447',
    example: 'RUN-001',
  })
  @IsOptional()
  @IsString()
  runNumber?: string;

  @ApiPropertyOptional({
    description: 'Last Run Date Time - source: record_additional_field_448',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsString()
  lastRunDateTime?: string;

  @ApiPropertyOptional({
    description: 'Error Description',
    example: 'Processing error occurred',
  })
  @IsOptional()
  @IsString()
  errorDescription?: string;

  @ApiPropertyOptional({
    description: 'Invalid Dates',
    example: '2025-13-45',
  })
  @IsOptional()
  @IsString()
  invalidDates?: string;

  @ApiPropertyOptional({
    description: 'Data related to the document capture process (shared pattern with PO and Acknowledgment)',
    type: CaptureDataDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CaptureDataDto)
  captureData?: CaptureDataDto;

  @ApiPropertyOptional({
    description: 'Processing timestamps and process labels',
    type: ProcessingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessingDto)
  processing?: ProcessingDto;

  @ApiPropertyOptional({
    description: 'Migration-specific metadata for legacy bill records',
    type: MigrationDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MigrationDto)
  migration?: MigrationDto;
}
