import { TenantsConfig } from './../tenants-config/entities/tenants-config.entity';
import { Tenant } from './../tenants/entities/tenant.entity';
import { dbConfig } from '../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { TenantType } from './entities/tenant-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenantTypesService } from './tenant-types.service';
import { TenantTypesController } from './tenant-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TenantType, Tenant, TenantsConfig], dbConfig.name)],
  controllers: [TenantTypesController],
  providers: [TenantTypesService],
})
export class TenantTypesModule {}
