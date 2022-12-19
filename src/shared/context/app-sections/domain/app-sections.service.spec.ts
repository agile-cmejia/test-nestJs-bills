import { Test, TestingModule } from '@nestjs/testing';
import { AppSectionsService } from './app-sections.service';

describe('AppSectionsService', () => {
  let service: AppSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppSectionsService],
    }).compile();

    service = module.get<AppSectionsService>(AppSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
