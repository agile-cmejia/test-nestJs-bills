export type PostgreSQLConfig = {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  synchronize: boolean;
  logging: boolean;
  schema: string;
};
