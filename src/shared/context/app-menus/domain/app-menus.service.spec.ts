import { Test, TestingModule } from '@nestjs/testing';
import { AppMenusService } from './app-menus.service';

describe('AppMenusService', () => {
  let service: AppMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMenusService],
    }).compile();

    service = module.get<AppMenusService>(AppMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
