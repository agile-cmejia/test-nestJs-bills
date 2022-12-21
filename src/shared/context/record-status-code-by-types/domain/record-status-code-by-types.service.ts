import { RecordTypesService } from './../../record-types/domain/record-types.service';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { RecordStatusCodeByType } from '../infrastructure/entities/record-status-code-by-type.entity';
import { capitalizeSentence } from './../../../utils';
import { Injectable, NotFoundException, ForbiddenException, Logger, Inject, forwardRef } from '@nestjs/common';
import { CreateRecordStatusCodeByTypeDto } from './dto/create-record-status-code-by-type.dto';
import { UpdateRecordStatusCodeByTypeDto } from './dto/update-record-status-code-by-type.dto';
import { FindRecordStatusCodeByTypeDto } from './dto/find-record-status-code-by-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordStatusCodeByTypesService {
  private readonly logger = new Logger(RecordStatusCodeByTypesService.name);
  private recordStatusCodeByTypesCollection: RecordStatusCodeByType[] = [];

  constructor(
    @InjectRepository(RecordStatusCodeByType, dbConfig.name)
    private readonly recordStatusCodeByTypeRepository: Repository<RecordStatusCodeByType>,

    @Inject(forwardRef(() => RecordTypesService))
    private readonly recordTypesService: RecordTypesService,
  ) {}

  async create(createRecordStatusCodeByTypeDto: CreateRecordStatusCodeByTypeDto) {
    this.logger.log('Creating new Field Visibility by Tenant Type...');

    const { recordTypeId } = createRecordStatusCodeByTypeDto;

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

    const value = capitalizeSentence(createRecordStatusCodeByTypeDto.value.trim());
    const existingStatusCode = await this.recordStatusCodeByTypeRepository.findOneBy({
      value,
      recordType: existingRecordType,
    });
    if (existingStatusCode) {
      this.logger.error(
        `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      );
      throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
        cause: new Error(),
        description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      });
    }

    const newRecordType = this.recordStatusCodeByTypeRepository.create({
      ...createRecordStatusCodeByTypeDto,
      value,
    });

    newRecordType.recordType = existingRecordType[0];

    return await this.recordStatusCodeByTypeRepository.save(newRecordType);
  }

  async findByMany(findRecordStatusCodeByTypeDto: FindRecordStatusCodeByTypeDto) {
    const { ids, values, enabled, recordTypeIds } = findRecordStatusCodeByTypeDto;
    let query = this.recordStatusCodeByTypeRepository
      .createQueryBuilder('RecordStatusCodeByTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('RecordStatusCodeByTypes.id IN (:...ids) ', { ids });
    }
    if (values && values.length > 0) {
      this.logger.log(`Finding by values: ${values}`);
      query = query.andWhere('RecordStatusCodeByTypes.value IN (:...values) ', {
        values: values.map((value) => capitalizeSentence(value.trim())),
      });
    }
    if (recordTypeIds && recordTypeIds.length > 0) {
      this.logger.log(`Finding by Field Visibility by tenant Type Ids: ${recordTypeIds}`);
      query = query.andWhere('recordTypes.id IN (:...recordTypeIds)', { recordTypeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('RecordStatusCodeByTypes.enabled = :enabled ', { enabled });
    }

    this.recordStatusCodeByTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.recordStatusCodeByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordStatusCodeByTypesCollection;
  }

  async findAll() {
    this.logger.log('Finding All Field Visibility by Tenant Types...');
    this.recordStatusCodeByTypesCollection = await this.recordStatusCodeByTypeRepository
      .createQueryBuilder('RecordStatusCodeByTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .getMany();
    this.logger.log(`Found ${this.recordStatusCodeByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordStatusCodeByTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Field Visibility by Tenant Type with id: ${id}.`);
    this.recordStatusCodeByTypesCollection = await this.recordStatusCodeByTypeRepository
      .createQueryBuilder('RecordStatusCodeByTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordStatusCodeByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .andWhere('RecordStatusCodeByTypes.id = :id ', { id })
      .getMany();

    if (this.recordStatusCodeByTypesCollection.length < 1) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was found.`);
    return this.recordStatusCodeByTypesCollection[0];
  }

  async update(id: number, updateRecordStatusCodeByTypeDto: UpdateRecordStatusCodeByTypeDto) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordStatusCodeByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }

    const recordTypeId = updateRecordStatusCodeByTypeDto.recordTypeId || recordFieldVisibilityToUpdate.recordType.id;

    const value = updateRecordStatusCodeByTypeDto.value
      ? capitalizeSentence(updateRecordStatusCodeByTypeDto.value.trim())
      : capitalizeSentence(recordFieldVisibilityToUpdate.value.trim());

    let recordType = recordFieldVisibilityToUpdate.recordType;
    if (updateRecordStatusCodeByTypeDto.recordTypeId) {
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
    if (updateRecordStatusCodeByTypeDto.recordTypeId || updateRecordStatusCodeByTypeDto.value) {
      const existingStatusCode = await this.recordStatusCodeByTypeRepository.findOneBy({
        value,
        recordType,
      });
      if (existingStatusCode.id != id) {
        this.logger.error(
          `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        );
        throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
          cause: new Error(),
          description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        });
      }
    }

    this.recordStatusCodeByTypeRepository.merge(
      recordFieldVisibilityToUpdate,
      updateRecordStatusCodeByTypeDto,
      recordType,
    );
    this.logger.log(`New data for Field Visibility by Tenant Type with id: ${id} was merged.`);

    return await this.recordStatusCodeByTypeRepository.save(recordFieldVisibilityToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordStatusCodeByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    recordFieldVisibilityToUpdate.enabled = false;
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was disabled.`);

    return await this.recordStatusCodeByTypeRepository.save(recordFieldVisibilityToUpdate);
  }
}
