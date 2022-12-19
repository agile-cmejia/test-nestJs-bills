import { Test, TestingModule } from '@nestjs/testing';
import { AppMenuItemsService } from './app-menu-items.service';

describe('AppMenuItemsService', () => {
  let service: AppMenuItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMenuItemsService],
    }).compile();

    service = module.get<AppMenuItemsService>(AppMenuItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
