import { dbConfig } from './dbConfig';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const appPostgresDataSource = {
  type: 'postgres',
  name: dbConfig.name,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  schema: dbConfig.schema,
  logging: dbConfig.logging,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['src/shared/infrastructure/persistance/type-orm/migrations/*.{.ts,.js}'],
} as TypeOrmModuleOptions;

export function getConfig() {
  return {
    type: 'postgres',
    name: dbConfig.name,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: dbConfig.synchronize,
    schema: dbConfig.schema,
    logging: dbConfig.logging,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['src/shared/infrastructure/persistance/type-orm/migrations/*.{.ts,.js}'],
  } as DataSourceOptions;
}
