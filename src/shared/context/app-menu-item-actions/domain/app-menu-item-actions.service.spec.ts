import { Test, TestingModule } from '@nestjs/testing';
import { AppMenuItemActionsService } from './app-menu-item-actions.service';

describe('AppMenuItemActionsService', () => {
  let service: AppMenuItemActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppMenuItemActionsService],
    }).compile();

    service = module.get<AppMenuItemActionsService>(AppMenuItemActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
