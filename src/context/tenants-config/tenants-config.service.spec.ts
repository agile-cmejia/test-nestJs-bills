import { Test, TestingModule } from '@nestjs/testing';
import { TenantsConfigService } from './tenants-config.service';

describe('TenantsConfigService', () => {
  let service: TenantsConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantsConfigService],
    }).compile();

    service = module.get<TenantsConfigService>(TenantsConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
