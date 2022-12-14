import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { capitalizeSentence, fetchTenants } from './../../../utils';
import { Role } from '../infrastructure/entities/role.entity';
import { FindRoleDto } from './../domain/dto/find-role.dto';
import { CreateRoleDto } from './../domain/dto/create-role.dto';
import { UpdateRoleDto } from './../domain/dto/update-role.dto';
import { dbConfig } from '../../../infrastructure/persistance/postgre-sql/dbConfig';
import { Injectable, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  private rolesCollection: Role[] = [];

  constructor(
    @InjectRepository(Role, dbConfig.name)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    this.logger.log('Creating new Tenant...');
    const { tag, name, description, tenantSpecific, tenantCreatorId } = createRoleDto;
    const existingTenantTag = await this.rolesRepository.findOneBy({ tag: tag.toLowerCase().trim() });
    if (existingTenantTag) {
      this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
      throw new ForbiddenException('tag is already in use', {
        cause: new Error(),
        description: `The tag "${tag}" is already used and needs to be unique`,
      });
    }
    if (createRoleDto.tenantTypesIds && createRoleDto.tenantTypesIds.length > 0) {
      this.logger.log(`tenant types: ${createRoleDto.tenantTypesIds}`);
    }
    if (tenantSpecific) {
      this.logger.log(`looking for tenant with id:${tenantCreatorId}`);
      const foundTenantCreator = await fetchTenants({ ids: [tenantCreatorId] });
      if (foundTenantCreator.length < 1) {
        this.logger.error(`The tenant with id ${tenantCreatorId} was not found`);
        throw new NotFoundException('Tenant  not found', {
          cause: new Error(),
          description: `The tenant with id ${tenantCreatorId} was not found`,
        });
      }
    }
    const newTenantType = this.rolesRepository.create({
      ...createRoleDto,
      name: capitalizeSentence(name).trim(),
      tag: tag.trim().toLowerCase(),
      description: description.trim(),
    });
    return await this.rolesRepository.save(newTenantType);
  }

  async findAll() {
    this.logger.log('Finding All Roles ...');
    this.rolesCollection = await this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('roles.tenantCreator', 'tenantCreator')
      //.leftJoinAndSelect('roles.aliases', 'aliases')
      .leftJoinAndSelect('roles.roles', 'assignedRoles')
      .leftJoinAndSelect('roles.gridPreferences', 'gridPreferences')
      .leftJoinAndSelect('assignedRoles.role', 'role')
      .leftJoinAndSelect('assignedRoles.user', 'user')
      .leftJoinAndSelect('assignedRoles.tenant', 'tenant')
      .leftJoinAndSelect('assignedRoles.roleAlias', 'roleAlias')
      .getMany();
    this.logger.log(`${this.rolesCollection.length} roles found`);
    return this.rolesCollection;
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Role  with id: ${id}.`);
    const foundRole = await this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('roles.tenantCreator', 'tenantCreator')
      //.leftJoinAndSelect('roles.aliases', 'aliases')
      .leftJoinAndSelect('roles.roles', 'assignedRoles')
      .leftJoinAndSelect('roles.gridPreferences', 'gridPreferences')
      .leftJoinAndSelect('assignedRoles.role', 'role')
      .leftJoinAndSelect('assignedRoles.user', 'user')
      .leftJoinAndSelect('assignedRoles.tenant', 'tenant')
      .leftJoinAndSelect('assignedRoles.roleAlias', 'roleAlias')
      .andWhere('roles.id = :id', { id })
      .getOne();

    if (!foundRole) {
      this.logger.error(`The tenant with id ${id} was not found`);
      throw new NotFoundException('Role  not found', {
        cause: new Error(),
        description: `The role with id ${id} was not found`,
      });
    }
    this.logger.log(`role with id: ${id} was found.`);
    return foundRole;
  }

  async findByMany(findRoleDto: FindRoleDto) {
    const {
      ids,
      names,
      descriptions,
      enabled,
      tags,
      BackOfficeAccess,
      SaasAccess,
      tenantSpecific,
      tenantTypeIds,
      tenantCreatorIds,
      aliasIds,
    } = findRoleDto;
    let query = this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('roles.tenantCreator', 'tenantCreator')
      //.leftJoinAndSelect('roles.aliases', 'aliases')
      .leftJoinAndSelect('roles.roles', 'assignedRoles')
      .leftJoinAndSelect('roles.gridPreferences', 'gridPreferences')
      .leftJoinAndSelect('assignedRoles.role', 'role')
      .leftJoinAndSelect('assignedRoles.user', 'user')
      .leftJoinAndSelect('assignedRoles.tenant', 'tenant')
      .leftJoinAndSelect('assignedRoles.roleAlias', 'roleAlias');

    if (ids && ids.length > 0) {
      this.logger.log(`Finding by ids: ${ids}`);
      query = query.andWhere('Tenants.id IN (:...ids) ', { ids });
    }
    if (names && names.length > 0) {
      this.logger.log(`Finding by names: ${names}`);
      query = query.andWhere('Tenant.name IN (:...names) ', { names: names.map((name) => capitalizeSentence(name)) });
    }
    if (tags && tags.length > 0) {
      this.logger.log(`Finding by tags: ${tags}`);
      query = query.andWhere('Tenant.tag IN (:...tags) ', { tags: tags.map((url) => capitalizeSentence(url)) });
    }
    if (descriptions && descriptions.length > 0) {
      this.logger.log(`Finding by descriptions: ${descriptions}`);
      query = query.andWhere('Tenant.description IN (:...descriptions) ', { descriptions });
    }
    if (tenantCreatorIds && tenantCreatorIds.length > 0) {
      this.logger.log(`Finding by parent Ids: ${tenantCreatorIds}`);
      query = query.andWhere('tenantCreator.id IN (:...tenantCreatorIds) ', { tenantCreatorIds });
    }

    if (tenantTypeIds && tenantTypeIds.length > 0) {
      this.logger.log(`Finding by tenantType Ids: ${tenantTypeIds}`);
      query = query.andWhere('tenantType.id IN (:...tenantTypeIds) ', { tenantTypeIds });
    }
    if (aliasIds && aliasIds.length > 0) {
      this.logger.log(`Finding by alias Ids: ${aliasIds}`);
      query = query.andWhere('aliases.id IN (:...aliasIds) ', { aliasIds });
    }

    if (enabled != null) {
      this.logger.log(`Finding by enabled: ${enabled}`);
      query = query.andWhere('Tenant.enabled = :enabled ', { enabled });
    }
    if (BackOfficeAccess != null) {
      this.logger.log(`Finding by Back Office Access: ${BackOfficeAccess}`);
      query = query.andWhere('Tenant.BackOfficeAccess = :BackOfficeAccess ', { BackOfficeAccess });
    }
    if (SaasAccess != null) {
      this.logger.log(`Finding by Saas Access: ${SaasAccess}`);
      query = query.andWhere('Tenant.SaasAccess = :SaasAccess ', { SaasAccess });
    }
    if (tenantSpecific != null) {
      this.logger.log(`Finding by tenant Specific: ${tenantSpecific}`);
      query = query.andWhere('Tenant.tenantSpecific = :tenantSpecific ', { tenantSpecific });
    }

    this.rolesCollection = await query.getMany();
    this.logger.log(`Found ${this.rolesCollection.length} Tenant Types`);
    return this.rolesCollection;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    this.logger.log(`Searching for Role with id: ${id} to Update it`);
    const roleToUpdate = await this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.tenantTypes', 'tenantTypes')
      .leftJoinAndSelect('roles.tenantCreator', 'tenantCreator')
      //.leftJoinAndSelect('roles.aliases', 'aliases')
      .leftJoinAndSelect('roles.roles', 'assignedRoles')
      .leftJoinAndSelect('roles.gridPreferences', 'gridPreferences')
      .leftJoinAndSelect('assignedRoles.role', 'role')
      .leftJoinAndSelect('assignedRoles.user', 'user')
      .leftJoinAndSelect('assignedRoles.tenant', 'tenant')
      .leftJoinAndSelect('assignedRoles.roleAlias', 'roleAlias')
      .andWhere('roles.id = :id', { id })
      .getOne();

    if (!roleToUpdate) {
      this.logger.error(`The tenant with id ${id} was not found`);
      throw new NotFoundException('Role  not found', {
        cause: new Error(),
        description: `The role with id ${id} was not found`,
      });
    }
    this.logger.log(`role with id: ${id} was found.`);

    const { tag, name, description, tenantSpecific, tenantCreatorId } = updateRoleDto;
    if (tag) {
      const existingTenantTag = await this.rolesRepository.findOneBy({ tag: tag.toLowerCase().trim() });
      if (existingTenantTag) {
        this.logger.error(`The tag "${tag}" is already used and needs to be unique`);
        throw new ForbiddenException('tag is already in use', {
          cause: new Error(),
          description: `The tag "${tag}" is already used and needs to be unique`,
        });
      }
      roleToUpdate.tag = tag.toLowerCase().trim();
    }
    if (tenantSpecific) {
      this.logger.log(`looking for tenant with id:${tenantCreatorId}`);
      const foundTenantCreator = await fetchTenants({ ids: [tenantCreatorId] });
      if (foundTenantCreator.length < 1) {
        this.logger.error(`The tenant with id ${tenantCreatorId} was not found`);
        throw new NotFoundException('Tenant  not found', {
          cause: new Error(),
          description: `The tenant with id ${tenantCreatorId} was not found`,
        });
      }
    }
    this.rolesRepository.merge(roleToUpdate, {
      ...updateRoleDto,
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
    });
    return roleToUpdate;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
