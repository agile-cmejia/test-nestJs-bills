# 🧠 Agent Memory: src/shared/infrastructure/persistance/

## 📌 Critical Lessons

- **2026-02-02:** Contains database connection configurations.
- **2026-02-02:** Currently supports PostgreSQL via TypeORM.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- One folder per database type (postgre-sql/)
- Use environment variables for connection strings
- Never hardcode credentials
- Use default connection (no connection name)

## 🔗 Dependencies

- TypeORM for ORM functionality
- PostgreSQL as the database
