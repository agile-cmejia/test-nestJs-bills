import { RecordTypesService } from './../../record-types/domain/record-types.service';
import { capitalizeSentence } from './../../../utils';
import { RecordFieldsVisibilityByType } from '../infrastructure/entities/record-fields-visibility-by-type.entity';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, Inject, Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateRecordFieldsVisibilityByTypeDto } from './dto/create-record-fields-visibility-by-type.dto';
import { UpdateRecordFieldsVisibilityByTypeDto } from './dto/update-record-fields-visibility-by-type.dto';
import { Repository } from 'typeorm';
import { FindRecordFieldsVisibilityByTypeDto } from './dto/find-record-fields-visibility-by-type.dto';

@Injectable()
export class RecordFieldsVisibilityByTypesService {
  private readonly logger = new Logger(RecordFieldsVisibilityByTypesService.name);
  private recordFieldsVisibilityByTypesCollection: RecordFieldsVisibilityByType[] = [];

  constructor(
    @InjectRepository(RecordFieldsVisibilityByType, dbConfig.name)
    private readonly recordFieldsVisibilityByTypeRepository: Repository<RecordFieldsVisibilityByType>,

    @Inject(forwardRef(() => RecordTypesService))
    private readonly recordTypesService: RecordTypesService,
  ) {}

  async create(createRecordFieldsVisibilityByTypeDto: CreateRecordFieldsVisibilityByTypeDto) {
    this.logger.log('Creating new Field Visibility by Tenant Type...');
    const { recordTypeId } = createRecordFieldsVisibilityByTypeDto;

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

    const value = capitalizeSentence(createRecordFieldsVisibilityByTypeDto.value.trim());
    const existingFieldsVisibility = await this.recordFieldsVisibilityByTypeRepository.findOneBy({
      value,
      recordType: existingRecordType,
    });
    if (existingFieldsVisibility) {
      this.logger.error(
        `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      );
      throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
        cause: new Error(),
        description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
      });
    }

    const newRecordType = this.recordFieldsVisibilityByTypeRepository.create({
      ...createRecordFieldsVisibilityByTypeDto,
      value,
    });

    newRecordType.recordType = existingRecordType[0];

    return await this.recordFieldsVisibilityByTypeRepository.save(newRecordType);
  }

  async findByMany(findRecordTypeDto: FindRecordFieldsVisibilityByTypeDto) {
    const { ids, values, enabled, recordTypeIds } = findRecordTypeDto;
    let query = this.recordFieldsVisibilityByTypeRepository
      .createQueryBuilder('RecordFieldsVisibilityByTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('RecordFieldsVisibilityByTypes.id IN (:...ids) ', { ids });
    }
    if (values && values.length > 0) {
      this.logger.log(`Finding by values: ${values}`);
      query = query.andWhere('RecordFieldsVisibilityByTypes.value IN (:...values) ', {
        values: values.map((value) => capitalizeSentence(value.trim())),
      });
    }
    if (recordTypeIds && recordTypeIds.length > 0) {
      this.logger.log(`Finding by Field Visibility by tenant Type Ids: ${recordTypeIds}`);
      query = query.andWhere('recordTypes.id IN (:...recordTypeIds)', { recordTypeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('RecordFieldsVisibilityByTypes.enabled = :enabled ', { enabled });
    }

    this.recordFieldsVisibilityByTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.recordFieldsVisibilityByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordFieldsVisibilityByTypesCollection;
  }

  async findAll() {
    this.logger.log('Finding All Field Visibility by Tenant Types...');
    this.recordFieldsVisibilityByTypesCollection = await this.recordFieldsVisibilityByTypeRepository
      .createQueryBuilder('RecordFieldsVisibilityByTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .getMany();
    this.logger.log(`Found ${this.recordFieldsVisibilityByTypesCollection.length} Field Visibility by Tenant Types`);
    return this.recordFieldsVisibilityByTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Field Visibility by Tenant Type with id: ${id}.`);
    this.recordFieldsVisibilityByTypesCollection = await this.recordFieldsVisibilityByTypeRepository
      .createQueryBuilder('RecordFieldsVisibilityByTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordFieldsVisibilityByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .andWhere('RecordFieldsVisibilityByTypes.id = :id ', { id })
      .getMany();

    if (this.recordFieldsVisibilityByTypesCollection.length < 1) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was found.`);
    return this.recordFieldsVisibilityByTypesCollection[0];
  }

  async update(id: number, updateRecordFieldsVisibilityByTypeDto: UpdateRecordFieldsVisibilityByTypeDto) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordFieldsVisibilityByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }

    const recordTypeId =
      updateRecordFieldsVisibilityByTypeDto.recordTypeId || recordFieldVisibilityToUpdate.recordType.id;

    const value = updateRecordFieldsVisibilityByTypeDto.value
      ? capitalizeSentence(updateRecordFieldsVisibilityByTypeDto.value.trim())
      : capitalizeSentence(recordFieldVisibilityToUpdate.value.trim());

    let recordType = recordFieldVisibilityToUpdate.recordType;
    if (updateRecordFieldsVisibilityByTypeDto.recordTypeId) {
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
    if (updateRecordFieldsVisibilityByTypeDto.recordTypeId || updateRecordFieldsVisibilityByTypeDto.value) {
      const existingFieldsVisibility = await this.recordFieldsVisibilityByTypeRepository.findOneBy({
        value,
        recordType,
      });
      if (existingFieldsVisibility.id != id) {
        this.logger.error(
          `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        );
        throw new ForbiddenException('value is already in use for that Field Visibility by Tenant Type', {
          cause: new Error(),
          description: `The value "${value}" is already used for that Field Visibility by Tenant Type and needs to be unique`,
        });
      }
    }

    this.recordFieldsVisibilityByTypeRepository.merge(
      recordFieldVisibilityToUpdate,
      updateRecordFieldsVisibilityByTypeDto,
      recordType,
    );
    this.logger.log(`New data for Field Visibility by Tenant Type with id: ${id} was merged.`);

    return await this.recordFieldsVisibilityByTypeRepository.save(recordFieldVisibilityToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Field Visibility by Tenant Type with id: ${id}.`);
    const recordFieldVisibilityToUpdate = await this.recordFieldsVisibilityByTypeRepository.findOneBy({ id });
    if (!recordFieldVisibilityToUpdate) {
      this.logger.error(`The Field Visibility by tenant type with id ${id} was not found`);
      throw new NotFoundException('Field Visibility by Tenant Type not found', {
        cause: new Error(),
        description: `The Field Visibility by tenant type with id ${id} was not found`,
      });
    }
    recordFieldVisibilityToUpdate.enabled = false;
    this.logger.log(`Field Visibility by Tenant Type with id: ${id} was disabled.`);

    return await this.recordFieldsVisibilityByTypeRepository.save(recordFieldVisibilityToUpdate);
  }
}
