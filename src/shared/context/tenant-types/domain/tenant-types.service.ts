import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { TenantType } from '../infrastructure/entities/tenant-type.entity';
import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantTypeDto } from './dto/create-tenant-type.dto';
import { UpdateTenantTypeDto } from './dto/update-tenant-type.dto';
import { FindTenantTypeDto } from './dto/find-tenant-type.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TenantTypesService {
  private readonly logger = new Logger(TenantTypesService.name);

  constructor(
    @InjectRepository(TenantType, dbConfig.name)
    private readonly tenantTypeRepository: Repository<TenantType>,
  ) {}
  private tenantTypesCollection: TenantType[] = [];

  async create(createTenantTypeDto: CreateTenantTypeDto) {
    this.logger.log('Creating new Tenant Type...');
    const existingTenantTag = await this.tenantTypeRepository.findOneBy({ tag: createTenantTypeDto.tag });
    if (existingTenantTag) {
      this.logger.error(`The tag ${createTenantTypeDto.tag} is already used and needs to be unique`);
      throw new ForbiddenException('Tag is already in use', {
        cause: new Error(),
        description: `The tag ${createTenantTypeDto.tag} is already used and needs to be unique`,
      });
    }
    const newTenantType = this.tenantTypeRepository.create(createTenantTypeDto);
    return await this.tenantTypeRepository.save(newTenantType);
  }

  async findAll() {
    this.logger.log('Finding All Tenant Types...');
    this.tenantTypesCollection = await this.tenantTypeRepository
      .createQueryBuilder('TenantTypes')
      //.leftJoinAndSelect('TenantTypes.recordTypes', 'recordType')
      //.leftJoinAndSelect('TenantTypes.roles', 'roles')
      .leftJoinAndSelect('TenantTypes.children', 'childrenId')
      .getMany();
    this.logger.log(`Found ${this.tenantTypesCollection.length} Tenant Types`);
    return this.tenantTypesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Tenant Type with id: ${id}.`);
    this.tenantTypesCollection = await this.tenantTypeRepository
      .createQueryBuilder('TenantTypes')
      //.leftJoinAndSelect('TenantTypes.recordTypes', 'recordType')
      //.leftJoinAndSelect('TenantTypes.roles', 'roles')
      .leftJoinAndSelect('TenantTypes.children', 'childrenId')
      .andWhere('TenantTypes.id = :id ', { id })
      .getMany();

    if (this.tenantTypesCollection.length < 1) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    this.logger.log(`Tenant Type with id: ${id} was found.`);
    return this.tenantTypesCollection[0];
  }

  async findByMany(findTenantTypeDto: FindTenantTypeDto) {
    const { ids, names, descriptions, tags, enabled, recordTypesId, childrenId, rolesId } = findTenantTypeDto;
    let query = this.tenantTypeRepository
      .createQueryBuilder('TenantTypes')
      //.leftJoinAndSelect('TenantTypes.recordTypes', 'recordType')
      //.leftJoinAndSelect('TenantTypes.roles', 'roles')
      .leftJoinAndSelect('TenantTypes.children', 'childrenId');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('TenantTypes.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('TenantTypes.name IN (:...names) ', { names });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('TenantTypes.description IN (:...descriptions) ', { descriptions });
    }
    if (tags && tags.length > 0) {
      this.logger.log(`Finding by tags: ${tags}`);
      query = query.andWhere('TenantTypes.tag IN (:...tags) ', { tags });
    }
    if (recordTypesId && recordTypesId.length > 0) {
      this.logger.log(`Finding by recordTypesId: ${recordTypesId}`);
      query = query.andWhere('recordType.id IN (:...recordTypesId)', { recordTypesId });
    }
    if (childrenId && childrenId.length > 0) {
      this.logger.log(`Finding by childrenId: ${childrenId}`);
      query = query.andWhere('children.id IN (:...childrenId)', { childrenId });
    }
    if (rolesId && rolesId.length > 0) {
      this.logger.log(`Finding by rolesId: ${rolesId}`);
      query = query.andWhere('roles.id IN (:...rolesId)', { rolesId });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('TenantTypes.enabled = :enabled ', { enabled });
    }
    this.tenantTypesCollection = await query.getMany();
    this.logger.log(`Found ${this.tenantTypesCollection.length} Tenant Types`);
    return this.tenantTypesCollection;
  }

  async update(id: number, updateTenantTypeDto: UpdateTenantTypeDto) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.tenantTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    if (updateTenantTypeDto.tag) {
      const existingTenantTag = await this.tenantTypeRepository.findOneBy({ tag: updateTenantTypeDto.tag });

      if (existingTenantTag && existingTenantTag.id !== id) {
        this.logger.error(`The tag ${updateTenantTypeDto.tag} is already used and needs to be unique`);
        throw new ForbiddenException('Tag is already in use', {
          cause: new Error(),
          description: `The tag ${updateTenantTypeDto.tag} is already used and needs to be unique`,
        });
      }
    }
    this.tenantTypeRepository.merge(tenantToUpdate, updateTenantTypeDto);
    this.logger.log(`New data for Tenant Type with id: ${id} was merged.`);

    return await this.tenantTypeRepository.save(tenantToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToUpdate = await this.tenantTypeRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    tenantToUpdate.enabled = false;
    this.logger.log(`Tenant Type with id: ${id} was disabled.`);

    return await this.tenantTypeRepository.save(tenantToUpdate);
  }
}
