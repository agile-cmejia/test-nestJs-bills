# 🧠 Agent Memory: src/shared/infrastructure/

## 📌 Critical Lessons

- **2026-02-02:** Infrastructure contains technical services: logging, database, messaging.
- **2026-02-02:** These are foundational services - changes here affect the entire application.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- `logger/` - Pino logger configuration
- `persistance/` - Database connections (PostgreSQL)
- `sqs/` - AWS SQS message queue service
- Each subfolder is a self-contained infrastructure concern

## 🔗 Dependencies

- `logger/` - Used by all services for structured logging
- `persistance/` - TypeORM data source configuration
- `sqs/` - AWS SDK for SQS messaging
