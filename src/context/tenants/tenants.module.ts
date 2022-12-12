import { dbConfig } from './../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { TenantsConfig } from '../../shared/context/tenants-config/infrastructure/entities/tenants-config.entity';
import { TenantType } from '../../shared/context/tenant-types/infrastructure/entities/tenant-type.entity';
import { Tenant } from '../../shared/context/tenants/infrastructure/entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenantsService } from '../../shared/context/tenants/domain/tenants.service';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, TenantType, TenantsConfig], dbConfig.name)],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
