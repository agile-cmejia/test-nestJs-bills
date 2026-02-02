# 🧠 Agent Memory: src/shared/middleware/

## 📌 Critical Lessons

- **2026-02-02:** Contains NestJS middleware for HTTP request processing.
- **2026-02-02:** Middleware runs before guards and interceptors.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Implement `NestMiddleware` interface
- Use `@Injectable()` decorator
- Register in `AppModule.configure()` method
- One folder per middleware with its spec file

## 🔗 Dependencies

- Registered in `app.module.ts` configure() method
- Applied to routes via `consumer.apply().forRoutes()`
