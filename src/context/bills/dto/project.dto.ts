import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class ProjectDto {
  @ApiPropertyOptional({
    description: 'Project Id',
    example: 'PROJ-001',
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Project Name',
    example: 'Office Renovation Project',
  })
  @IsOptional()
  @IsString()
  projectName?: string;

  @ApiPropertyOptional({
    description: 'Project Status - source: list_id=69 + lists_values',
    example: 'Active',
  })
  @IsOptional()
  @IsString()
  projectStatus?: string;

  @ApiPropertyOptional({
    description: 'Project Phase - source: list_id=73 + lists_values',
    example: 'Phase 1',
  })
  @IsOptional()
  @IsString()
  projectPhase?: string;

  @ApiPropertyOptional({
    description: 'Project Sub Type - source: list_id=74 + lists_values',
    example: 'Renovation',
  })
  @IsOptional()
  @IsString()
  projectSubType?: string;

  @ApiPropertyOptional({
    description: 'Project Capital Driver - source: list_id=103 + lists_values',
    example: 'Capital Driver Name',
  })
  @IsOptional()
  @IsString()
  projectCapitalDriver?: string;

  @ApiPropertyOptional({
    description: 'Project Site ID',
    example: 'SITE-001',
  })
  @IsOptional()
  @IsString()
  projectSiteId?: string;

  @ApiPropertyOptional({
    description: 'Project Manager - source: list_id=72 + object_values',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  projectManager?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Capital Manager - source: list_id=95 + object_values',
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  capitalManager?: Record<string, any>;
}
