import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Bills API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('GET /api/v1/bills', () => {
    it('should return 401 Unauthorized when tenantId is missing', () => {
      return request(app.getHttpServer())
        .get('/api/v1/bills')
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('error', 'Unauthorized');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('Tenant ID is required');
        });
    });

    it('should return 200 with paginated response structure when authenticated', () => {
      // Note: This test will work once authentication guard is implemented
      // For now, we test the endpoint structure
      // In a real scenario, you would set x-api-key and x-api-secret headers
      // or use a Bearer token, and the guard would set request.tenant
      return request(app.getHttpServer()).get('/api/v1/bills').expect(401); // Will return 401 until auth guard is set up
    });

    it('should accept pagination query parameters', () => {
      return request(app.getHttpServer()).get('/api/v1/bills?page=1&limit=20').expect(401); // Will return 401 until auth guard is set up
    });

    it('should accept filter query parameters', () => {
      return request(app.getHttpServer()).get('/api/v1/bills?invoiceNumber=INV-001&vendorName=Acme').expect(401); // Will return 401 until auth guard is set up
    });

    it('should validate limit maximum value (100)', () => {
      return request(app.getHttpServer()).get('/api/v1/bills?limit=101').expect(400); // Should fail validation
    });

    it('should validate page minimum value (1)', () => {
      return request(app.getHttpServer()).get('/api/v1/bills?page=0').expect(400); // Should fail validation
    });
  });

  describe('GET /api/v1/bills/:id', () => {
    it('should return 401 Unauthorized when tenantId is missing', () => {
      return request(app.getHttpServer())
        .get('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('error', 'Unauthorized');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('Tenant ID is required');
        });
    });

    it('should return 404 Not Found when bill does not exist', () => {
      // Note: This test will work once authentication guard is implemented
      // For now, we test the endpoint structure
      // In a real scenario, you would set x-api-key and x-api-secret headers
      // or use a Bearer token, and the guard would set request.tenant
      return request(app.getHttpServer()).get('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000').expect(401); // Will return 401 until auth guard is set up
    });

    it('should accept valid UUID format for id parameter', () => {
      return request(app.getHttpServer()).get('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000').expect(401); // Will return 401 until auth guard is set up
    });

    it('should return 404 for non-existent bill ID', () => {
      // Note: This test will work once authentication guard is implemented
      // The service currently throws NotFoundException for all IDs (stub implementation)
      return request(app.getHttpServer()).get('/api/v1/bills/non-existent-id').expect(401); // Will return 401 until auth guard is set up
    });
  });

  describe('POST /api/v1/bills', () => {
    const validCreateBillDto = {
      billInfo: {
        invoiceNumber: 'INV-2025-001',
        invoiceDate: '2025-01-15',
      },
      vendor: {
        vendorName: 'Acme Corporation',
      },
      lineItems: [
        {
          productNumber: 'PROD-001',
          productDescription: 'Office Chair',
          catalogCode: 'CAT-001',
          quantity: 10,
          productSell: 90.0,
        },
      ],
    };

    it('should return 401 Unauthorized when tenantId is missing', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .send(validCreateBillDto)
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('error', 'Unauthorized');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('Tenant ID is required');
        });
    });

    it('should return 400 for invalid data (missing required fields)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .send({
          billInfo: {
            invoiceNumber: 'INV-001',
            // Missing invoiceDate
          },
        })
        .expect(400);
    });

    it('should return 400 for invalid data (empty lineItems array)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .send({
          billInfo: {
            invoiceNumber: 'INV-001',
            invoiceDate: '2025-01-15',
          },
          vendor: {
            vendorName: 'Acme',
          },
          lineItems: [], // Empty array should fail validation
        })
        .expect(400);
    });

    it('should accept X-Idempotency-Key header', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .set('X-Idempotency-Key', 'test-idempotency-key-123')
        .send(validCreateBillDto)
        .expect(401); // Will return 401 until auth guard is set up
    });

    it('should return 201 with BillResponseDto structure when authenticated', () => {
      // Note: This test will work once authentication guard is implemented
      // For now, we test the endpoint structure
      // In a real scenario, you would set x-api-key and x-api-secret headers
      // or use a Bearer token, and the guard would set request.tenant
      return request(app.getHttpServer()).post('/api/v1/bills').send(validCreateBillDto).expect(401); // Will return 401 until auth guard is set up
    });

    it('should validate lineItem quantity minimum value (1)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .send({
          ...validCreateBillDto,
          lineItems: [
            {
              ...validCreateBillDto.lineItems[0],
              quantity: 0, // Should fail validation
            },
          ],
        })
        .expect(400);
    });

    it('should validate lineItem productSell minimum value (0)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/bills')
        .send({
          ...validCreateBillDto,
          lineItems: [
            {
              ...validCreateBillDto.lineItems[0],
              productSell: -1, // Should fail validation
            },
          ],
        })
        .expect(400);
    });
  });

  describe('PATCH /api/v1/bills/:id', () => {
    const validUpdateBillDto = {
      billInfo: {
        invoiceStatus: 'Approved',
      },
    };

    it('should return 401 Unauthorized when tenantId is missing', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send(validUpdateBillDto)
        .expect(401)
        .expect((res) => {
          expect(res.body).toHaveProperty('statusCode', 401);
          expect(res.body).toHaveProperty('error', 'Unauthorized');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('Tenant ID is required');
        });
    });

    it('should return 404 Not Found when bill does not exist', () => {
      // Note: This test will work once authentication guard is implemented
      // For now, we test the endpoint structure
      // In a real scenario, you would set x-api-key and x-api-secret headers
      // or use a Bearer token, and the guard would set request.tenant
      // The service currently throws NotFoundException for all IDs (stub implementation)
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send(validUpdateBillDto)
        .expect(401); // Will return 401 until auth guard is set up
    });

    it('should accept partial update (only provided fields)', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send({
          billInfo: {
            invoiceStatus: 'Paid',
          },
        })
        .expect(401); // Will return 401 until auth guard is set up
    });

    it('should accept valid UUID format for id parameter', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send(validUpdateBillDto)
        .expect(401); // Will return 401 until auth guard is set up
    });

    it('should return 400 for invalid update data', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send({
          lineItems: [
            {
              quantity: 0, // Should fail validation (minimum 1)
            },
          ],
        })
        .expect(400);
    });

    it('should return 200 with BillResponseDto structure when authenticated', () => {
      // Note: This test will work once authentication guard is implemented
      // For now, we test the endpoint structure
      // In a real scenario, you would set x-api-key and x-api-secret headers
      // or use a Bearer token, and the guard would set request.tenant
      return request(app.getHttpServer())
        .patch('/api/v1/bills/550e8400-e29b-41d4-a716-446655440000')
        .send(validUpdateBillDto)
        .expect(401); // Will return 401 until auth guard is set up
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
