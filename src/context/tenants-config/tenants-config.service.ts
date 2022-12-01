import { dbConfig } from './../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantsConfigDto } from './dto/create-tenants-config.dto';
import { UpdateTenantsConfigDto } from './dto/update-tenants-config.dto';
import { TenantsConfig } from './entities/tenants-config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantsConfigService {
  private readonly logger = new Logger(TenantsConfigService.name);

  constructor(
    @InjectRepository(TenantsConfig, dbConfig.name)
    private readonly tenantsConfigRepository: Repository<TenantsConfig>,
  ) {}
  async create(createTenantsConfigDto: CreateTenantsConfigDto) {
    this.logger.log('Creating new Tenant Configuration...');
    /*     const existingTenantId = await this.tenantsConfigRepository.findOneBy({
      tenantId: createTenantsConfigDto.tenantId,
    });
    if (existingTenantId) {
      this.logger.error(`The tenantId ${createTenantsConfigDto.tenantId} is already used and needs to be unique`);
      throw new ForbiddenException('tenantId is already in use', {
        cause: new Error(),
        description: `The tenantId ${createTenantsConfigDto.tenantId} is already used and needs to be unique`,
      });
    } */
    const newTenantType = this.tenantsConfigRepository.create(createTenantsConfigDto);
    this.logger.log(`Created new Tenant Configuration ! id: ${newTenantType.id}.`);
    return await this.tenantsConfigRepository.save(newTenantType);
  }

  async findAll() {
    this.logger.log('Finding All Tenant ...');
    return await this.tenantsConfigRepository.find();
  }

  async findOne(id: number) {
    this.logger.log(`Searching for Tenant  with id: ${id}.`);
    const foundTenantType = await this.tenantsConfigRepository.findOneBy({ id });
    if (!foundTenantType) {
      this.logger.error(`The tenant configuration with id ${id} was not found`);
      throw new NotFoundException('Tenant  not found', {
        cause: new Error(),
        description: `The tenant configuration with id ${id} was not found`,
      });
    }
    this.logger.log(`Tenant configuration with id: ${id} was found.`);
    return foundTenantType;
  }

  async update(id: number, updateTenantsConfigDto: UpdateTenantsConfigDto) {
    this.logger.log(`Updating for Tenant with id: ${id}.`);
    const tenantToUpdate = await this.tenantsConfigRepository.findOneBy({ id });
    if (!tenantToUpdate) {
      this.logger.error(`The tenant with id ${id} was not found`);
      throw new NotFoundException('Tenant not found', {
        cause: new Error(),
        description: `The tenant with id ${id} was not found`,
      });
    }
    /*  if (updateTenantsConfigDto.tenantId) {
      const existingTenantTag = await this.tenantsConfigRepository.findOneBy({
        tenantId: updateTenantsConfigDto.tenantId,
      });
      if (existingTenantTag.id !== tenantToUpdate.id) {
        this.logger.error(`The tenantId ${updateTenantsConfigDto.tenantId} is already used and needs to be unique`);
        throw new ForbiddenException('tenantId is already in use', {
          cause: new Error(),
          description: `The tenantId ${updateTenantsConfigDto.tenantId} is already used and needs to be unique`,
        });
      }
      tenantToUpdate.tenantId = updateTenantsConfigDto.tenantId;
    } */
    if (updateTenantsConfigDto.association) tenantToUpdate.association = updateTenantsConfigDto.association;
    if (updateTenantsConfigDto.hasRoleAliases != null)
      tenantToUpdate.hasRoleAliases = updateTenantsConfigDto.hasRoleAliases;
    this.logger.log(`Tenant with id: ${id} was updated.`);
    return await this.tenantsConfigRepository.save(tenantToUpdate);
  }
}
