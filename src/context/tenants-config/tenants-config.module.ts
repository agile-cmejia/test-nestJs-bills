import { TenantType } from './../tenant-types/entities/tenant-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { Module } from '@nestjs/common';
import { TenantsConfigService } from './tenants-config.service';
import { TenantsConfigController } from './tenants-config.controller';
import { TenantsConfig } from './entities/tenants-config.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantsConfig, Tenant, TenantType], dbConfig.name)],
  controllers: [TenantsConfigController],
  providers: [TenantsConfigService],
})
export class TenantsConfigModule {}
