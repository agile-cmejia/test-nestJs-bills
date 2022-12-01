import { DataSource } from 'typeorm';
import { getConfig } from './PostgresDataSource';

const dataSource = new DataSource(getConfig()); // config is one that is defined in datasource.config.ts file
dataSource.initialize();
export default dataSource;
