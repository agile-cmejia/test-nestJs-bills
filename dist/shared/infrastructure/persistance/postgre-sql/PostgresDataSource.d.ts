import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
export declare const appPostgresDataSource: TypeOrmModuleOptions;
export declare function getConfig(): DataSourceOptions;
