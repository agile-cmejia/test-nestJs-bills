import { Test, TestingModule } from '@nestjs/testing';
import { CoverageZoneService } from './coverage-zone.service';

describe('CoverageZoneService', () => {
  let service: CoverageZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoverageZoneService],
    }).compile();

    service = module.get<CoverageZoneService>(CoverageZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
