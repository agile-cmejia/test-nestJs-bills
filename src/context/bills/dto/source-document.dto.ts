import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SourceDocumentDto {
  @ApiPropertyOptional({
    description: 'SIF File Name (SF)',
    example: 'project_spec.sif',
  })
  @IsOptional()
  @IsString()
  sifFileName?: string;

  @ApiPropertyOptional({
    description: 'Project Spec Version (VR)',
    example: '1.0',
  })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiPropertyOptional({
    description: 'File creation date (DT)',
    example: '2025-01-15',
  })
  @IsOptional()
  @IsString()
  fileDate?: string;

  @ApiPropertyOptional({
    description: 'File creation time (TM)',
    example: '14:30:00',
  })
  @IsOptional()
  @IsString()
  fileTime?: string;

  @ApiPropertyOptional({
    description: 'SIF File Path - Cyncly only (FPPRJ)',
    example: '/path/to/file.sif',
  })
  @IsOptional()
  @IsString()
  filePath?: string;

  @ApiPropertyOptional({
    description: 'End of SIF marker (SL)',
    example: 'END',
  })
  @IsOptional()
  @IsString()
  endOfFile?: string;
}
