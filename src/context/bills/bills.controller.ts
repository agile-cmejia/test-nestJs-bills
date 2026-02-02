import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';
import { BillsService } from '../../shared/context/bills/bills.service';
import { FindBillsDto } from './dto/find-bills.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillResponseDto } from './dto/bill-response.dto';
import { PaginatedResponse } from '../../shared/dataTypes/PaginatedResponse';
import { PaginatedBillResponseDto } from './dto/paginated-bill-response.dto';
import { CORRELATION_ID_HEADER } from '../../shared/middleware/correlation-id/correlation-id.middleware';

@ApiTags('Bills')
@ApiBearerAuth('OAuth2')
@ApiSecurity('ApiKey')
@ApiSecurity('ApiSecret')
@Controller('api/v1/bills')
export class BillsController {
  private readonly logger = new Logger(BillsController.name);

  constructor(private readonly billsService: BillsService) {}

  @Get()
  @ApiOperation({
    summary: 'List bills',
    description:
      'Retrieve a paginated list of bills with optional filtering by invoiceNumber, vendorName, invoiceStatus, or poNumber',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'invoiceNumber', required: false, type: String })
  @ApiQuery({ name: 'vendorName', required: false, type: String })
  @ApiQuery({
    name: 'invoiceStatus',
    required: false,
    enum: ['Pending', 'InReview', 'Approved', 'Rejected', 'Paid', 'Overdue', 'Cancelled'],
  })
  @ApiQuery({ name: 'poNumber', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved paginated list of bills',
    type: PaginatedBillResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Tenant not found or disabled',
  })
  async findAll(
    @Query() findBillsDto: FindBillsDto,
    @Req() request: Request & { tenant?: { id: number } },
  ): Promise<PaginatedResponse<BillResponseDto>> {
    const tenantId = request.tenant?.id;
    const correlationId = (request as any)[CORRELATION_ID_HEADER];

    this.logger.log(
      JSON.stringify({
        event: 'get_bills_list_start',
        tenantId: tenantId || null,
        correlationId: correlationId || null,
        filters: {
          invoiceNumber: findBillsDto.invoiceNumber,
          vendorName: findBillsDto.vendorName,
          invoiceStatus: findBillsDto.invoiceStatus,
          poNumber: findBillsDto.poNumber,
        },
        pagination: {
          page: findBillsDto.page || 1,
          limit: findBillsDto.limit || 20,
        },
        timestamp: new Date().toISOString(),
      }),
    );

    if (!tenantId) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Tenant ID is required. Please authenticate using API key/secret or OAuth Bearer token.',
        timestamp: new Date().toISOString(),
        correlationId: correlationId || null,
      });
    }

    return await this.billsService.findAll(findBillsDto, tenantId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get bill by ID',
    description: 'Retrieve a single bill by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the bill',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved bill',
    type: BillResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Tenant not found or disabled',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Bill with the specified ID does not exist or does not belong to the tenant',
  })
  async findOne(
    @Param('id') id: string,
    @Req() request: Request & { tenant?: { id: number } },
  ): Promise<BillResponseDto> {
    const tenantId = request.tenant?.id;
    const correlationId = (request as any)[CORRELATION_ID_HEADER];

    this.logger.log(
      JSON.stringify({
        event: 'get_bill_by_id_start',
        billId: id,
        tenantId: tenantId || null,
        correlationId: correlationId || null,
        timestamp: new Date().toISOString(),
      }),
    );

    if (!tenantId) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Tenant ID is required. Please authenticate using API key/secret or OAuth Bearer token.',
        timestamp: new Date().toISOString(),
        correlationId: correlationId || null,
      });
    }

    const bill = await this.billsService.findOne(id, tenantId);

    this.logger.log(
      JSON.stringify({
        event: 'get_bill_by_id_success',
        billId: id,
        tenantId,
        correlationId: correlationId || null,
        timestamp: new Date().toISOString(),
      }),
    );

    return bill;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new bill',
    description: 'Create a new bill with the provided information. Supports idempotency via X-Idempotency-Key header.',
  })
  @ApiBody({
    type: CreateBillDto,
    description: 'Bill creation data',
  })
  @ApiResponse({
    status: 201,
    description: 'Bill successfully created',
    type: BillResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Tenant not found or disabled',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Bill with duplicate invoiceNumber already exists for this tenant',
  })
  async create(
    @Body() createBillDto: CreateBillDto,
    @Req() request: Request & { tenant?: { id: number } },
  ): Promise<BillResponseDto> {
    const tenantId = request.tenant?.id;
    const correlationId = (request as any)[CORRELATION_ID_HEADER];
    const idempotencyKey = request.headers['x-idempotency-key'] as string | undefined;

    this.logger.log(
      JSON.stringify({
        event: 'create_bill_start',
        invoiceNumber: createBillDto.billInfo?.invoiceNumber || null,
        tenantId: tenantId || null,
        correlationId: correlationId || null,
        idempotencyKey: idempotencyKey || null,
        timestamp: new Date().toISOString(),
      }),
    );

    if (!tenantId) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Tenant ID is required. Please authenticate using API key/secret or OAuth Bearer token.',
        timestamp: new Date().toISOString(),
        correlationId: correlationId || null,
      });
    }

    const bill = await this.billsService.create(createBillDto, tenantId, idempotencyKey);

    this.logger.log(
      JSON.stringify({
        event: 'create_bill_success',
        invoiceNumber: createBillDto.billInfo?.invoiceNumber || null,
        billId: bill.id,
        tenantId,
        correlationId: correlationId || null,
        idempotencyKey: idempotencyKey || null,
        timestamp: new Date().toISOString(),
      }),
    );

    return bill;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a bill',
    description:
      'Update an existing bill by its unique identifier. Only provided fields will be updated (partial update).',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the bill to update',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateBillDto,
    description: 'Bill update data (all fields optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'Bill successfully updated',
    type: BillResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Missing or invalid authentication',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Tenant not found or disabled',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Bill with the specified ID does not exist or does not belong to the tenant',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
    @Req() request: Request & { tenant?: { id: number } },
  ): Promise<BillResponseDto> {
    const tenantId = request.tenant?.id;
    const correlationId = (request as any)[CORRELATION_ID_HEADER];

    this.logger.log(
      JSON.stringify({
        event: 'update_bill_start',
        billId: id,
        tenantId: tenantId || null,
        correlationId: correlationId || null,
        updatedFields: Object.keys(updateBillDto),
        timestamp: new Date().toISOString(),
      }),
    );

    if (!tenantId) {
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Tenant ID is required. Please authenticate using API key/secret or OAuth Bearer token.',
        timestamp: new Date().toISOString(),
        correlationId: correlationId || null,
      });
    }

    const bill = await this.billsService.update(id, updateBillDto, tenantId);

    this.logger.log(
      JSON.stringify({
        event: 'update_bill_success',
        billId: id,
        tenantId,
        correlationId: correlationId || null,
        updatedFields: Object.keys(updateBillDto),
        timestamp: new Date().toISOString(),
      }),
    );

    return bill;
  }
}
