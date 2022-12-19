import { dbConfig } from 'src/shared/infrastructure/persistance/postgre-sql/dbConfig';
import { RecordAdditionalFieldsByType } from '../../record-additional-fields-by-types/infrastructure/entities/record-additional-fields-by-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecordAdditionalFieldsByTypeDto } from './dto/create-record-additional-fields-by-type.dto';
import { UpdateRecordAdditionalFieldsByTypeDto } from './dto/update-record-additional-fields-by-type.dto';
import { FindRecordAdditionalFieldsByTypeDto } from './dto/find-record-additional-fields-by-type.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RecordAdditionalFieldsByTypesService {
  private readonly logger = new Logger(RecordAdditionalFieldsByTypesService.name);
  private recordAdditionalFieldsByTypesCollection: RecordAdditionalFieldsByType[] = [];

  constructor(
    @InjectRepository(RecordAdditionalFieldsByType, dbConfig.name)
    private readonly recordAdditionalFieldsByTypeRepository: Repository<RecordAdditionalFieldsByType>,
  ) {}

  async create(createRecordAdditionalFieldsByTypeDto: CreateRecordAdditionalFieldsByTypeDto) {
    this.logger.log('Creating new Tenant Type...');
    const { recordTypeIds } = createRecordAdditionalFieldsByTypeDto;
    const newRecordType = this.recordAdditionalFieldsByTypeRepository.create(createRecordAdditionalFieldsByTypeDto);

    if (recordTypeIds) {
      console.log(`${recordTypeIds}`);
      //newRecordType.recordTypes = foundRecordAdditionalFieldsByTypes;
    }
    return await this.recordAdditionalFieldsByTypeRepository.save(newRecordType);
  }

  async findAll() {
    this.logger.log('Finding All Tenant Types...');
    this.recordAdditionalFieldsByTypesCollection = await this.recordAdditionalFieldsByTypeRepository
      .createQueryBuilder('RecordAdditionalFieldsByTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .getMany();
    this.logger.log(`Found ${this.recordAdditionalFieldsByTypesCollection.length} Tenant Types`);
    return this.recordAdditionalFieldsByTypesCollection;
  }

  async findByMany(findRecordTypeDto: FindRecordAdditionalFieldsByTypeDto) {
    const { ids, names, descriptions, botFieldNames, enabled, headerField, recordTypeIds, required, gridEditable } =
      findRecordTypeDto;
    let query = this.recordAdditionalFieldsByTypeRepository
      .createQueryBuilder('RecordAdditionalFieldsByTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.name IN (:...names) ', { names });
    }
    if (botFieldNames && botFieldNames.length > 0) {
      this.logger.log(`Finding by bot Names: ${botFieldNames}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.botName IN (:...botFieldNames) ', { botFieldNames });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.description IN (:...descriptions) ', { descriptions });
    }
    if (recordTypeIds && recordTypeIds.length > 0) {
      this.logger.log(`Finding by tenant Type Ids: ${recordTypeIds}`);
      query = query.andWhere('recordTypes.id IN (:...recordTypeIds)', { recordTypeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.enabled = :enabled ', { enabled });
    }
    if (headerField != null) {
      this.logger.log(`Finding by headerField: ${headerField}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.headerField = :headerField ', { headerField });
    }
    if (required != null) {
      this.logger.log(`Finding by required: ${required}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.required = :required ', { required });
    }
    if (gridEditable != null) {
      this.logger.log(`Finding by gridEditable: ${gridEditable}`);
      query = query.andWhere('RecordAdditionalFieldsByTypes.gridEditable = :gridEditable ', { gridEditable });
    }
    this.recordAdditionalFieldsByTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.recordAdditionalFieldsByTypesCollection.length} Tenant Types`);
    return this.recordAdditionalFieldsByTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Tenant Type with id: ${id}.`);
    this.recordAdditionalFieldsByTypesCollection = await this.recordAdditionalFieldsByTypeRepository
      .createQueryBuilder('RecordAdditionalFieldsByTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.recordTypes', 'recordTypes')
      .leftJoinAndSelect('RecordAdditionalFieldsByTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .andWhere('RecordAdditionalFieldsByTypes.id = :id ', { id })
      .getMany();

    if (this.recordAdditionalFieldsByTypesCollection.length < 1) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Tenant Type with id: ${id} was found.`);
    return this.recordAdditionalFieldsByTypesCollection[0];
  }

  async update(id: number, updateRecordAdditionalFieldsByTypeDto: UpdateRecordAdditionalFieldsByTypeDto) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.recordAdditionalFieldsByTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }

    this.recordAdditionalFieldsByTypeRepository.merge(tenantToUpdate, updateRecordAdditionalFieldsByTypeDto);
    this.logger.log(`New data for Tenant Type with id: ${id} was merged.`);

    return await this.recordAdditionalFieldsByTypeRepository.save(tenantToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.recordAdditionalFieldsByTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    tenantToUpdate.enabled = false;
    this.logger.log(`Tenant Type with id: ${id} was disabled.`);

    return await this.recordAdditionalFieldsByTypeRepository.save(tenantToUpdate);
  }
}
