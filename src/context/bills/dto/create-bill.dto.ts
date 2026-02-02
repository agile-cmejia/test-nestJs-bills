import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { BillInfoDto } from './bill-info.dto';
import { VendorDto } from './vendor.dto';
import { DealerDto } from './dealer.dto';
import { BillingDto } from './billing.dto';
import { ShippingDto } from './shipping.dto';
import { ProjectDto } from './project.dto';
import { ContractDto } from './contract.dto';
import { FinancialsDto } from './financials.dto';
import { SourceDocumentDto } from './source-document.dto';
import { WorkflowDto } from './workflow.dto';
import { LineItemDto } from './line-item.dto';
import { MetadataDto } from './metadata.dto';

export class CreateBillDto {
  @ApiProperty({
    description: 'Core Bill header information',
    type: BillInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillInfoDto)
  billInfo: BillInfoDto;

  @ApiProperty({
    description: 'Vendor (supplier) information for this bill',
    type: VendorDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VendorDto)
  vendor: VendorDto;

  @ApiProperty({
    description: 'Line items on the bill (SIF-based + ERP fields)',
    type: [LineItemDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];

  @ApiPropertyOptional({
    description: 'Dealer or customer related to this bill',
    type: DealerDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DealerDto)
  dealer?: DealerDto;

  @ApiPropertyOptional({
    description: 'Billing-related information for this bill',
    type: BillingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BillingDto)
  billing?: BillingDto;

  @ApiPropertyOptional({
    description: 'Shipping party, address, and logistics information',
    type: ShippingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingDto)
  shipping?: ShippingDto;

  @ApiPropertyOptional({
    description: 'Project associated with this bill',
    type: ProjectDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectDto)
  project?: ProjectDto;

  @ApiPropertyOptional({
    description: 'Contract details related to this bill',
    type: ContractDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContractDto)
  contract?: ContractDto;

  @ApiPropertyOptional({
    description: 'Bill financial summary and reconciliation',
    type: FinancialsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FinancialsDto)
  financials?: FinancialsDto;

  @ApiPropertyOptional({
    description: 'Source SIF / Spec document information for this bill',
    type: SourceDocumentDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDocumentDto)
  sourceDocument?: SourceDocumentDto;

  @ApiPropertyOptional({
    description: 'Workflow, approvals, assignments, QA and notifications for this bill',
    type: WorkflowDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WorkflowDto)
  workflow?: WorkflowDto;

  @ApiPropertyOptional({
    description: 'Warranty or coverage details associated with this bill, if any',
    example: '1 year warranty included',
  })
  @IsOptional()
  @IsString()
  warrantyInformation?: string;

  @ApiPropertyOptional({
    description: 'System, capture, and migration metadata for the bill',
    type: MetadataDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MetadataDto)
  metadata?: MetadataDto;
}
