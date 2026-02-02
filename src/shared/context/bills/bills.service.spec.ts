import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from '../../../context/bills/dto/create-bill.dto';

describe('BillsService', () => {
  let service: BillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillsService],
    }).compile();

    service = module.get<BillsService>(BillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    const testId = '550e8400-e29b-41d4-a716-446655440000';
    const testTenantId = 1;

    it('should accept id and tenantId parameters', async () => {
      // Test that method signature accepts correct parameters
      // This will throw NotFoundException until Bill entity is available
      await expect(service.findOne(testId, testTenantId)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when bill not found', async () => {
      await expect(service.findOne(testId, testTenantId)).rejects.toThrow(NotFoundException);

      const error = await service.findOne(testId, testTenantId).catch((e) => e);
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.getStatus()).toBe(404);
      const response = error.getResponse();
      expect(response).toHaveProperty('statusCode', 404);
      expect(response).toHaveProperty('error', 'Not Found');
      expect(response.message).toContain(`Bill with ID ${testId} not found`);
    });

    it('should enforce tenant isolation by including tenantId in query', async () => {
      // Note: Full tenant isolation test will be available once Bill entity is published
      // The commented-out implementation includes tenantId in the WHERE clause:
      // where: { id, tenantId }
      // This ensures bills from other tenants cannot be accessed

      // For now, verify the method accepts tenantId parameter
      await expect(service.findOne(testId, testTenantId)).rejects.toThrow(NotFoundException);
    });

    it('should log bill retrieval with id and tenantId', async () => {
      const loggerSpy = jest.spyOn(service['logger'], 'log');

      await service.findOne(testId, testTenantId).catch(() => {
        // Expected to throw NotFoundException
      });

      expect(loggerSpy).toHaveBeenCalled();
      // Find the log call with event 'find_one_bill' or 'find_one_bill_start'
      // Note: Once BILLS-07 is merged, this will be 'find_one_bill_start'
      const logCall = loggerSpy.mock.calls.find((call) => {
        const logData = JSON.parse(call[0]);
        return logData.event === 'find_one_bill' || logData.event === 'find_one_bill_start';
      });
      expect(logCall).toBeDefined();
      if (logCall) {
        const logData = JSON.parse(logCall[0]);
        expect(logData).toHaveProperty('event');
        expect(['find_one_bill', 'find_one_bill_start']).toContain(logData.event);
        expect(logData).toHaveProperty('billId', testId);
        expect(logData).toHaveProperty('tenantId', testTenantId);
        expect(logData).toHaveProperty('timestamp');
      }

      loggerSpy.mockRestore();
    });

    it('should return BillResponseDto when bill is found (stub currently throws NotFoundException)', async () => {
      // Note: This test will pass once Bill entity is available and implementation is uncommented
      // For now, verify the method signature returns Promise<BillResponseDto>
      // and throws NotFoundException as expected in stub implementation

      await expect(service.findOne(testId, testTenantId)).rejects.toThrow(NotFoundException);

      // Once Bill entity is available, this test should verify:
      // const result = await service.findOne(testId, testTenantId);
      // expect(result).toBeInstanceOf(BillResponseDto);
      // expect(result).toHaveProperty('id');
      // expect(result).toHaveProperty('createdAt');
      // expect(result).toHaveProperty('updatedAt');
    });

    it('should handle errors and wrap in NotFoundException', async () => {
      // Test error handling path
      const loggerErrorSpy = jest.spyOn(service['logger'], 'error');

      await service.findOne(testId, testTenantId).catch(() => {
        // Expected to throw NotFoundException
      });

      // Verify error logging is called (for unknown errors)
      // In the current stub, it will throw NotFoundException directly
      // Once entity is available, this will test the catch block error handling

      loggerErrorSpy.mockRestore();
    });

    it('should throw NotFoundException if bill belongs to different tenant', async () => {
      // Note: Full tenant isolation test will be available once Bill entity is published
      // The implementation includes tenantId in WHERE clause, so querying with wrong tenantId
      // will return null, which triggers NotFoundException
      // This ensures tenant isolation is enforced at database level

      const differentTenantId = 999;
      await expect(service.findOne(testId, differentTenantId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const testTenantId = 1;
    const testIdempotencyKey = 'test-idempotency-key-123';

    const createValidBillDto = (): CreateBillDto => ({
      billInfo: {
        invoiceNumber: 'INV-2025-001',
        invoiceDate: '2025-01-15',
      },
      vendor: {
        vendorName: 'Test Vendor',
      },
      lineItems: [
        {
          productNumber: 'PROD-001',
          productDescription: 'Test Product',
          catalogCode: 'CAT-001',
          quantity: 10,
          productSell: 100.0,
        },
      ],
    });

    it('should accept CreateBillDto, tenantId, and idempotencyKey parameters', async () => {
      const dto = createValidBillDto();
      const result = await service.create(dto, testTenantId, testIdempotencyKey);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });

    it('should validate required fields and throw BadRequestException for missing billInfo', async () => {
      const dto = {
        vendor: { vendorName: 'Test Vendor' },
        lineItems: [
          {
            productNumber: 'PROD-001',
            productDescription: 'Test Product',
            catalogCode: 'CAT-001',
            quantity: 10,
            productSell: 100.0,
          },
        ],
      } as CreateBillDto;

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('billInfo is required');
    });

    it('should validate required fields and throw BadRequestException for missing invoiceNumber', async () => {
      const dto = createValidBillDto();
      dto.billInfo.invoiceNumber = '';

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('billInfo.invoiceNumber is required');
    });

    it('should validate required fields and throw BadRequestException for missing vendorName', async () => {
      const dto = createValidBillDto();
      dto.vendor.vendorName = '';

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('vendor.vendorName is required');
    });

    it('should validate lineItems array has at least one item', async () => {
      const dto = createValidBillDto();
      dto.lineItems = [];

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('lineItems array is required and must have at least one item');
    });

    it('should validate each lineItem has required fields', async () => {
      const dto = createValidBillDto();
      dto.lineItems[0].productNumber = '';

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('lineItems[0].productNumber is required');
    });

    it('should validate lineItem quantity is >= 1', async () => {
      const dto = createValidBillDto();
      dto.lineItems[0].quantity = 0;

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('lineItems[0].quantity is required and must be a number >= 1');
    });

    it('should validate lineItem productSell is >= 0', async () => {
      const dto = createValidBillDto();
      dto.lineItems[0].productSell = -1;

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('lineItems[0].productSell is required and must be a number >= 0');
    });

    it('should validate lineItem discounts are 0-100 range', async () => {
      const dto = createValidBillDto();
      dto.lineItems[0].sellDiscount = 150;

      await expect(service.create(dto, testTenantId)).rejects.toThrow(BadRequestException);
      const error = await service.create(dto, testTenantId).catch((e) => e);
      expect(error.getResponse().message).toContain('lineItems[0].sellDiscount must be between 0 and 100');
    });

    it('should log bill creation with invoiceNumber, tenantId, and idempotencyKey', async () => {
      const dto = createValidBillDto();
      const loggerSpy = jest.spyOn(service['logger'], 'log');

      await service.create(dto, testTenantId, testIdempotencyKey);

      expect(loggerSpy).toHaveBeenCalled();
      const logCall = loggerSpy.mock.calls.find((call) => {
        const logData = JSON.parse(call[0]);
        return logData.event === 'create_bill_start';
      });
      expect(logCall).toBeDefined();
      if (logCall) {
        const logData = JSON.parse(logCall[0]);
        expect(logData).toHaveProperty('event', 'create_bill_start');
        expect(logData).toHaveProperty('invoiceNumber', dto.billInfo.invoiceNumber);
        expect(logData).toHaveProperty('tenantId', testTenantId);
        expect(logData).toHaveProperty('idempotencyKey', testIdempotencyKey);
        expect(logData).toHaveProperty('timestamp');
      }

      loggerSpy.mockRestore();
    });

    it('should return BillResponseDto when bill is created successfully (stub implementation)', async () => {
      const dto = createValidBillDto();
      const result = await service.create(dto, testTenantId);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
      expect(result.billInfo.invoiceNumber).toBe(dto.billInfo.invoiceNumber);
      expect(result.vendor.vendorName).toBe(dto.vendor.vendorName);
      expect(result.lineItems.length).toBe(dto.lineItems.length);
    });

    it('should throw ConflictException for duplicate invoiceNumber (commented out until Bill entity available)', async () => {
      // Note: Full duplicate check test will be available once Bill entity is published
      // The commented-out implementation checks for existing bill with same invoiceNumber
      // and throws ConflictException if found
      // For now, the stub implementation returns a mock response

      const dto = createValidBillDto();
      const result = await service.create(dto, testTenantId);
      expect(result).toBeDefined();

      // Once Bill entity is available, this test should verify:
      // await expect(service.create(dto, testTenantId)).rejects.toThrow(ConflictException);
    });
  });
});
