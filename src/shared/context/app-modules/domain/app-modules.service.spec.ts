import { Test, TestingModule } from '@nestjs/testing';
import { AppModulesService } from './app-modules.service';

describe('AppModulesService', () => {
  let service: AppModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppModulesService],
    }).compile();

    service = module.get<AppModulesService>(AppModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
