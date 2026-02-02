# 🧠 Agent Memory: src/context/

## 📌 Critical Lessons

- **2026-02-02:** Context modules contain feature-specific code (controllers, module files).
- **2026-02-02:** Each feature gets its own folder: `context/{feature}/`

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- One controller per feature module
- Module file exports the module for import in AppModule
- Use Swagger decorators: `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`
- Controller filenames: `{feature}.controller.ts`
- Module filenames: `{feature}.module.ts`

## 🔗 Dependencies

- `entities/` - Shared entities module for TypeORM entities
- Services are typically in `../shared/context/` for reusability
