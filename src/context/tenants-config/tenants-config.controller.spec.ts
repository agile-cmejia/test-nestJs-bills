import { Test, TestingModule } from '@nestjs/testing';
import { TenantsConfigController } from './tenants-config.controller';
import { TenantsConfigService } from './tenants-config.service';

describe('TenantsConfigController', () => {
  let controller: TenantsConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantsConfigController],
      providers: [TenantsConfigService],
    }).compile();

    controller = module.get<TenantsConfigController>(TenantsConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
