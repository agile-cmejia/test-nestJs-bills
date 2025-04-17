import { evalENVBoolean } from '../../../utils';
import 'dotenv/config';
import { PostgreSQLConfig } from '@avantodev/avanto-shared-resources/dist/infrastructure/persistence/PostgreSQL/PostgreSQL.config';

export const dbConfig: PostgreSQLConfig = {
  name: process.env.NODE_ENV || 'dev',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'postgres',
  schema: process.env.DB_SCHEMA || 'public',
  synchronize: process.env.DB_SYNC ? evalENVBoolean(process.env.DB_SYNC) : true,
  logging: process.env.DB_LOGGING ? evalENVBoolean(process.env.DB_LOGGING) : true,
};
