import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsArray, IsDateString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class ApprovalDto {
  @ApiPropertyOptional({
    description: 'Approver 1 - source: list_id=14 + lists_values',
    example: 'Approver Name 1',
  })
  @IsOptional()
  @IsString()
  approver1?: string;

  @ApiPropertyOptional({
    description: 'Approver 1 Status - source: list_id=17 + lists_values',
    example: 'Approved',
  })
  @IsOptional()
  @IsString()
  approver1Status?: string;

  @ApiPropertyOptional({
    description: 'Approver 1 Comments',
    example: 'Looks good',
  })
  @IsOptional()
  @IsString()
  approver1Comments?: string;

  @ApiPropertyOptional({
    description: 'Approver 2 - source: list_id=15 + lists_values',
    example: 'Approver Name 2',
  })
  @IsOptional()
  @IsString()
  approver2?: string;

  @ApiPropertyOptional({
    description: 'Approver 2 Status - source: list_id=18 + lists_values',
    example: 'Pending',
  })
  @IsOptional()
  @IsString()
  approver2Status?: string;

  @ApiPropertyOptional({
    description: 'Approver 2 Comments',
    example: 'Need more information',
  })
  @IsOptional()
  @IsString()
  approver2Comments?: string;

  @ApiPropertyOptional({
    description: 'Approver 3 - source: list_id=16 + lists_values',
    example: 'Approver Name 3',
  })
  @IsOptional()
  @IsString()
  approver3?: string;

  @ApiPropertyOptional({
    description: 'Approver 3 Status - source: list_id=19 + lists_values',
    example: 'Not Started',
  })
  @IsOptional()
  @IsString()
  approver3Status?: string;

  @ApiPropertyOptional({
    description: 'Approver 3 Comments',
    example: 'Waiting for review',
  })
  @IsOptional()
  @IsString()
  approver3Comments?: string;

  @ApiPropertyOptional({
    description: 'PJM Approval - source: list_id=99 + lists_values',
    example: 'Approved',
  })
  @IsOptional()
  @IsString()
  pjmApproval?: string;

  @ApiPropertyOptional({
    description: 'PJM Rejection Reason(s) - source: list_id=100 + lists_values',
    type: [String],
    example: ['Reason 1', 'Reason 2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pjmRejectionReason?: string[];

  @ApiPropertyOptional({
    description: 'PJM Rejection Additional Comments',
    example: 'Additional rejection details',
  })
  @IsOptional()
  @IsString()
  pjmRejectionAdditionalComments?: string;

  @ApiPropertyOptional({
    description: 'FAS/OB Comments',
    example: 'FAS/OB review comments',
  })
  @IsOptional()
  @IsString()
  fasObComments?: string;

  @ApiPropertyOptional({
    description: 'FAS/OB Review Reasons - source: list_id=105 + lists_values',
    type: [String],
    example: ['Review Reason 1'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fasObReviewReasons?: string[];

  @ApiPropertyOptional({
    description: 'FAS/OB Tracking Status - source: list_id=104 + lists_values',
    example: 'In Progress',
  })
  @IsOptional()
  @IsString()
  fasObTrackingStatus?: string;
}

export class AssignmentDto {
  @ApiPropertyOptional({
    description: 'Assigned To - source: list_id=13 + lists_values',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Department - source: list_id=12 + lists_values',
    example: 'Accounting',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Admin/Retail - source: list_id=71 + lists_values',
    example: 'Admin',
  })
  @IsOptional()
  @IsString()
  adminRetail?: string;

  @ApiPropertyOptional({
    description: 'Manual Approver Name',
    example: 'Manual Approver',
  })
  @IsOptional()
  @IsString()
  manualApproverName?: string;

  @ApiPropertyOptional({
    description: 'Manual Assigned Department',
    example: 'Finance',
  })
  @IsOptional()
  @IsString()
  manualAssignedDepartment?: string;

  @ApiPropertyOptional({
    description: 'Manual Assigned To',
    example: 'Jane Smith',
  })
  @IsOptional()
  @IsString()
  manualAssignedTo?: string;

  @ApiPropertyOptional({
    description: 'Assigned Department Migrated',
    example: 'Legacy Department',
  })
  @IsOptional()
  @IsString()
  assignedDepartmentMigrated?: string;

  @ApiPropertyOptional({
    description: 'Assigned To Migrated',
    example: 'Legacy User',
  })
  @IsOptional()
  @IsString()
  assignedToMigrated?: string;
}

export class NotificationsDto {
  @ApiPropertyOptional({
    description: 'Accounting Team Notification Date - source: record_additional_field_637',
    example: '2025-01-15T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  accountingTeamNotificationDate?: string;

  @ApiPropertyOptional({
    description: 'CBRE Notification Date',
    example: '2025-01-15T11:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  cbreNotificationDate?: string;

  @ApiPropertyOptional({
    description: 'Dealer Notification Date',
    example: '2025-01-15T12:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dealerNotificationDate?: string;

  @ApiPropertyOptional({
    description: 'FAS Team Notification Date',
    example: '2025-01-15T13:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fasTeamNotificationDate?: string;
}

export class WorkflowDto {
  @ApiPropertyOptional({
    description: 'AC Comments - source: record_additional_field_273',
    example: 'AC review comments',
  })
  @IsOptional()
  @IsString()
  acComments?: string;

  @ApiPropertyOptional({
    description: 'AP Comments - source: record_additional_field_265',
    example: 'AP review comments',
  })
  @IsOptional()
  @IsString()
  apComments?: string;

  @ApiPropertyOptional({
    description: 'AP Representative - source: record_additional_field_258 + lists_values',
    example: 'AP Rep Name',
  })
  @IsOptional()
  @IsString()
  apRepresentative?: string;

  @ApiPropertyOptional({
    description: 'Approver Notification State',
    example: 'Notified',
  })
  @IsOptional()
  @IsString()
  approverNotificationState?: string;

  @ApiPropertyOptional({
    description: 'Notification State',
    example: 'Sent',
  })
  @IsOptional()
  @IsString()
  notificationState?: string;

  @ApiPropertyOptional({
    description: 'Rejection State',
    example: 'None',
  })
  @IsOptional()
  @IsString()
  rejectionState?: string;

  @ApiPropertyOptional({
    description: 'Record Status - source: list_id=84 + lists_values',
    example: 'Active',
  })
  @IsOptional()
  @IsString()
  recordStatus?: string;

  @ApiPropertyOptional({
    description: 'Problem Code - source: list_id=22 + lists_values',
    example: 'PROB-001',
  })
  @IsOptional()
  @IsString()
  problemCode?: string;

  @ApiPropertyOptional({
    description: 'Error Tracking - source: list_id=67 + lists_values',
    type: [String],
    example: ['Error 1', 'Error 2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  errorTracking?: string[];

  @ApiPropertyOptional({
    description: 'Non-Compliance Reason(s) - source: list_id=89 + lists_values',
    type: [String],
    example: ['Reason 1'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  nonComplianceReason?: string[];

  @ApiPropertyOptional({
    description: 'QA transfer Singleselect - source: list_id=7 + lists_values',
    example: 'QA Status',
  })
  @IsOptional()
  @IsString()
  qaTransferSingleselect?: string;

  @ApiPropertyOptional({
    description: 'Obsolete',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  obsolete?: boolean;

  @ApiPropertyOptional({
    description: 'Approver configuration, statuses and comments',
    type: ApprovalDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ApprovalDto)
  approval?: ApprovalDto;

  @ApiPropertyOptional({
    description: 'Assignment and ownership of the bill',
    type: AssignmentDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AssignmentDto)
  assignment?: AssignmentDto;

  @ApiPropertyOptional({
    description: 'Notification-related timestamps',
    type: NotificationsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationsDto)
  notifications?: NotificationsDto;

  @ApiPropertyOptional({
    description: 'Perform Lookup',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  performLookup?: boolean;
}
