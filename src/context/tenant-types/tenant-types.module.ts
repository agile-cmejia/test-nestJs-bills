import { TenantsConfig } from '../../shared/context/tenants-config/infrastructure/entities/tenants-config.entity';
import { Tenant } from '../../shared/context/tenants/infrastructure/entities/tenant.entity';
import { dbConfig } from '../../shared/infrastructure/persistance/postgre-sql/dbConfig';
import { TenantType } from '../../shared/context/tenant-types/infrastructure/entities/tenant-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenantTypesService } from '../../shared/context/tenant-types/domain/tenant-types.service';
import { TenantTypesController } from './tenant-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TenantType, Tenant, TenantsConfig], dbConfig.name)],
  controllers: [TenantTypesController],
  providers: [TenantTypesService],
})
export class TenantTypesModule {}
