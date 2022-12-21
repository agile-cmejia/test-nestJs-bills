import { RecordTypesService } from './../../record-types/domain/record-types.service';
import { RecordProblemCodeByType } from '../infrastructure/entities/record-problem-code-by-type.entity';
import { dbConfig } from 'src/shared/infrastructure/persistance/postgre-sql/dbConfig';
import { capitalizeSentence } from './../../../utils';
import { ForbiddenException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecordProblemCodeByTypeDto } from './dto/create-record-problem-code-by-type.dto';
import { UpdateRecordProblemCodeByTypeDto } from './dto/update-record-problem-code-by-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindRecordProblemCodeByTypeDto } from './dto/find-record-problem-code-by-type.dto';

@Injectable()
export class RecordProblemCodeByTypesService {
  private readonly logger = new Logger(RecordProblemCodeByTypesService.name);
  private recordProblemCodeByTypesCollection: RecordProblemCodeByType[] = [];

  constructor(
    @InjectRepository(RecordProblemCodeByType, dbConfig.name)
    private readonly recordProblemCodeByTypeRepository: Repository<RecordProblemCodeByType>,

    @Inject(forwardRef(() => RecordTypesService))
    private readonly recordTypesService: RecordTypesService,
  ) {}

  async create(createRecordProblemCodeByTypeDto: CreateRecordProblemCodeByTypeDto) {
    this.logger.log('Creating new Field Visibility by Tenant Type...');
    const { recordTypeId } = createRecordProblemCodeByTypeDto;

    const existingRecordType = await this.recordTypesService.findByMany({
      ids: [recordTypeId],
    });
    if (existingRecordType.length < 1) {
      this.logger.error(`The Field Visibility by Tenant Type with id ${recordTypeId} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by Tenant Type with id ${recordTypeId} was not found`,
      });
    }

    const value = capitalizeSentence(createRecordProblemCodeByTypeDto.value.trim());
    const existingProblemCode = await this.recordProblemCodeByTypeRepository.findOneBy({
      value,
      recordType: existingRecordType,
    });
    if (existingProblemCode) {
      this.logger.error(
        `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      );
      throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
        cause: new Error(),
        description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      });
    }

    const newRecordType = this.recordProblemCodeByTypeRepository.create({
      ...createRecordProblemCodeByTypeDto,
      value,
    });

    newRecordType.recordType = existingRecordType[0];

    return await this.recordProblemCodeByTypeRepository.save(newRecordType);
  }

  async findByMany(findRecordTypeDto: FindRecordProblemCodeByTypeDto) {
    const { ids, values, enabled, recordTypeIds } = findRecordTypeDto;
    let query = this.recordProblemCodeByTypeRepository
      .createQueryBuilder('RecordProblemCodeByTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('RecordProblemCodeByTypes.id IN (:...ids) ', { ids });
    }
    if (values && values.length > 0) {
      this.logger.log(`Finding by values: ${values}`);
      query = query.andWhere('RecordProblemCodeByTypes.value IN (:...values) ', {
        values: values.map((value) => capitalizeSentence(value.trim())),
      });
    }
    if (recordTypeIds && recordTypeIds.length > 0) {
      this.logger.log(`Finding by Field Visibility by tenant Type Ids: ${recordTypeIds}`);
      query = query.andWhere('recordTypes.id IN (:...recordTypeIds)', { recordTypeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('RecordProblemCodeByTypes.enabled = :enabled ', { enabled });
    }

    this.recordProblemCodeByTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.recordProblemCodeByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordProblemCodeByTypesCollection;
  }

  async findAll() {
    this.logger.log('Finding All Field Visibility by Tenant Types...');
    this.recordProblemCodeByTypesCollection = await this.recordProblemCodeByTypeRepository
      .createQueryBuilder('RecordProblemCodeByTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .getMany();
    this.logger.log(`Found ${this.recordProblemCodeByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordProblemCodeByTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Field Visibility by Tenant Type with id: ${id}.`);
    this.recordProblemCodeByTypesCollection = await this.recordProblemCodeByTypeRepository
      .createQueryBuilder('RecordProblemCodeByTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordProblemCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .andWhere('RecordProblemCodeByTypes.id = :id ', { id })
      .getMany();

    if (this.recordProblemCodeByTypesCollection.length < 1) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was found.`);
    return this.recordProblemCodeByTypesCollection[0];
  }

  async update(id: number, updateRecordProblemCodeByTypeDto: UpdateRecordProblemCodeByTypeDto) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordProblemCodeByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }

    const recordTypeId = updateRecordProblemCodeByTypeDto.recordTypeId || recordFieldVisibilityToUpdate.recordType.id;

    const value = updateRecordProblemCodeByTypeDto.value
      ? capitalizeSentence(updateRecordProblemCodeByTypeDto.value.trim())
      : capitalizeSentence(recordFieldVisibilityToUpdate.value.trim());

    let recordType = recordFieldVisibilityToUpdate.recordType;
    if (updateRecordProblemCodeByTypeDto.recordTypeId) {
      const existingRecordType = await this.recordTypesService.findByMany({
        ids: [recordTypeId],
      });
      if (existingRecordType.length < 1) {
        this.logger.error(`The Field Visibility by Tenant Type with id ${recordTypeId} was not found`);
        throw new NotFoundException('Field Visibility by Tenant Type not found', {
          cause: new Error(),
          description: `The Field Visibility by Tenant Type with id ${recordTypeId} was not found`,
        });
      }
      recordType = existingRecordType[0];
    }
    if (updateRecordProblemCodeByTypeDto.recordTypeId || updateRecordProblemCodeByTypeDto.value) {
      const existingProblemCode = await this.recordProblemCodeByTypeRepository.findOneBy({
        value,
        recordType,
      });
      if (existingProblemCode.id != id) {
        this.logger.error(
          `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        );
        throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
          cause: new Error(),
          description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        });
      }
    }

    this.recordProblemCodeByTypeRepository.merge(
      recordFieldVisibilityToUpdate,
      updateRecordProblemCodeByTypeDto,
      recordType,
    );
    this.logger.log(`New data for Field Visibility by Tenant Type with id: ${id} was merged.`);

    return await this.recordProblemCodeByTypeRepository.save(recordFieldVisibilityToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordProblemCodeByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    recordFieldVisibilityToUpdate.enabled = false;
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was disabled.`);

    return await this.recordProblemCodeByTypeRepository.save(recordFieldVisibilityToUpdate);
  }
}
