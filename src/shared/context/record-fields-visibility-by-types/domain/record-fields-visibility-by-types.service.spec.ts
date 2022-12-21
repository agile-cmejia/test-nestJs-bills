import { Test, TestingModule } from '@nestjs/testing';
import { RecordFieldsVisibilityByTypesService } from './record-fields-visibility-by-types.service';

describe('RecordFieldsVisibilityByTypesService', () => {
  let service: RecordFieldsVisibilityByTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordFieldsVisibilityByTypesService],
    }).compile();

    service = module.get<RecordFieldsVisibilityByTypesService>(RecordFieldsVisibilityByTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
