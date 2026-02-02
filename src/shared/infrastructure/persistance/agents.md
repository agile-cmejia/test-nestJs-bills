# 🧠 Agent Memory: src/shared/infrastructure/persistance/

## 📌 Critical Lessons

- **2026-02-02:** Contains database connection configurations ONLY.
- **2026-02-02:** ALL entities come from `@avantodev/avanto-db` - NEVER create entities here.
- **2026-02-02:** Migrations are PROHIBITED in this repository - managed by avanto-db.

## 🛑 Known Issues

- **CRITICAL:** Running migrations from this repository is FORBIDDEN.
- If database changes are needed, export requirements to `docs/database-requests/` and direct user to avanto-db.

## 🏗️ Local Conventions

- One folder per database type (postgre-sql/)
- Use environment variables for connection strings
- Never hardcode credentials
- Use default connection (no connection name)
- `synchronize: false` ALWAYS in all environments
- Import entities from `@avantodev/avanto-db` only

## 🔗 Dependencies

- `@avantodev/avanto-db` - Source of ALL database entities
- TypeORM for ORM functionality (query only, no schema changes)
- PostgreSQL as the database

## ❌ Prohibited Actions

- Creating `@Entity()` classes
- Running or generating migrations
- Using `synchronize: true`
- Raw SQL that modifies schema
