import { FindTenantTypeDto } from './dto/find-tenant-type.dto';
import { capitalizeSentence } from '../../shared/utils';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { TenantTypesService } from './tenant-types.service';
import { CreateTenantTypeDto } from './dto/create-tenant-type.dto';
import { UpdateTenantTypeDto } from './dto/update-tenant-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenant-types')
@Controller('tenant-types')
export class TenantTypesController {
  constructor(private readonly tenantTypesService: TenantTypesService) {}
  private readonly logger = new Logger(TenantTypesController.name);

  @Post()
  async create(@Body() createTenantTypeDto: CreateTenantTypeDto) {
    this.logger.log('Creating new Tenant Type...');
    const { name, description, tag } = createTenantTypeDto;
    const newTenantType = await this.tenantTypesService.create({
      name: capitalizeSentence(name).trim(),
      description: description.trim(),
      tag: tag.trim().toLowerCase(),
      ...createTenantTypeDto,
    });
    this.logger.log(`Created new Tenant Type! id: ${newTenantType}.`);
    return newTenantType;
  }

  @Get()
  async findAll() {
    this.logger.log('Finding All Tenant Types...');
    return await this.tenantTypesService.findAll();
  }

  @Post('many/')
  async findMany(@Body() findTenantTypeDto: FindTenantTypeDto) {
    this.logger.log(`Searching for Tenant Type with many search args.`);
    const foundTenantType = await this.tenantTypesService.findByMany(findTenantTypeDto);
    return foundTenantType;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Searching for Tenant Type with id: ${id}.`);
    const foundTenantType = await this.tenantTypesService.findOne(+id);
    this.logger.log(`Tenant Type with id: ${id} was found.`);
    return foundTenantType;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenantTypeDto: UpdateTenantTypeDto) {
    this.logger.log(`Updating for Tenant Type with id: ${id}.`);
    const foundTenantType = await this.tenantTypesService.update(+id, {
      name: capitalizeSentence(updateTenantTypeDto.name).trim(),
      tag: updateTenantTypeDto.tag.toLowerCase().trim(),
      description: updateTenantTypeDto.description.trim(),
      ...updateTenantTypeDto,
    });
    this.logger.log(`Tenant Type with id: ${id} was updated.`);
    return foundTenantType;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Disabling Tenant Type with id: ${id}.`);
    const foundTenantType = await this.tenantTypesService.remove(+id);
    this.logger.log(`Tenant Type with id: ${id} was disabled.`);
    return foundTenantType;
  }
}
