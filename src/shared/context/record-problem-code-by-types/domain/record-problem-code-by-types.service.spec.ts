import { Test, TestingModule } from '@nestjs/testing';
import { RecordProblemCodeByTypesService } from './record-problem-code-by-types.service';

describe('RecordProblemCodeByTypesService', () => {
  let service: RecordProblemCodeByTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordProblemCodeByTypesService],
    }).compile();

    service = module.get<RecordProblemCodeByTypesService>(RecordProblemCodeByTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
