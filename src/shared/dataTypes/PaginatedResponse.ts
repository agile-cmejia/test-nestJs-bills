import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 20 })
  limit: number;

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Total number of pages', example: 5 })
  totalPages: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({
    description: 'Array of items for the current page',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMeta,
  })
  pagination: PaginationMeta;

  constructor(data: T[], pagination: PaginationMeta) {
    this.data = data;
    this.pagination = pagination;
  }
}
