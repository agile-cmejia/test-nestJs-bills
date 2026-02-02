import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '@avantodev/avanto-db';
import { dbConfig } from '@avantodev/avanto-shared-resources';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant], dbConfig.name)],
  providers: [],
  exports: [TypeOrmModule.forFeature([Tenant], dbConfig.name)],
})
export class EntitiesModule {}
