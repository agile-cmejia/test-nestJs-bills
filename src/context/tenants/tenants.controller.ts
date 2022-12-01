import { FindTenantDto } from './dto/find-tenant.dto';
import { capitalizeSentence } from './../../shared/utils';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}
  private readonly logger = new Logger(TenantsController.name);

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    this.logger.log('Creating new Tenant ..');
    const { name, url, description } = createTenantDto;
    const newTenant = await this.tenantsService.create({
      ...createTenantDto,
      name: capitalizeSentence(name).trim(),
      url: url.trim().toLowerCase(),
      description: description.trim(),
    });
    this.logger.log(`Created new Tenant Type! id: ${newTenant.id}.`);
    return newTenant;
  }

  @Get()
  async findAll() {
    this.logger.log('Finding All Tenants...');
    return await this.tenantsService.findAll();
  }

  @Post('many/')
  async findMany(@Body() findTenantDto: FindTenantDto) {
    this.logger.log(`Searching for Tenant with many search args.`);
    const foundTenantType = await this.tenantsService.findByMany(findTenantDto);
    return foundTenantType;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Searching for Tenant with id: ${id}.`);
    const foundTenant = await this.tenantsService.findOne(+id);
    this.logger.log(`Tenant with id: ${id} was found.`);
    return foundTenant;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    this.logger.log(`Updating Tenant with id: ${id}.`);
    const foundTenant = await this.tenantsService.update(+id, {
      name: capitalizeSentence(updateTenantDto.name).trim(),
      url: updateTenantDto.url.toLowerCase().trim(),
      description: updateTenantDto.description.trim(),
      ...updateTenantDto,
    });
    this.logger.log(`Tenant with id: ${id} was updated.`);
    return foundTenant;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Disabling Tenant with id: ${id}.`);
    const foundTenant = await this.tenantsService.remove(+id);
    this.logger.log(`Tenant with id: ${id} was disabled.`);
    return foundTenant;
  }
}
