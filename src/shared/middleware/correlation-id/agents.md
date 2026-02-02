# 🧠 Agent Memory: src/shared/middleware/correlation-id/

## 📌 Critical Lessons

- **2026-02-02:** Generates/propagates correlation IDs for request tracing.
- **2026-02-02:** Uses `X-Correlation-Id` header.

## 🛑 Known Issues

- None documented yet.

## 🏗️ Local Conventions

- Check for existing `x-correlation-id` header first
- If missing, generate UUID v4
- Set on both request object and response header
- Use constant `CORRELATION_ID_HEADER` for header name

## 🔗 Dependencies

- `uuid` - For generating correlation IDs
- Used by logging and error handling for request tracing
