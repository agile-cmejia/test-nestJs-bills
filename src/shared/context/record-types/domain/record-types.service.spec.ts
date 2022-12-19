import { Test, TestingModule } from '@nestjs/testing';
import { RecordTypesService } from './record-types.service';

describe('RecordTypesService', () => {
  let service: RecordTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordTypesService],
    }).compile();

    service = module.get<RecordTypesService>(RecordTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
