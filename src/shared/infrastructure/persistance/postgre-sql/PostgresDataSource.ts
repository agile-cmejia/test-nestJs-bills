import { dbConfig } from './dbConfig';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as commonEntities from '@avantodev/avanto-db';
import { DataSourceOptions } from 'typeorm';

const models = [];
for (const key in commonEntities) {
  if (commonEntities.hasOwnProperty(key)) {
    const model = commonEntities[key];
    models.push(model);
  }
}
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
  entities: models,
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
    entities: models,
  } as DataSourceOptions;
}
