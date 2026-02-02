# 🧠 Agent Memory: src/shared/

## 📌 Critical Lessons

- **2026-02-02:** Shared folder contains cross-cutting concerns used across the application.
- **2026-02-02:** Never put feature-specific business logic here - use context/ instead.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- `dataTypes/` - TypeScript type definitions and interfaces
- `infrastructure/` - Logger, database, message queue configurations
- `middleware/` - HTTP middleware (correlation ID, etc.)
- `utils.ts` - Utility functions

## 🔗 Dependencies

- Used by all feature modules in `../context/`
- Infrastructure services are singleton instances
