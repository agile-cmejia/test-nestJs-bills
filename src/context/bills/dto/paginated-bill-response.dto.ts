import { ApiProperty } from '@nestjs/swagger';
import { BillResponseDto } from './bill-response.dto';
import { PaginationMeta } from '../../../shared/dataTypes/PaginatedResponse';

export class PaginatedBillResponseDto {
  @ApiProperty({
    description: 'Array of bills for the current page',
    type: [BillResponseDto],
  })
  data: BillResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  pagination: PaginationMeta;
}
