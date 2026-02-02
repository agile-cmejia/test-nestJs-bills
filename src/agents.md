# 🧠 Agent Memory: src/

## 📌 Critical Lessons

- **2026-02-02:** This is a NestJS microservice skeleton using TypeScript, TypeORM, and PostgreSQL.
- **2026-02-02:** Follow modular architecture pattern - context modules for features, shared for cross-cutting concerns.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Controllers live in `context/{feature}/`
- Services live in `shared/context/{feature}/` or alongside controllers
- Use `@Injectable()` decorator for all services
- Use `private readonly logger = new Logger(ClassName.name)` for logging

## 🔗 Dependencies

- `context/` - Feature modules with controllers and module definitions
- `shared/` - Cross-cutting concerns (infrastructure, middleware, utils)
- `main.ts` - Application entry point
