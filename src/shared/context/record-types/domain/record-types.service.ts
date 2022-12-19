import { fetchTenantTypes } from './../../../utils';
import { FindRecordTypeDto } from './dto/find-record-type.dto';
import { dbConfig } from './../../../infrastructure/persistance/postgre-sql/dbConfig';
import { RecordType } from '../infrastructure/entities/record-type.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecordTypeDto } from './dto/create-record-type.dto';
import { UpdateRecordTypeDto } from './dto/update-record-type.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RecordTypesService {
  private readonly logger = new Logger(RecordTypesService.name);
  private recordTypesCollection: RecordType[] = [];

  constructor(
    @InjectRepository(RecordType, dbConfig.name)
    private readonly recordTypeRepository: Repository<RecordType>,
  ) {}

  async create(createRecordTypeDto: CreateRecordTypeDto) {
    this.logger.log('Creating new Tenant Type...');
    const { tenantTypeIds } = createRecordTypeDto;
    const newRecordType = this.recordTypeRepository.create(createRecordTypeDto);

    if (tenantTypeIds) {
      const foundTenantTypes = await fetchTenantTypes({ ids: tenantTypeIds });
      if (foundTenantTypes.length < 1) {
        this.logger.error(`The tenant types with ids ${tenantTypeIds} were not found`);
        throw new NotFoundException('Tenant Type not found', {
          cause: new Error(),
          description: `The tenant types with ids ${tenantTypeIds} were not found`,
        });
      }
      newRecordType.tenantTypes = foundTenantTypes;
    }

    return await this.recordTypeRepository.save(newRecordType);
  }

  async findAll() {
    this.logger.log('Finding All Tenant Types...');
    this.recordTypesCollection = await this.recordTypeRepository
      .createQueryBuilder('recordTypes')
      .leftJoinAndSelect('recordTypes.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('recordTypes.appMenuItems', 'appMenuItems')
      //.leftJoinAndSelect('recordTypes.recordFields', 'recordFields')
      //.leftJoinAndSelect('recordTypes.fieldVisibilityOptions', 'fieldVisibilityOptions')
      //.leftJoinAndSelect('recordTypes.recordStatus', 'recordStatus')
      //.leftJoinAndSelect('recordTypes.problemCode', 'problemCode')
      //.leftJoinAndSelect('recordTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .getMany();
    this.logger.log(`Found ${this.recordTypesCollection.length} Tenant Types`);
    return this.recordTypesCollection;
  }

  async findByMany(findRecordTypeDto: FindRecordTypeDto) {
    const {
      ids,
      names,
      descriptions,
      botNames,
      enabled,
      fieldVisibilityOptionIds,
      tenantTypeIds,
      recordFieldIds,
      recordStatusIds,
      problemCodeIds,
      appMenuItemsIds,
    } = findRecordTypeDto;
    let query = this.recordTypeRepository
      .createQueryBuilder('recordTypes')
      .leftJoinAndSelect('recordTypes.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('recordTypes.recordFields', 'recordFields')
      .leftJoinAndSelect('recordTypes.fieldVisibilityOptions', 'fieldVisibilityOptions')
      .leftJoinAndSelect('recordTypes.recordStatus', 'recordStatus')
      .leftJoinAndSelect('recordTypes.problemCode', 'problemCode')
      .leftJoinAndSelect('recordTypes.appMenuItems', 'appMenuItems')
      .leftJoinAndSelect('recordTypes.roleAccessToRecordFields', 'roleAccessToRecordFields');
    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('tenantTypes.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('tenantTypes.name IN (:...names) ', { names });
    }
    if (botNames && botNames.length > 0) {
      this.logger.log(`Finding by bot Names: ${botNames}`);
      query = query.andWhere('tenantTypes.botName IN (:...botNames) ', { botNames });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('tenantTypes.description IN (:...descriptions) ', { descriptions });
    }
    if (fieldVisibilityOptionIds && fieldVisibilityOptionIds.length > 0) {
      this.logger.log(`Finding by fieldVisibilityOptionIds: ${fieldVisibilityOptionIds}`);
      query = query.andWhere('tenantTypes.fieldVisibilityOptions IN (:...fieldVisibilityOptionIds) ', {
        fieldVisibilityOptionIds,
      });
    }
    if (tenantTypeIds && tenantTypeIds.length > 0) {
      this.logger.log(`Finding by tenant Type Ids: ${tenantTypeIds}`);
      query = query.andWhere('tenantTypes.id IN (:...tenantTypeIds)', { tenantTypeIds });
    }
    if (recordFieldIds && recordFieldIds.length > 0) {
      this.logger.log(`Finding by recordFieldIds: ${recordFieldIds}`);
      query = query.andWhere('recordFields.id IN (:...recordFieldIds)', { recordFieldIds });
    }
    if (recordStatusIds && recordStatusIds.length > 0) {
      this.logger.log(`Finding by record Status Ids: ${recordStatusIds}`);
      query = query.andWhere('recordStatus.id IN (:...recordStatusIds)', { recordStatusIds });
    }
    if (appMenuItemsIds && appMenuItemsIds.length > 0) {
      this.logger.log(`Finding by Menu Items Ids: ${appMenuItemsIds}`);
      query = query.andWhere('appMenuItems.id IN (:...appMenuItemsIds)', { appMenuItemsIds });
    }
    if (problemCodeIds && problemCodeIds.length > 0) {
      this.logger.log(`Finding by problemCodeIds: ${problemCodeIds}`);
      query = query.andWhere('problemCode.id IN (:...problemCodeIds)', { problemCodeIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('tenantTypes.enabled = :enabled ', { enabled });
    }
    this.recordTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.recordTypesCollection.length} Tenant Types`);
    return this.recordTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Tenant Type with id: ${id}.`);
    this.recordTypesCollection = await this.recordTypeRepository
      .createQueryBuilder('recordTypes')
      .leftJoinAndSelect('recordTypes.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('recordTypes.recordFields', 'recordFields')
      .leftJoinAndSelect('recordTypes.fieldVisibilityOptions', 'fieldVisibilityOptions')
      .leftJoinAndSelect('recordTypes.recordStatus', 'recordStatus')
      .leftJoinAndSelect('recordTypes.problemCode', 'problemCode')
      .leftJoinAndSelect('recordTypes.appMenuItems', 'appMenuItems')
      .leftJoinAndSelect('recordTypes.roleAccessToRecordFields', 'roleAccessToRecordFields')
      .andWhere('tenantTypes.id = :id ', { id })
      .getMany();

    if (this.recordTypesCollection.length < 1) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Tenant Type with id: ${id} was found.`);
    return this.recordTypesCollection[0];
  }

  async update(id: number, updateRecordTypeDto: UpdateRecordTypeDto) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.recordTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }

    this.recordTypeRepository.merge(tenantToUpdate, updateRecordTypeDto);
    this.logger.log(`New data for Tenant Type with id: ${id} was merged.`);

    return await this.recordTypeRepository.save(tenantToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.recordTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    tenantToUpdate.enabled = false;
    this.logger.log(`Tenant Type with id: ${id} was disabled.`);

    return await this.recordTypeRepository.save(tenantToUpdate);
  }
}
