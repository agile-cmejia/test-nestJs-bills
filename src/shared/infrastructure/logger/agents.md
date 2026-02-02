# 🧠 Agent Memory: src/shared/infrastructure/logger/

## 📌 Critical Lessons

- **2026-02-02:** Uses Pino for structured JSON logging.
- **2026-02-02:** Logger options are configured in `pinoLoggerOptions.ts`.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Use structured JSON format in production
- Include required fields: timestamp, level, message, context
- NEVER log sensitive data (passwords, tokens, PII)
- Use appropriate log levels: debug, info, warn, error

## 🔗 Dependencies

- `nestjs-pino` - NestJS Pino integration
- `pino` - Fast JSON logger
