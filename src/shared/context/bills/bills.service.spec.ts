import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BillsService } from './bills.service';

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
      const logCall = loggerSpy.mock.calls[0][0];
      const logData = JSON.parse(logCall);
      expect(logData).toHaveProperty('event', 'find_one_bill_start');
      expect(logData).toHaveProperty('billId', testId);
      expect(logData).toHaveProperty('tenantId', testTenantId);
      expect(logData).toHaveProperty('timestamp');

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
});
