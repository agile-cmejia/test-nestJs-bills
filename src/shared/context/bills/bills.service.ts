import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
// Note: The following imports will be needed once Bill entity is available in @avantodev/avanto-db
// See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Bill } from '@avantodev/avanto-db';
import { FindBillsDto } from '../../../context/bills/dto/find-bills.dto';
import { CreateBillDto } from '../../../context/bills/dto/create-bill.dto';
import { UpdateBillDto } from '../../../context/bills/dto/update-bill.dto';
import { BillResponseDto } from '../../../context/bills/dto/bill-response.dto';
import { PaginatedResponse } from '../../dataTypes/PaginatedResponse';

@Injectable()
export class BillsService {
  private readonly logger = new Logger(BillsService.name);

  // Note: Bill entity repository will be injected once Bill entity is available in @avantodev/avanto-db
  // Uncomment the following constructor and imports once Bill entity is published:
  // constructor(
  //   @InjectRepository(Bill)
  //   private readonly billRepository: Repository<Bill>,
  // ) {}

  /**
   * Find all bills with pagination and filtering
   *
   * Implements pagination and filtering with tenant isolation.
   * Filters are applied to JSONB data column using PostgreSQL JSON operators.
   *
   * Note: This implementation requires the Bill entity from @avantodev/avanto-db.
   * Once the entity is available (see docs/database-requests/2026-02-02-add-bill-entity.md),
   * uncomment the repository injection in the constructor and remove the stub implementation.
   */
  async findAll(findBillsDto: FindBillsDto, tenantId: number): Promise<PaginatedResponse<BillResponseDto>> {
    const page = findBillsDto.page || 1;
    const limit = findBillsDto.limit || 20;
    const skip = (page - 1) * limit;

    this.logger.log(
      JSON.stringify({
        event: 'find_all_bills_start',
        tenantId,
        filters: {
          invoiceNumber: findBillsDto.invoiceNumber || null,
          vendorName: findBillsDto.vendorName || null,
          invoiceStatus: findBillsDto.invoiceStatus || null,
          poNumber: findBillsDto.poNumber || null,
        },
        pagination: {
          page,
          limit,
          skip,
        },
        timestamp: new Date().toISOString(),
      }),
    );

    try {
      // TODO: Uncomment once Bill entity is available in @avantodev/avanto-db
      // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements

      // Build query with tenant isolation and filters
      // const queryBuilder = this.billRepository
      //   .createQueryBuilder('bill')
      //   .where('bill.tenantId = :tenantId', { tenantId });

      // Apply filters on JSONB data column using PostgreSQL JSON operators
      // if (findBillsDto.invoiceNumber) {
      //   queryBuilder.andWhere("bill.data->'billInfo'->>'invoiceNumber' = :invoiceNumber", {
      //     invoiceNumber: findBillsDto.invoiceNumber,
      //   });
      // }

      // if (findBillsDto.vendorName) {
      //   queryBuilder.andWhere("bill.data->'vendor'->>'vendorName' = :vendorName", {
      //     vendorName: findBillsDto.vendorName,
      //   });
      // }

      // if (findBillsDto.invoiceStatus) {
      //   queryBuilder.andWhere("bill.data->'billInfo'->>'invoiceStatus' = :invoiceStatus", {
      //     invoiceStatus: findBillsDto.invoiceStatus,
      //   });
      // }

      // if (findBillsDto.poNumber) {
      //   queryBuilder.andWhere("bill.data->'billInfo'->>'poNumber' = :poNumber", {
      //     poNumber: findBillsDto.poNumber,
      //   });
      // }

      // Apply pagination
      // queryBuilder.skip(skip).take(limit);

      // Execute query with count
      // const [bills, total] = await queryBuilder.getManyAndCount();

      // Map entities to DTOs
      // const billDtos: BillResponseDto[] = bills.map((bill) => ({
      //   id: bill.id,
      //   ...bill.data,
      //   createdAt: bill.createdAt,
      //   updatedAt: bill.updatedAt,
      // }));

      // const totalPages = Math.ceil(total / limit);

      // this.logger.log(
      //   JSON.stringify({
      //     event: 'find_all_bills_success',
      //     tenantId,
      //     total,
      //     totalPages,
      //     page,
      //     limit,
      //     resultsCount: billDtos.length,
      //     timestamp: new Date().toISOString(),
      //   }),
      // );

      // return new PaginatedResponse<BillResponseDto>(billDtos, {
      //   page,
      //   limit,
      //   total,
      //   totalPages,
      // });

      // Temporary stub implementation until Bill entity is available in @avantodev/avanto-db
      // This will be replaced with the actual query above once Bill entity is published
      // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements
      this.logger.warn(
        JSON.stringify({
          event: 'find_all_bills_stub_warning',
          message:
            'Bill entity not yet available in @avantodev/avanto-db. Using stub implementation. Full implementation will be available after Bill entity is published.',
          tenantId,
          timestamp: new Date().toISOString(),
        }),
      );

      return new PaginatedResponse<BillResponseDto>([], {
        page,
        limit,
        total: 0,
        totalPages: 0,
      });
    } catch (error) {
      this.logger.error(
        JSON.stringify({
          event: 'find_all_bills_error',
          tenantId,
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }),
      );
      throw error;
    }
  }

  /**
   * Find a single bill by ID with tenant isolation
   * Full implementation will be completed in BILLS-07
   */
  async findOne(id: string, tenantId: number): Promise<BillResponseDto> {
    this.logger.log(
      JSON.stringify({
        event: 'find_one_bill',
        billId: id,
        tenantId,
        timestamp: new Date().toISOString(),
      }),
    );

    // Stub implementation - will be fully implemented in BILLS-07
    // For now, throw NotFoundException as the bill doesn't exist yet
    // Tenant isolation will be enforced in the full implementation
    throw new NotFoundException({
      statusCode: 404,
      error: 'Not Found',
      message: `Bill with ID ${id} not found`,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Create a new bill with idempotency support
   *
   * Implements validation, duplicate checking, and idempotency support.
   * Validates required fields and checks for duplicate invoiceNumber per tenant.
   *
   * Note: This implementation requires the Bill entity from @avantodev/avanto-db.
   * Once the entity is available (see docs/database-requests/2026-02-02-add-bill-entity.md),
   * uncomment the repository injection in the constructor and remove the stub implementation.
   *
   * Note: IdempotencyService integration will be added when available.
   * For now, idempotency key is logged but not processed.
   */
  async create(createBillDto: CreateBillDto, tenantId: number, idempotencyKey?: string): Promise<BillResponseDto> {
    this.logger.log(
      JSON.stringify({
        event: 'create_bill_start',
        invoiceNumber: createBillDto.billInfo?.invoiceNumber || null,
        tenantId,
        idempotencyKey: idempotencyKey || null,
        timestamp: new Date().toISOString(),
      }),
    );

    try {
      // Validate required fields
      this.validateCreateBillDto(createBillDto);

      // TODO: Uncomment once IdempotencyService is available
      // Check for existing bill with idempotencyKey before creating
      // if (idempotencyKey) {
      //   const existing = await this.idempotencyService.checkExisting(idempotencyKey, tenantId);
      //   if (existing) {
      //     this.logger.log(
      //       JSON.stringify({
      //         event: 'create_bill_idempotency_cache_hit',
      //         idempotencyKey,
      //         tenantId,
      //         timestamp: new Date().toISOString(),
      //       }),
      //     );
      //     return existing.responseBody as BillResponseDto;
      //   }
      // }

      // TODO: Uncomment once Bill entity is available in @avantodev/avanto-db
      // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements

      // Check for duplicate invoiceNumber for this tenant
      // const existingBill = await this.billRepository
      //   .createQueryBuilder('bill')
      //   .where('bill.tenantId = :tenantId', { tenantId })
      //   .andWhere("bill.data->'billInfo'->>'invoiceNumber' = :invoiceNumber", {
      //     invoiceNumber: createBillDto.billInfo.invoiceNumber,
      //   })
      //   .getOne();

      // if (existingBill) {
      //   this.logger.warn(
      //     JSON.stringify({
      //       event: 'create_bill_duplicate_invoice',
      //       invoiceNumber: createBillDto.billInfo.invoiceNumber,
      //       tenantId,
      //       existingBillId: existingBill.id,
      //       timestamp: new Date().toISOString(),
      //     }),
      //   );

      //   throw new ConflictException({
      //     statusCode: 409,
      //     error: 'Conflict',
      //     message: `Bill with invoice number ${createBillDto.billInfo.invoiceNumber} already exists for this tenant`,
      //     timestamp: new Date().toISOString(),
      //   });
      // }

      // Save bill to database with tenantId
      // const billEntity = this.billRepository.create({
      //   tenantId,
      //   data: createBillDto, // Store entire DTO as JSONB
      // });

      // const savedBill = await this.billRepository.save(billEntity);

      // Map entity to DTO
      // const billDto: BillResponseDto = {
      //   id: savedBill.id,
      //   ...savedBill.data,
      //   createdAt: savedBill.createdAt,
      //   updatedAt: savedBill.updatedAt,
      // };

      // TODO: Uncomment once IdempotencyService is available
      // Store idempotency response if idempotencyKey provided
      // if (idempotencyKey) {
      //   await this.idempotencyService.storeResponse(idempotencyKey, tenantId, billDto, 201);
      // }

      // this.logger.log(
      //   JSON.stringify({
      //     event: 'create_bill_success',
      //     billId: savedBill.id,
      //     invoiceNumber: createBillDto.billInfo.invoiceNumber,
      //     tenantId,
      //     idempotencyKey: idempotencyKey || null,
      //     timestamp: new Date().toISOString(),
      //   }),
      // );

      // return billDto;

      // Temporary stub implementation until Bill entity is available in @avantodev/avanto-db
      // This will be replaced with the actual implementation above once Bill entity is published
      // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements
      this.logger.warn(
        JSON.stringify({
          event: 'create_bill_stub_warning',
          message:
            'Bill entity not yet available in @avantodev/avanto-db. Using stub implementation. Full implementation will be available after Bill entity is published.',
          invoiceNumber: createBillDto.billInfo.invoiceNumber,
          tenantId,
          idempotencyKey: idempotencyKey || null,
          timestamp: new Date().toISOString(),
        }),
      );

      // Return mock response for now
      const now = new Date();
      const mockResponse: BillResponseDto = {
        ...createBillDto,
        id: '00000000-0000-0000-0000-000000000000', // Mock UUID
        createdAt: now,
        updatedAt: now,
      } as BillResponseDto;

      return mockResponse;
    } catch (error) {
      // Re-throw HTTP exceptions as-is
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Log and wrap unknown errors
      this.logger.error(
        JSON.stringify({
          event: 'create_bill_error',
          invoiceNumber: createBillDto.billInfo?.invoiceNumber || null,
          tenantId,
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }),
      );

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: error.message || 'Failed to create bill',
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Validate CreateBillDto required fields
   * Throws BadRequestException if validation fails
   */
  private validateCreateBillDto(dto: CreateBillDto): void {
    // Validate billInfo required fields
    if (!dto.billInfo) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'billInfo is required',
        timestamp: new Date().toISOString(),
      });
    }

    if (!dto.billInfo.invoiceNumber || dto.billInfo.invoiceNumber.trim() === '') {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'billInfo.invoiceNumber is required and must be a non-empty string',
        timestamp: new Date().toISOString(),
      });
    }

    if (!dto.billInfo.invoiceDate) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'billInfo.invoiceDate is required',
        timestamp: new Date().toISOString(),
      });
    }

    // Validate vendor required fields
    if (!dto.vendor) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'vendor is required',
        timestamp: new Date().toISOString(),
      });
    }

    if (!dto.vendor.vendorName || dto.vendor.vendorName.trim() === '') {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'vendor.vendorName is required and must be a non-empty string',
        timestamp: new Date().toISOString(),
      });
    }

    // Validate lineItems array
    if (!dto.lineItems || !Array.isArray(dto.lineItems) || dto.lineItems.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'lineItems array is required and must have at least one item',
        timestamp: new Date().toISOString(),
      });
    }

    // Validate each lineItem has required fields
    dto.lineItems.forEach((lineItem, index) => {
      if (!lineItem.productNumber || lineItem.productNumber.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productNumber is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (!lineItem.productDescription || lineItem.productDescription.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productDescription is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (!lineItem.catalogCode || lineItem.catalogCode.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].catalogCode is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (lineItem.quantity === undefined || lineItem.quantity === null || lineItem.quantity < 1) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].quantity is required and must be a number >= 1`,
          timestamp: new Date().toISOString(),
        });
      }

      if (lineItem.productSell === undefined || lineItem.productSell === null || lineItem.productSell < 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productSell is required and must be a number >= 0`,
          timestamp: new Date().toISOString(),
        });
      }

      // Validate discounts are 0-100 range
      if (lineItem.sellDiscount !== undefined && (lineItem.sellDiscount < 0 || lineItem.sellDiscount > 100)) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].sellDiscount must be between 0 and 100`,
          timestamp: new Date().toISOString(),
        });
      }

      if (
        lineItem.purchaseDiscount !== undefined &&
        (lineItem.purchaseDiscount < 0 || lineItem.purchaseDiscount > 100)
      ) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].purchaseDiscount must be between 0 and 100`,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Validate invoiceStatus enum if provided
    if (dto.billInfo.invoiceStatus) {
      const validStatuses = ['Pending', 'InReview', 'Approved', 'Rejected', 'Paid', 'Overdue', 'Cancelled'];
      if (!validStatuses.includes(dto.billInfo.invoiceStatus)) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `billInfo.invoiceStatus must be one of: ${validStatuses.join(', ')}`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  /**
   * Update an existing bill with partial update support
   *
   * Implements tenant isolation, partial updates, and validation for updated fields.
   * Only updates fields that are provided in UpdateBillDto.
   *
   * Note: This implementation requires the Bill entity from @avantodev/avanto-db.
   * Once the entity is available (see docs/database-requests/2026-02-02-add-bill-entity.md),
   * uncomment the repository injection in the constructor and remove the stub implementation.
   */
  async update(id: string, updateBillDto: UpdateBillDto, tenantId: number): Promise<BillResponseDto> {
    this.logger.log(
      JSON.stringify({
        event: 'update_bill_start',
        billId: id,
        tenantId,
        updatedFields: Object.keys(updateBillDto).filter((key) => updateBillDto[key] !== undefined),
        timestamp: new Date().toISOString(),
      }),
    );

    try {
      // TODO: Uncomment once Bill entity is available in @avantodev/avanto-db
      // See docs/database-requests/2026-02-02-add-bill-entity.md for entity requirements

      // Find bill by id and tenantId (enforce tenant isolation)
      // const existingBill = await this.billRepository.findOne({
      //   where: {
      //     id,
      //     tenantId,
      //   },
      // });

      // if (!existingBill) {
      //   this.logger.warn(
      //     JSON.stringify({
      //       event: 'update_bill_not_found',
      //       billId: id,
      //       tenantId,
      //       timestamp: new Date().toISOString(),
      //     }),
      //   );

      //   throw new NotFoundException({
      //     statusCode: 404,
      //     error: 'Not Found',
      //     message: `Bill with ID ${id} not found or does not belong to this tenant`,
      //     timestamp: new Date().toISOString(),
      //   });
      // }

      // Validate updated lineItems if provided
      if (updateBillDto.lineItems !== undefined) {
        this.validateLineItems(updateBillDto.lineItems);
      }

      // Merge existing bill data with update data (partial update)
      // const updatedData = {
      //   ...existingBill.data,
      //   ...updateBillDto,
      // };

      // Update bill in database
      // existingBill.data = updatedData;
      // existingBill.updatedAt = new Date(); // Set updatedAt timestamp
      // const updatedBill = await this.billRepository.save(existingBill);

      // Map entity to DTO
      // const billDto: BillResponseDto = {
      //   id: updatedBill.id,
      //   ...updatedBill.data,
      //   createdAt: updatedBill.createdAt,
      //   updatedAt: updatedBill.updatedAt,
      // };

      // this.logger.log(
      //   JSON.stringify({
      //     event: 'update_bill_success',
      //     billId: id,
      //     tenantId,
      //     updatedFields: Object.keys(updateBillDto).filter((key) => updateBillDto[key] !== undefined),
      //     timestamp: new Date().toISOString(),
      //   }),
      // );

      // return billDto;

      // Temporary stub implementation until Bill entity is available in @avantodev/avanto-db
      // This will be replaced with the actual implementation above once Bill entity is published
      this.logger.warn(
        JSON.stringify({
          event: 'update_bill_stub_warning',
          message:
            'Bill entity not yet available in @avantodev/avanto-db. Using stub implementation. Full implementation will be available after Bill entity is published.',
          billId: id,
          tenantId,
          timestamp: new Date().toISOString(),
        }),
      );

      // Return mock response for now
      throw new NotFoundException({
        statusCode: 404,
        error: 'Not Found',
        message: `Bill with ID ${id} not found`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Re-throw HTTP exceptions as-is
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      // Log and wrap unknown errors
      this.logger.error(
        JSON.stringify({
          event: 'update_bill_error',
          billId: id,
          tenantId,
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }),
      );

      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: error.message || 'Failed to update bill',
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Validate lineItems array
   * Throws BadRequestException if validation fails
   */
  private validateLineItems(lineItems: any[]): void {
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'lineItems array must have at least one item',
        timestamp: new Date().toISOString(),
      });
    }

    lineItems.forEach((lineItem, index) => {
      if (!lineItem.productNumber || lineItem.productNumber.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productNumber is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (!lineItem.productDescription || lineItem.productDescription.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productDescription is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (!lineItem.catalogCode || lineItem.catalogCode.trim() === '') {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].catalogCode is required and must be a non-empty string`,
          timestamp: new Date().toISOString(),
        });
      }

      if (lineItem.quantity === undefined || lineItem.quantity === null || lineItem.quantity < 1) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].quantity is required and must be a number >= 1`,
          timestamp: new Date().toISOString(),
        });
      }

      if (lineItem.productSell === undefined || lineItem.productSell === null || lineItem.productSell < 0) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].productSell is required and must be a number >= 0`,
          timestamp: new Date().toISOString(),
        });
      }

      // Validate discounts are 0-100 range
      if (lineItem.sellDiscount !== undefined && (lineItem.sellDiscount < 0 || lineItem.sellDiscount > 100)) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].sellDiscount must be between 0 and 100`,
          timestamp: new Date().toISOString(),
        });
      }

      if (
        lineItem.purchaseDiscount !== undefined &&
        (lineItem.purchaseDiscount < 0 || lineItem.purchaseDiscount > 100)
      ) {
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: `lineItems[${index}].purchaseDiscount must be between 0 and 100`,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }
}
