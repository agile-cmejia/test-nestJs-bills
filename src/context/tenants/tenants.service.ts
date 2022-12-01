import { FindTenantDto } from './dto/find-tenant.dto';
import { capitalizeSentence } from './../../shared/utils';
import { Tenant } from './entities/tenant.entity';
import { Injectable, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Repository } from 'typeorm';
import { dbConfig } from 'src/shared/infrastructure/persistance/postgre-sql/dbConfig';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);
  private tenantCollection: Tenant[] = [];

  constructor(
    @InjectRepository(Tenant, dbConfig.name)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    this.logger.log('Creating new Tenant...');
    const { url, name, description } = createTenantDto;
    const existingTenantUrl = await this.tenantRepository.findOneBy({ url });
    if (existingTenantUrl) {
      this.logger.error(`The url ${url} is already used and needs to be unique`);
      throw new ForbiddenException('url is already in use', {
        cause: new Error(),
        description: `The url ${url} is already used and needs to be unique`,
      });
    }
    if (createTenantDto.tenantTypeIds && createTenantDto.tenantTypeIds.length > 0) {
      this.logger.log(`tenant types: ${createTenantDto.tenantTypeIds}`);
    }
    const newTenantType = this.tenantRepository.create({
      ...createTenantDto,
      name: capitalizeSentence(name).trim(),
      url: url.trim().toLowerCase(),
      description: description.trim(),
    });
    return await this.tenantRepository.save(newTenantType);
  }

  async findAll() {
    this.logger.log('Finding All Tenant ...');
    this.tenantCollection = await this.tenantRepository
      .createQueryBuilder('Tenants')
      .leftJoinAndSelect('Tenants.tenantType', 'tenantType')
      .leftJoinAndSelect('Tenants.childrenIds', 'childrenIds')
      .leftJoinAndSelect('Tenants.parent', 'parent')
      //.leftJoinAndSelect('Tenants.tenantRoleAlias', 'tenantRoleAlias')
      //.leftJoinAndSelect('Tenants.coverageZone', 'coverageZone')
      //.leftJoinAndSelect('Tenants.userIds', 'userIds')
      //.leftJoinAndSelect('Tenants.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.user', 'user')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .leftJoinAndSelect('tenantType.roles', 'tenantRoles')
      .getMany();
    return this.tenantCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Tenant  with id: ${id}.`);
    this.tenantCollection = await this.tenantRepository
      .createQueryBuilder('Tenants')
      .leftJoinAndSelect('Tenants.tenantType', 'tenantType')
      .leftJoinAndSelect('Tenants.childrenIds', 'childrenIds')
      .leftJoinAndSelect('Tenants.parent', 'parent')
      //.leftJoinAndSelect('Tenants.tenantRoleAlias', 'tenantRoleAlias')
      //.leftJoinAndSelect('Tenants.coverageZone', 'coverageZone')
      //.leftJoinAndSelect('Tenants.userIds', 'userIds')
      //.leftJoinAndSelect('Tenants.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.user', 'user')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .leftJoinAndSelect('tenantType.roles', 'tenantRoles')
      .andWhere('Tenants.id = :id ', { id })
      .getMany();
    if (this.tenantCollection.length < 1) {
      this.logger.error(`The tenant with id ${id} was not found`);
      throw new NotFoundException('Tenant  not found', {
        cause: new Error(),
        description: `The tenant with id ${id} was not found`,
      });
    }
    this.logger.log(`Tenant with id: ${id} was found.`);
    return this.tenantCollection[0];
  }

  async findByMany(findTenantDto: FindTenantDto) {
    const {
      ids,
      names,
      descriptions,
      enabled,
      parentIds,
      coverageZoneIds,
      urls,
      userIds,
      tenantTypeIds,
      childrenIds,
      roleAliasesIds,
    } = findTenantDto;
    let query = this.tenantRepository
      .createQueryBuilder('Tenants')
      .leftJoinAndSelect('Tenants.tenantType', 'tenantType')
      .leftJoinAndSelect('Tenants.childrenIds', 'childrenIds')
      .leftJoinAndSelect('Tenants.parent', 'parent')
      //.leftJoinAndSelect('Tenants.tenantRoleAlias', 'tenantRoleAlias')
      //.leftJoinAndSelect('Tenants.coverageZone', 'coverageZone')
      //.leftJoinAndSelect('Tenants.userIds', 'userIds')
      //.leftJoinAndSelect('Tenants.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.user', 'user')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .leftJoinAndSelect('tenantType.roles', 'tenantRoles');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('Tenants.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('Tenant.name IN (:...names) ', { names: names.map((name) => capitalizeSentence(name)) });
    }
    if (urls && urls.length > 0) {
      this.logger.log(`Finding by urls: ${urls}`);
      query = query.andWhere('Tenant.urls IN (:...urls) ', { urls: urls.map((url) => capitalizeSentence(url)) });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('Tenant.description IN (:...descriptions) ', { descriptions });
    }
    if (parentIds && parentIds.length > 0) {
      this.logger.log(`Finding by parent Ids: ${parentIds}`);
      query = query.andWhere('parent.id IN (:...parentIds) ', { parentIds });
    }
    if (roleAliasesIds && roleAliasesIds.length > 0) {
      this.logger.log(`Finding by roleAliases Ids: ${roleAliasesIds}`);
      query = query.andWhere('tenantRoleAlias.id IN (:...roleAliasesIds) ', { roleAliasesIds });
    }
    if (tenantTypeIds && tenantTypeIds.length > 0) {
      this.logger.log(`Finding by tenantType Ids: ${tenantTypeIds}`);
      query = query.andWhere('tenantType.id IN (:...tenantTypeIds) ', { tenantTypeIds });
    }
    if (childrenIds && childrenIds.length > 0) {
      this.logger.log(`Finding by children Ids: ${childrenIds}`);
      query = query.andWhere('children.id IN (:...childrenIds) ', { childrenIds });
    }
    if (coverageZoneIds && coverageZoneIds.length > 0) {
      this.logger.log(`Finding by coverageZone Ids: ${coverageZoneIds}`);
      query = query.andWhere('coverageZone.id IN (:...coverageZoneIds) ', { coverageZoneIds });
    }
    if (userIds && userIds.length > 0) {
      this.logger.log(`Finding by user Ids: ${userIds}`);
      query = query.andWhere('user.id IN (:...userIds)', { userIds });
    }
    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('Tenant.enabled = :enabled ', { enabled });
    }

    this.tenantCollection = await query.getMany();
    this.logger.log(`Found ${this.tenantCollection.length} Tenant Types`);
    return this.tenantCollection;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    this.logger.log(`Updating for Tenant with id: ${id}.`);
    const tenantToUpdate = await this.tenantRepository
      .createQueryBuilder('Tenants')
      .leftJoinAndSelect('Tenants.tenantType', 'tenantType')
      .leftJoinAndSelect('Tenants.childrenIds', 'childrenIds')
      .leftJoinAndSelect('Tenants.parent', 'parent')
      //.leftJoinAndSelect('Tenants.tenantRoleAlias', 'tenantRoleAlias')
      //.leftJoinAndSelect('Tenants.coverageZone', 'coverageZone')
      //.leftJoinAndSelect('Tenants.userIds', 'userIds')
      //.leftJoinAndSelect('Tenants.roles', 'roles')
      //.leftJoinAndSelect('roles.role', 'role')
      //.leftJoinAndSelect('roles.user', 'user')
      //.leftJoinAndSelect('roles.tenant', 'tenant')
      //.leftJoinAndSelect('roles.roleAlias', 'roleAlias')
      .leftJoinAndSelect('tenantType.roles', 'tenantRoles')
      .andWhere('Tenants.id = :id ', { id })
      .getOne();
    if (!tenantToUpdate) {
      this.logger.error(`The tenant with id ${id} was not found`);
      throw new NotFoundException('Tenant not found', {
        cause: new Error(),
        description: `The tenant with id ${id} was not found`,
      });
    }
    if (updateTenantDto.url) {
      const existingTenantTag = await this.tenantRepository.findOneBy({ url: updateTenantDto.url });
      if (existingTenantTag.id !== tenantToUpdate.id) {
        this.logger.error(`The url ${updateTenantDto.url} is already used and needs to be unique`);
        throw new ForbiddenException('url is already in use', {
          cause: new Error(),
          description: `The url ${updateTenantDto.url} is already used and needs to be unique`,
        });
      }
    }
    this.tenantRepository.merge(tenantToUpdate, updateTenantDto);
    this.logger.log(`Tenant with id: ${id} was updated.`);
    return await this.tenantRepository.save(tenantToUpdate);
  }

  async remove(id: number) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const tenantToDisable = await this.tenantRepository.findOneBy({ id });
    if (!tenantToDisable) {
      this.logger.error(`The tenant type with id ${id} was not found`);
      throw new NotFoundException('Tenant Type not found', {
        cause: new Error(),
        description: `The tenant type with id ${id} was not found`,
      });
    }
    tenantToDisable.enabled = false;
    this.logger.log(`Tenant Type with id: ${id} was disabled.`);

    return await this.tenantRepository.save(tenantToDisable);
  }
}
