import { ApiProperty } from '@nestjs/swagger';
import { CreateBillDto } from './create-bill.dto';
import { OmitType } from '@nestjs/swagger';

export class BillResponseDto extends CreateBillDto {
  @ApiProperty({
    description: 'Unique identifier for the bill',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Date and time when the bill was created',
    example: '2025-01-15T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the bill was last updated',
    example: '2025-01-15T11:00:00Z',
  })
  updatedAt: Date;
}
