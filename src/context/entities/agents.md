# 🧠 Agent Memory: src/context/entities/

## 📌 Critical Lessons

- **2026-02-02:** This module registers TypeORM entities for the application.
- **2026-02-02:** Uses `@avantodev/avanto-db` for shared entity definitions.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Import entities from `@avantodev/avanto-db` package
- Use `TypeOrmModule.forFeature([Entity1, Entity2])` to register entities
- Export module so other modules can use repositories

## 🔗 Dependencies

- `@avantodev/avanto-db` - Shared database entities package
- TypeORM default connection (no connection name specified)
