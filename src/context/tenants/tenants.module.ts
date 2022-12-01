import { dbConfig } from './../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { TenantsConfig } from './../tenants-config/entities/tenants-config.entity';
import { TenantType } from './../tenant-types/entities/tenant-type.entity';
import { Tenant } from './entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, TenantType, TenantsConfig], dbConfig.name)],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
