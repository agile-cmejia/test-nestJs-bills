import { Controller, Get, Post, Body, Patch, Param, Logger } from '@nestjs/common';
import { TenantsConfigService } from '../../shared/context/tenants-config/domain/tenants-config.service';
import { CreateTenantsConfigDto } from '../../shared/context/tenants-config/domain/dto/create-tenants-config.dto';
import { UpdateTenantsConfigDto } from '../../shared/context/tenants-config/domain/dto/update-tenants-config.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenants-config')
@Controller('tenants-config')
export class TenantsConfigController {
  constructor(private readonly tenantsConfigService: TenantsConfigService) {}
  private readonly logger = new Logger(TenantsConfigController.name);

  @Post()
  async create(@Body() createTenantsConfigDto: CreateTenantsConfigDto) {
    this.logger.log('Creating new Tenant Configuration ..');
    const newTenant = await this.tenantsConfigService.create(createTenantsConfigDto);
    this.logger.log(`Created new Tenant Configuration! id: ${newTenant.id}.`);
    return newTenant;
  }

  @Get()
  async findAll() {
    return await this.tenantsConfigService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Finding all Tenants Configuration ..');
    return await this.tenantsConfigService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenantsConfigDto: UpdateTenantsConfigDto) {
    this.logger.log(`Updating Tenant Configuration with id: ${id}.`);
    const foundTenant = await this.tenantsConfigService.update(+id, updateTenantsConfigDto);
    this.logger.log(`Tenant Configuration with id: ${id} was updated.`);
    return foundTenant;
  }
}
