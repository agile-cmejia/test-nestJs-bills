import { Test, TestingModule } from '@nestjs/testing';
import { RecordStatusCodeByTypesService } from './record-status-code-by-types.service';

describe('RecordStatusCodeByTypesService', () => {
  let service: RecordStatusCodeByTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordStatusCodeByTypesService],
    }).compile();

    service = module.get<RecordStatusCodeByTypesService>(RecordStatusCodeByTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
