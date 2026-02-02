# 🧠 Agent Memory: src/shared/infrastructure/sqs/

## 📌 Critical Lessons

- **2026-02-02:** AWS SQS service for message queue operations.
- **2026-02-02:** Used for async communication between microservices.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Configure via environment variables: AWS_REGION, SQS_QUEUE_URL
- Use structured message format with correlation IDs
- Handle message failures gracefully with retry logic

## 🔗 Dependencies

- `@aws-sdk/client-sqs` - AWS SQS client
- AWS credentials via environment or IAM role
