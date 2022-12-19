import { Test, TestingModule } from '@nestjs/testing';
import { RecordAdditionalFieldsByTypesService } from './record-additional-fields-by-types.service';

describe('RecordAdditionalFieldsByTypesService', () => {
  let service: RecordAdditionalFieldsByTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordAdditionalFieldsByTypesService],
    }).compile();

    service = module.get<RecordAdditionalFieldsByTypesService>(RecordAdditionalFieldsByTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
