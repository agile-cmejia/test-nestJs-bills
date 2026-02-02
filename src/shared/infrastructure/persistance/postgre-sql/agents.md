# 🧠 Agent Memory: src/shared/infrastructure/persistance/postgre-sql/

## 📌 Critical Lessons

- **2026-02-02:** PostgreSQL data source configuration via TypeORM.
- **2026-02-02:** `dbConfig.ts` exports database configuration.
- **2026-02-02:** `PostgresDataSource.ts` creates the TypeORM DataSource.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Use `@InjectRepository(Entity)` - no connection name needed (default connection)
- Configure via environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- Use `synchronize: false` in production - use migrations instead

## 🔗 Dependencies

- `typeorm` - ORM
- `pg` - PostgreSQL driver
- `@avantodev/avanto-db` - Shared entities
