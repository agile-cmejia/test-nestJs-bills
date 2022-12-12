import { TenantType } from '../../shared/context/tenant-types/infrastructure/entities/tenant-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { Module } from '@nestjs/common';
import { TenantsConfigService } from '../../shared/context/tenants-config/domain/tenants-config.service';
import { TenantsConfigController } from './tenants-config.controller';
import { TenantsConfig } from '../../shared/context/tenants-config/infrastructure/entities/tenants-config.entity';
import { Tenant } from '../../shared/context/tenants/infrastructure/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantsConfig, Tenant, TenantType], dbConfig.name)],
  controllers: [TenantsConfigController],
  providers: [TenantsConfigService],
})
export class TenantsConfigModule {}
